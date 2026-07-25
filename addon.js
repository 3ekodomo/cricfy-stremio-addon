const { addonBuilder } = require("stremio-addon-sdk");
const providers = require("./lib/providers");

// 1. Define the Manifest
const manifest = {
    id: "org.cricfy.stremio",
    version: "1.0.2", // Bumped version to ensure Stremio updates the cache
    name: "Cricfy Sports",
    description: "Live sports streams ported from Kodi",
    resources: ["catalog", "meta", "stream"], 
    types: ["tv"],
    catalogs: [
        {
            type: "tv",
            id: "cricfy_catalog",
            name: "Cricfy Channels",
            // This 'extra' block creates the drop-down menu for Providers in Stremio
            extra: [
                {
                    name: "genre",
                    options: [
                        "Tata Play", 
                        "Hotstar", 
                        "FanCode IND", 
                        "SonyLIV", 
                        "Jio IND", 
                        "Sun Direct"
                    ],
                    isRequired: false
                }
            ]
        }
    ],
    idPrefixes: ["cricfy_"]
};

const builder = new addonBuilder(manifest);

// 2. Define the Catalog Handler (Filters by Provider)
builder.defineCatalogHandler(async (args) => {
    const { type, id, extra } = args;
    
    if (type === "tv" && id === "cricfy_catalog") {
        let channels = [];
        
        // Detect which provider the user selected from the drop-down menu
        const selectedProvider = extra && extra.genre ? extra.genre : "Tata Play"; 
        
        // Populate channels based on the selected provider
        if (selectedProvider === "Tata Play") {
            channels = [
                { id: "cricfy_tata_1", type: "tv", name: "Star Sports 1 HD", poster: "https://via.placeholder.com/250x375.png?text=SS1+HD" },
                { id: "cricfy_tata_2", type: "tv", name: "Star Sports 2 HD", poster: "https://via.placeholder.com/250x375.png?text=SS2+HD" }
            ];
        } else if (selectedProvider === "Hotstar") {
            channels = [
                { id: "cricfy_hotstar_1", type: "tv", name: "Star Sports Khel", poster: "https://via.placeholder.com/250x375.png?text=SS+Khel" },
                { id: "cricfy_hotstar_2", type: "tv", name: "Star Gold HD", poster: "https://via.placeholder.com/250x375.png?text=Star+Gold" }
            ];
        } else if (selectedProvider === "Sun Direct") {
            channels = [
                { id: "cricfy_sun_1", type: "tv", name: "Sun TV HD", poster: "https://via.placeholder.com/250x375.png?text=Sun+TV" }
            ];
        }
        // ... Add additional else-if statements for FanCode IND, SonyLIV, Jio IND, etc.

        return { metas: channels };
    }
    return { metas: [] };
});

// 3. Define the Meta Handler
builder.defineMetaHandler(async ({ type, id }) => {
    if (type === "tv" && id.startsWith("cricfy_")) {
        return {
            meta: {
                id: id,
                type: "tv",
                name: "Cricfy Live Event",
                poster: "https://via.placeholder.com/250x375.png?text=Live",
                background: "https://via.placeholder.com/1280x720.png?text=Background",
                description: "Live broadcast for " + id
            }
        };
    }
    return { meta: {} };
});

// 4. Define the Stream Handler
builder.defineStreamHandler(async ({ type, id }) => {
    if (type === "tv") {
        try {
            const streamUrl = await providers.getStreamUrl(id);
            if (streamUrl) {
                return {
                    streams: [{ title: "Cricfy Live", url: streamUrl }]
                };
            }
        } catch (error) {
            console.error("Failed to fetch stream:", error);
        }
    }
    return { streams: [] };
});

module.exports = builder.getInterface();
