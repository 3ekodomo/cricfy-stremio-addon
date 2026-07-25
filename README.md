### Stremio Add-on Repository Structure
Here is the standard file structure for a Node.js-based Stremio add-on designed to be hosted on GitHub and deployed via a serverless platform like Vercel or Render.
```text
cricfy-stremio-addon/
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
├── server.js
├── addon.js
├── lib/
│   ├── crypto_utils.js
│   ├── providers.js
│   └── m3u_parser.js
└── resources/
    ├── cricfy_properties.json
    ├── secret1.txt
    └── secret2.txt

```
### Breakdown of Repository Files
 * **.gitignore**: Specifies intentionally untracked files that GitHub should ignore, such as the node_modules/ folder and any .env files containing sensitive local testing variables.
 * **package.json & package-lock.json**: Manages your project's Node.js dependencies, such as stremio-addon-sdk, web framework packages (like express), and any cryptographic libraries (like crypto-js).
 * **README.md**: Contains the documentation for your project, including installation and deployment instructions.
 * **vercel.json**: An optional configuration file used if you choose to deploy your GitHub repository automatically via Vercel. It directs the serverless platform on how to build and route the Node.js app.
 * **server.js**: The main entry point of the application. It initializes the HTTP server or serverless function to listen for incoming requests from Stremio.
 * **addon.js**: Contains the core Stremio SDK logic. This is where you define your manifest.json equivalent and implement the builder.defineStreamHandler to intercept Stremio's stream requests.
 * **lib/crypto_utils.js**: Your JavaScript port of the original Python decryption logic, handling the unlocking of the M3U8 stream URLs.
 * **lib/providers.js**: The JavaScript logic responsible for constructing HTTP requests, using your secrets to authenticate with the source servers, and fetching the raw stream data.
 * **lib/m3u_parser.js**: A utility script to parse the fetched M3U playlists and extract the individual channel IDs or direct media links.
 * **resources/**: The directory holding your static configuration files. While cricfy_properties.json can be stored here, it is highly recommended to move the contents of secret1.txt and secret2.txt into environment variables on your deployment platform (rather than hardcoding them in the GitHub repository) to maintain security.
