const { addonBuilder } = require("stremio-addon-sdk");
const providers = require("./lib/providers");

// 1. Manifest Definition
const manifest = {
    id: "org.cricfy.stremio",
    version: "1.0.3", // Version bump to reset client cache
    name: "Cricfy Sports",
    description: "Live sports streams ported from Kodi",
    resources: ["catalog", "meta", "stream"], 
    types: ["tv"],
    catalogs: [
        {
            type: "tv",
            id: "cricfy_catalog",
            name: "Cricfy Channels",
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

// 2. Dynamic Catalog Handler
builder.defineCatalogHandler(async (args) => {
    const { type, id, extra } = args;
    
    if (type === "tv" && id === "cricfy_catalog") {
        const selectedGenre = (extra && extra.genre) ? extra.genre : "All";
        const channels = await providers.getChannels(selectedGenre);
        return { metas: channels };
    }
    
    return { metas: [] };
});

// 3. Dynamic Meta Handler
builder.defineMetaHandler(async ({ type, id }) => {
    if (type === "tv" && id.startsWith("cricfy_")) {
        const meta = await providers.getChannelMeta(id);
        return { meta };
    }
    
    return { meta: {} };
});

// 4. Dynamic Stream Handler
builder.defineStreamHandler(async ({ type, id }) => {
    if (type === "tv" && id.startsWith("cricfy_")) {
        const streams = await providers.getStreamUrl(id);
        return { streams };
    }
    
    return { streams: [] };
});

module.exports = builder.getInterface();
