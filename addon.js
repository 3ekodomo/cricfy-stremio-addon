const { addonBuilder } = require("stremio-addon-sdk");
const providers = require("./lib/providers");

const manifest = {
    id: "org.cricfy.stremio",
    version: "1.0.0",
    name: "Cricfy Sports",
    description: "Live sports streams ported from Kodi",
    resources: ["stream"],
    types: ["tv", "sport"],
    catalogs: [],
    idPrefixes: ["cricfy_"]
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {
    if (type === "tv" || type === "sport") {
        try {
            // Pass the requested Stremio ID to your provider logic
            const streamUrl = await providers.getStreamUrl(id);

            if (streamUrl) {
                return {
                    streams: [
                        {
                            title: "Cricfy Live",
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
