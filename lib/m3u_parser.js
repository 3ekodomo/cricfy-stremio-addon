class PlaylistItem {
  constructor() {
    this.title = "";
    this.url = "";
    this.tvg_logo = "";
    this.group_title = "";
    this.user_agent = "";
    this.cookie = "";
    this.referer = "";
    this.license_string = "";
    this.headers = {};
    this.is_drm = false;
  }
}

function parseM3u(content) {
  const lines = content.split('\n');
  const items = [];
  let currentItem = null;

  let buf_user_agent = null;
  let buf_cookie = null;
  let buf_referer = null;
  let buf_license_string = null;
  let buf_attrs = null;
  let buf_title = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith("#EXTINF")) {
      const attrs = {};
      const attrMatches = [...line.matchAll(/([a-zA-Z0-9_-]+)=("[^"]*"|[^,]+)/g)];
      for (const match of attrMatches) {
        attrs[match[1]] = match[2].replace(/^"|"$/g, '');
      }
      buf_attrs = attrs;

      const titleSplit = line.split(',');
      if (titleSplit.length > 1) {
        buf_title = titleSplit.slice(1).join(',').trim();
      } else {
        buf_title = "Unknown Channel";
      }
    } else if (line.startsWith("#EXTVLCOPT")) {
      if (line.includes("http-user-agent=")) {
        buf_user_agent = line.split("http-user-agent=")[1];
      }
      if (line.includes("http-referrer=")) {
        buf_referer = line.split("http-referrer=")[1];
      }
    } else if (line.startsWith("#EXTHTTP")) {
      try {
        const jsonStr = line.replace("#EXTHTTP:", "");
        const data = JSON.parse(jsonStr);
        if (data["cookie"]) buf_cookie = data["cookie"];
        if (data["user-agent"]) buf_user_agent = data["user-agent"];
      } catch (e) {
        // ignore
      }
    } else if (line.startsWith("#KODIPROP:inputstream.adaptive.license_key=")) {
      buf_license_string = line.split("=")[1];
    } else if (!line.startsWith("#")) {
      currentItem = new PlaylistItem();

      if (buf_user_agent) currentItem.user_agent = buf_user_agent;
      if (buf_cookie) currentItem.cookie = buf_cookie;
      if (buf_referer) currentItem.referer = buf_referer;
      if (buf_license_string) {
        currentItem.license_string = buf_license_string;
        currentItem.is_drm = true;
      }
      if (buf_attrs) {
        if (buf_attrs["tvg-logo"]) currentItem.tvg_logo = buf_attrs["tvg-logo"];
        if (buf_attrs["group-title"]) currentItem.group_title = buf_attrs["group-title"];
      }
      if (buf_title) currentItem.title = buf_title;

      buf_user_agent = null;
      buf_cookie = null;
      buf_referer = null;
      buf_license_string = null;
      buf_attrs = null;
      buf_title = null;

      const full_url_line = line;
      if (full_url_line.includes("|")) {
        const url_parts = full_url_line.split("|");
        currentItem.url = url_parts[0];
        const params = url_parts[1].split("&");
        for (const p of params) {
          if (p.includes("=")) {
            const [k, v] = p.split(/=(.+)/);
            if (k.toLowerCase() === "user-agent") {
              currentItem.user_agent = v;
            } else if (k.toLowerCase() === "referer") {
              currentItem.referer = v;
            } else if (k.toLowerCase() === "cookie") {
              currentItem.cookie = v;
            } else {
              currentItem.headers[k] = v;
            }
          }
        }
      } else {
        currentItem.url = full_url_line;
      }

      items.push(currentItem);
      currentItem = null;
    }
  }

  return items;
}

module.exports = {
  PlaylistItem,
  parseM3u
};
