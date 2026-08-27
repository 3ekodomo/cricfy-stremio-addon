const express = require("express");
const { getRouter } = require("stremio-addon-sdk");
const getAddonInterface = require("./addon");

const app = express();

// Since Vercel needs a synchronous export and express requires routes to be bound
// before exporting, we will initialize the addon synchronously with a fallback,
// but the first request might trigger the fetch anyway if needed.
// However, since getAddonInterface is async, we can wrap the Stremio router creation
// inside a middleware that waits for the addon interface.

let addonRouter = null;
let initializing = false;

app.use(async (req, res, next) => {
    if (!addonRouter) {
        if (!initializing) {
            initializing = true;
            try {
                const addonInterface = await getAddonInterface();
                addonRouter = getRouter(addonInterface);
            } catch (e) {
                console.error("Failed to start addon:", e);
                return res.status(500).send("Internal Server Error");
            }
        } else {
            // Wait until it's initialized if multiple concurrent requests hit cold start
            while(!addonRouter) {
                await new Promise(r => setTimeout(r, 100));
            }
        }
    }
    return addonRouter(req, res, next);
});

// Define the port for local testing or serverless environments
const port = process.env.PORT || 7000;

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Add-on hosted at http://localhost:${port}/manifest.json`);
    });
}

// Export the app for serverless deployment (Vercel)
module.exports = app;
