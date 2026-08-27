const axios = require('axios');
const cryptoUtils = require('./crypto_utils');
const remoteConfig = require('./remote_config');
const m3uParser = require('./m3u_parser');

const custom_headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
  "Accept": "*/*",
  "Cache-Control": "no-cache, no-store",
};

// In-memory cache to avoid repeated network calls
const cache = {
  providers: null,
  channels: {} // key: provider_url, value: { data: [], fetchTime: timestamp }
};
const CHANNEL_CACHE_TTL = 3600 * 1000; // 1 hour

async function fetchUrl(url, timeout = 15000) {
  try {
    const response = await axios.get(url, { headers: custom_headers, timeout });
    if (response.status === 200) {
      // In JS, axios automatically parses JSON if content-type is json.
      // But we expect encrypted text string.
      return typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
    }
    return "";
  } catch (error) {
    console.error(`providers: Error fetching URL ${url}:`, error.message);
    return "";
  }
}

async function fetchProviders() {
  if (cache.providers) {
    return cache.providers;
  }

  const url = await remoteConfig.getProviderApiUrl();
  if (!url) {
    console.error("providers: Provider API URL is not found");
    return [];
  }

  const response = await fetchUrl(`${url}/cats.txt`);
  if (response) {
    try {
      const decryptedData = cryptoUtils.decryptData(response);
      if (!decryptedData) {
        return [];
      }
      const providers = JSON.parse(decryptedData);
      if (!Array.isArray(providers)) {
        return [];
      }
      cache.providers = providers;
      return providers;
    } catch (e) {
      console.error("providers: Error parsing providers:", e.message);
    }
  }
  return [];
}

async function fetchChannels(providerUrl) {
  const now = Date.now();
  const cached = cache.channels[providerUrl];
  if (cached && (now - cached.fetchTime <= CHANNEL_CACHE_TTL)) {
    return cached.data;
  }

  try {
    let content = await fetchUrl(providerUrl);
    content = cryptoUtils.decryptContent(content);
    const channels = m3uParser.parseM3u(content);
    cache.channels[providerUrl] = {
      data: channels,
      fetchTime: now
    };
    return channels;
  } catch (e) {
    console.error(`providers: Error fetching M3U URL (${providerUrl}) content:`, e.message);
    return [];
  }
}

async function getChannels(genre) {
  const providers = await fetchProviders();
  let allChannels = [];

  // Find the matching provider(s). Since genres might match provider titles,
  // we filter based on genre. If genre is "All" or not provided, fetch all.
  for (const prov of providers) {
    const title = prov.title || 'Unknown';
    if (!genre || genre === "All" || title === genre) {
      const catLink = prov.catLink;
      if (catLink && catLink.startsWith('http')) {
        const channels = await fetchChannels(catLink);
        // Map to Stremio metas
        const metas = channels.map(ch => ({
          id: `cricfy_${Buffer.from(catLink).toString('base64')}_${Buffer.from(ch.title).toString('base64')}`, // Unique ID
          type: "tv",
          name: ch.title,
          poster: ch.tvg_logo || "https://www.iconexperience.com/_img/v_collection_png/256x256/shadow/unknown.png",
          genre: title // the provider name
        }));
        allChannels = allChannels.concat(metas);
      }
    }
  }
  return allChannels;
}

async function getChannelMeta(id) {
  if (!id.startsWith("cricfy_")) return { meta: {} };

  const parts = id.replace("cricfy_", "").split("_");
  if (parts.length < 2) return { meta: {} };

  const providerUrl = Buffer.from(parts[0], 'base64').toString('utf8');
  const channelTitle = Buffer.from(parts[1], 'base64').toString('utf8');

  const channels = await fetchChannels(providerUrl);
  const channel = channels.find(ch => ch.title === channelTitle);

  if (channel) {
    return {
      id: id,
      type: "tv",
      name: channel.title,
      poster: channel.tvg_logo || "https://www.iconexperience.com/_img/v_collection_png/256x256/shadow/unknown.png",
      background: channel.tvg_logo,
      description: `Live sports stream for ${channel.title}`
    };
  }

  return {
    id: id,
    type: "tv",
    name: "Live Channel",
    poster: "https://www.iconexperience.com/_img/v_collection_png/256x256/shadow/unknown.png",
    description: "Live channel broadcast"
  };
}

async function getStreamUrl(id) {
  if (!id.startsWith("cricfy_")) return [];

  const parts = id.replace("cricfy_", "").split("_");
  if (parts.length < 2) return [];

  const providerUrl = Buffer.from(parts[0], 'base64').toString('utf8');
  const channelTitle = Buffer.from(parts[1], 'base64').toString('utf8');

  const channels = await fetchChannels(providerUrl);
  const channel = channels.find(ch => ch.title === channelTitle);

  if (channel && channel.url) {
    const stream = {
      title: `${channel.title} - Direct Live Stream`,
      url: channel.url,
      behaviorHints: {}
    };

    const headers = {};
    if (channel.user_agent) headers["User-Agent"] = channel.user_agent;
    if (channel.referer) headers["Referer"] = channel.referer;
    if (channel.cookie) headers["Cookie"] = channel.cookie;

    Object.assign(headers, channel.headers);

    if (Object.keys(headers).length > 0) {
      stream.behaviorHints.notWebReady = true;
      stream.behaviorHints.headers = headers;
    }
    
    return [stream];
  }

  return [];
}

module.exports = {
  fetchProviders,
  getChannels,
  getChannelMeta,
  getStreamUrl
};
