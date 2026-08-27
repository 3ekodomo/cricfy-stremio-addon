const { addonBuilder } = require("stremio-addon-sdk");
const providers = require("./lib/providers");

// 1. Manifest Definition
const manifest = {
    id: "org.cricfy.stremio",
    version: "1.0.4",
    name: "Cricfy Sports",
    description: "Live sports streams ported from Kodi",
    resources: ["catalog", "meta", "stream"], 
    types: ["tv"],
    catalogs: [
        {
            type: "tv",
            id: "cricfy_catalog",
            name: "Cricfy Channels",
            // We can leave extra empty or just default options, but since genres are dynamic based on providers,
            // Stremio supports omitting options and we just filter if passed, but it's better to list standard ones
            // if we want them to show up. However, since the providers are fetched asynchronously,
            // the manifest is static at startup unless we delay building.
            // For now, let's keep it simple and omit predefined genres to allow all.
            extra: [
                {
                    name: "genre",
                    isRequired: false
                }
            ]
        }
    ],
    idPrefixes: ["cricfy_"]
};

// We create the builder synchronously
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
