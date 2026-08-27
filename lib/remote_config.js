const axios = require('axios');
const crypto = require('crypto');

const fs = require('fs');
const path = require('path');

let properties = {};
try {
  const fileData = fs.readFileSync(path.join(__dirname, '../resources/cricfy_properties.json'), 'utf8');
  properties = JSON.parse(fileData);
} catch (e) {
  // ignore
}

// Configuration from environment variables or file
const CRICFY_PACKAGE_NAME = process.env.CRICFY_PACKAGE_NAME || properties.cricfy_package_name || '';
const CRICFY_FIREBASE_API_KEY = process.env.CRICFY_FIREBASE_API_KEY || properties.cricfy_firebase_api_key || '';
const CRICFY_FIREBASE_APP_ID = process.env.CRICFY_FIREBASE_APP_ID || properties.cricfy_firebase_app_id || '';
const PROJECT_NUMBER = CRICFY_FIREBASE_APP_ID ? CRICFY_FIREBASE_APP_ID.split(":")[1] : '';

function getRandomInstanceId() {
  return crypto.randomUUID().replace(/-/g, '');
}

async function fetchRemoteConfig() {
  if (!CRICFY_FIREBASE_API_KEY || !CRICFY_FIREBASE_APP_ID || !PROJECT_NUMBER) {
    console.error("remote_config: Error: Missing Firebase Credentials");
    return null;
  }

  const url = `https://firebaseremoteconfig.googleapis.com/v1/projects/${PROJECT_NUMBER}/namespaces/firebase:fetch`;
  const appInstanceId = getRandomInstanceId();

  const payload = {
    appInstanceId: appInstanceId,
    appInstanceIdToken: "",
    appId: CRICFY_FIREBASE_APP_ID,
    countryCode: "US",
    languageCode: "en-US",
    platformVersion: "30",
    timeZone: "UTC",
    appVersion: "5.0",
    appBuild: "50",
    packageName: CRICFY_PACKAGE_NAME,
    sdkVersion: "22.1.0",
    analyticsUserProperties: {}
  };

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Android-Package": CRICFY_PACKAGE_NAME,
    "X-Goog-Api-Key": CRICFY_FIREBASE_API_KEY,
    "X-Google-GFE-Can-Retry": "yes"
  };

  try {
    const response = await axios.post(url, payload, { headers, timeout: 30000 });
    if (response.status === 200) {
      return response.data.entries;
    } else {
      console.error(`remote_config: Firebase Request Failed: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("remote_config: Exception fetching remote config:", error.message);
    return null;
  }
}

async function getProviderApiUrl() {
  let tryCount = 1;
  let entries = null;

  while (tryCount <= 3) {
    entries = await fetchRemoteConfig();
    if (entries) {
      break;
    }
    tryCount++;
  }

  if (!entries) {
    return null;
  }

  return entries.cric_api2 || entries.cric_api1;
}

module.exports = {
  fetchRemoteConfig,
  getProviderApiUrl
};
