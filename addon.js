const { addonBuilder } = require("stremio-addon-sdk");
const providers = require("./lib/providers");

// 1. Define the Manifest
const manifest = {
    id: "org.cricfy.stremio",
    version: "1.0.1", // Version bumped to ensure Stremio/Nuvio updates the cache
    name: "Cricfy Sports",
    description: "Live sports streams ported from Kodi",
    // Added 'catalog' and 'meta' to resources so it appears in the UI
    resources: ["catalog", "meta", "stream"], 
    types: ["tv", "sport"],
    // Defined a catalog so it shows up in Stremio's discover section
    catalogs: [
        {
            type: "tv",
            id: "cricfy_catalog",
            name: "Cricfy Channels"
        }
    ],
    idPrefixes: ["cricfy_"]
};

const builder = new addonBuilder(manifest);

// 2. Define the Catalog Handler (Populates the Stremio Discover page)
builder.defineCatalogHandler(({ type, id }) => {
    if (type === "tv" && id === "cricfy_catalog") {
        return {
            metas: [
                {
                    id: "cricfy_channel_1",
                    type: "tv",
                    name: "Sports Channel 1",
                    poster: "https://via.placeholder.com/250x375.png?text=Sports+1" 
                },
                {
                    id: "cricfy_channel_2",
                    type: "tv",
                    name: "Sports Channel 2",
                    poster: "https://via.placeholder.com/250x375.png?text=Sports+2"
                }
                // Once your m3u_parser is built, you can dynamically map parsed channels here
            ]
        };
    }
    return { metas: [] };
});

// 3. Define the Meta Handler (Provides details when a user clicks a channel)
builder.defineMetaHandler(({ type, id }) => {
    if (type === "tv" && id.startsWith("cricfy_")) {
        return {
            meta: {
                id: id,
                type: "tv",
                name: "Cricfy Live Event",
                poster: "https://via.placeholder.com/250x375.png?text=Live",
                background: "https://via.placeholder.com/1280x720.png?text=Background",
                description: "Live sports broadcast fetched dynamically."
            }
        };
    }
    return { meta: {} };
});

// 4. Define the Stream Handler (Fetches the actual video link when Play is clicked)
builder.defineStreamHandler(async ({ type, id }) => {
    if (type === "tv" || type === "sport") {
        try {
            // Pass the requested Stremio ID to your provider logic
            const streamUrl = await providers.getStreamUrl(id);
            
            if (streamUrl) {
                return {
                    streams: [
                        {
                            title: "Cricfy Live Stream",
                            url: streamUrl
                        }
                    ]
                };
            }
        } catch (error) {
            console.error("Failed to fetch stream:", error);
        }
    }
    
    // Return empty streams array if nothing is found
    return { streams: [] };
});

module.exports = builder.getInterface();
