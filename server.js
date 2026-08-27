const express = require("express");
const { getRouter } = require("stremio-addon-sdk");
const getAddonInterface = require("./addon");

const app = express();

(async function start() {
    try {
        const addonInterface = await getAddonInterface();

        // Serve the add-on interface via Stremio's required router
        app.use(getRouter(addonInterface));

        // Define the port for local testing or serverless environments
        const port = process.env.PORT || 7000;

        app.listen(port, () => {
            console.log(`Add-on hosted at http://localhost:${port}/manifest.json`);
        });
    } catch (e) {
        console.error("Failed to start addon:", e);
    }
})();

// Export the app for serverless deployment (Vercel)
module.exports = app;
