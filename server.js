const express = require("express");
const { getRouter } = require("stremio-addon-sdk");
const addonInterface = require("./addon");

const app = express();

// Serve the add-on interface via Stremio's required router
app.use(getRouter(addonInterface));

// Define the port for local testing or serverless environments
const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`Add-on hosted at http://localhost:${port}/manifest.json`);
});

// Export the app for serverless deployment (Vercel)
module.exports = app;
