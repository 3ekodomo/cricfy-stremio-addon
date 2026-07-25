// Replace stream URLs and metadata below with your parsed Kodi channel data
const channelList = [
    {
        id: "cricfy_star_sports_1_hd",
        type: "tv",
        name: "Star Sports 1 HD",
        poster: "https://via.placeholder.com/250x375.png?text=Star+Sports+1+HD",
        genre: "Tata Play",
        streamUrl: "https://sample-m3u8-url.com/live.m3u8" // Insert working live M3U8 link
    },
    {
        id: "cricfy_star_sports_2_hd",
        type: "tv",
        name: "Star Sports 2 HD",
        poster: "https://via.placeholder.com/250x375.png?text=Star+Sports+2+HD",
        genre: "Tata Play",
        streamUrl: "https://sample-m3u8-url.com/live2.m3u8"
    },
    {
        id: "cricfy_fancode_1",
        type: "tv",
        name: "FanCode Live 1",
        poster: "https://via.placeholder.com/250x375.png?text=FanCode+1",
        genre: "FanCode IND",
        streamUrl: "https://sample-m3u8-url.com/fancode.m3u8"
    }
];

// Fetch channels filtered by selected category/provider
async function getChannels(genre) {
    if (!genre || genre === "All") {
        return channelList.map(ch => ({
            id: ch.id,
            type: ch.type,
            name: ch.name,
            poster: ch.poster
        }));
    }
    
    return channelList
        .filter(ch => ch.genre === genre)
        .map(ch => ({
            id: ch.id,
            type: ch.type,
            name: ch.name,
            poster: ch.poster
        }));
}

// Get metadata for channel details view
async function getChannelMeta(id) {
    const channel = channelList.find(ch => ch.id === id);
    if (channel) {
        return {
            id: channel.id,
            type: "tv",
            name: channel.name,
            poster: channel.poster,
            background: channel.poster,
            description: `Live sports stream for ${channel.name}`
        };
    }
    
    return {
        id: id,
        type: "tv",
        name: "Live Channel",
        poster: "https://via.placeholder.com/250x375.png?text=Live",
        description: "Live channel broadcast"
    };
}

// Get video stream for playback
async function getStreamUrl(id) {
    const channel = channelList.find(ch => ch.id === id);
    if (channel && channel.streamUrl) {
        return [
            {
                title: `${channel.name} - Direct Live Stream`,
                url: channel.streamUrl
            }
        ];
    }
    
    return [];
}

module.exports = {
    getChannels,
    getChannelMeta,
    getStreamUrl
};
