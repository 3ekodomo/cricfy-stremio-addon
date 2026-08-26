├── .python-version
├── plugin.video.cricfy/ (5900 tokens)
    ├── lib/ (4100 tokens)
    │   ├── __init__.py
    │   ├── logger.py
    │   ├── config.py
    │   ├── req.py (200 tokens)
    │   ├── storageserverdummy.py (200 tokens)
    │   ├── providers.py (700 tokens)
    │   ├── crypto_utils.py (900 tokens)
    │   ├── remote_config.py (900 tokens)
    │   └── m3u_parser.py (1000 tokens)
    ├── resources/ (100 tokens)
    │   ├── .gitkeep
    │   └── .gitignore
    ├── icon.png
    ├── service.py
    ├── addon.xml (200 tokens)
    └── main.py (1300 tokens)
├── .github/ (800 tokens)
    ├── funding.yml
    └── workflows/ (800 tokens)
    │   └── build.yml (800 tokens)
├── .gitignore
├── pyproject.toml
├── main.py (400 tokens)
├── README.md (900 tokens)
├── uv.lock (5900 tokens)
└── LICENSE (7900 tokens)


/.python-version:
--------------------------------------------------------------------------------
1 | 3.12
2 | 


--------------------------------------------------------------------------------
/plugin.video.cricfy/lib/__init__.py:
--------------------------------------------------------------------------------
1 | 


--------------------------------------------------------------------------------
/plugin.video.cricfy/resources/.gitkeep:
--------------------------------------------------------------------------------
1 | 


--------------------------------------------------------------------------------
/.github/funding.yml:
--------------------------------------------------------------------------------
1 | github: itsyourap
2 | buy_me_a_coffee: itsyourap


--------------------------------------------------------------------------------
/plugin.video.cricfy/resources/.gitignore:
--------------------------------------------------------------------------------
1 | cricfy_properties.json
2 | secret*.txt


--------------------------------------------------------------------------------
/plugin.video.cricfy/icon.png:
--------------------------------------------------------------------------------
https://raw.githubusercontent.com/itsyourap/cricfy-kodi-plugin/main/plugin.video.cricfy/icon.png


--------------------------------------------------------------------------------
/.gitignore:
--------------------------------------------------------------------------------
 1 | # Python-generated files
 2 | __pycache__/
 3 | *.py[oc]
 4 | build/
 5 | dist/
 6 | wheels/
 7 | *.egg-info
 8 | 
 9 | # Virtual environments
10 | .venv
11 | 


--------------------------------------------------------------------------------
/pyproject.toml:
--------------------------------------------------------------------------------
 1 | [project]
 2 | name = "cricfy-kodi-plugin"
 3 | version = "1.3.1"
 4 | description = "Cricfy Plugin for Kodi"
 5 | readme = "README.md"
 6 | requires-python = ">=3.12"
 7 | dependencies = [
 8 |     "kodistubs>=21.0.0",
 9 |     "pycryptodomex>=3.23.0",
10 |     "requests>=2.32.5",
11 | ]
12 | 


--------------------------------------------------------------------------------
/plugin.video.cricfy/lib/logger.py:
--------------------------------------------------------------------------------
1 | import xbmc
2 | 
3 | 
4 | def log_error(component: str, message: str) -> None:
5 |   xbmc.log(f"Cricfy Plugin [{component}]: {message}", xbmc.LOGERROR)
6 | 
7 | 
8 | def log_info(component: str, message: str) -> None:
9 |   xbmc.log(f"Cricfy Plugin [{component}]: {message}", xbmc.LOGINFO)


--------------------------------------------------------------------------------
/plugin.video.cricfy/lib/config.py:
--------------------------------------------------------------------------------
 1 | from pathlib import Path
 2 | from xbmcaddon import Addon
 3 | from xbmcvfs import translatePath
 4 | try:
 5 |   import StorageServer  # pyright: ignore[reportMissingImports]
 6 | except:
 7 |   import lib.storageserverdummy as StorageServer
 8 | 
 9 | ADDON_PATH = Path(translatePath(Addon().getAddonInfo('path')))
10 | cache = StorageServer.StorageServer("cricfy_plugin", 24)
11 | 


--------------------------------------------------------------------------------
/plugin.video.cricfy/service.py:
--------------------------------------------------------------------------------
 1 | from lib.config import cache
 2 | from lib.logger import log_info
 3 | from lib.providers import get_providers
 4 | 
 5 | if __name__ == '__main__':
 6 |   # Clear all cache entries
 7 |   cache.delete('%')
 8 |   log_info("service", "All cache cleared")
 9 | 
10 |   # Prefetch providers to warm up cache
11 |   providers = get_providers()
12 |   log_info("service", f"Fetched {len(providers)} providers")
13 | 


--------------------------------------------------------------------------------
/plugin.video.cricfy/lib/req.py:
--------------------------------------------------------------------------------
 1 | import requests
 2 | 
 3 | # Custom Headers for fetching M3U playlists
 4 | custom_headers = {
 5 |   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
 6 |   "Accept": "*/*",
 7 |   "Cache-Control": "no-cache, no-store",
 8 | }
 9 | 
10 | license_headers = {
11 |   "Content-Type": "*/*",
12 |   "User-Agent": "Dalvik/2.1.0 (Linux; U; Android)",
13 | }
14 | 
15 | 
16 | def fetch_url(url: str, timeout: int = 15) -> str:
17 |   response = requests.get(
18 |     url=url,
19 |     headers=custom_headers,
20 |     timeout=timeout,
21 |   )
22 |   response.raise_for_status()
23 |   if response.status_code != 200:
24 |     return ""
25 |   return response.text
26 | 


--------------------------------------------------------------------------------
/plugin.video.cricfy/addon.xml:
--------------------------------------------------------------------------------
 1 | <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 2 | <addon id="plugin.video.cricfy"
 3 |   name="Cricfy"
 4 |   version="1.3.0"
 5 |   provider-name="itsyourap">
 6 |   <requires>
 7 |     <import addon="xbmc.python" version="3.0.0" />
 8 |     <import addon="script.common.plugin.cache" version="3.0.0" />
 9 |     <import addon="script.module.requests" />
10 |     <import addon="script.module.pycryptodome" />
11 |     <import addon="inputstream.adaptive" />
12 |   </requires>
13 |   <extension point="xbmc.service" library="service.py" />
14 |   <extension point="xbmc.python.pluginsource" library="main.py">
15 |     <provides>video</provides>
16 |   </extension>
17 |   <extension point="xbmc.addon.metadata">
18 |     <summary lang="en">Cricfy Plugin for Kodi</summary>
19 |     <description lang="en">Cricfy Plugin for Kodi</description>
20 |     <platform>all</platform>
21 |     <assets>
22 |       <icon>icon.png</icon>
23 |     </assets>
24 |   </extension>
25 | </addon>


--------------------------------------------------------------------------------
/plugin.video.cricfy/lib/storageserverdummy.py:
--------------------------------------------------------------------------------
 1 | """
 2 |   StorageServer override
 3 |   Version: 1.0
 4 | 
 5 |   Copyright (C) 2010-2011 Tobias Ussing And Henrik Mosgaard Jensen
 6 |   Copyright (C) 2019 anxdpanic
 7 | 
 8 |   This file is part of script.common.plugin.cache
 9 | 
10 |   SPDX-License-Identifier: GPL-3.0-only
11 |   See LICENSES/GPL-3.0-only.txt for more information.
12 | """
13 | 
14 | 
15 | class StorageServer:
16 |   def __init__(self, table, timeout=24):
17 |     pass
18 | 
19 |   def cacheFunction(self, funct, *args):
20 |     if funct:
21 |       return funct(*args)
22 |     return []
23 | 
24 |   def set(self, name, data):
25 |     return ""
26 | 
27 |   def get(self, name):
28 |     return ""
29 | 
30 |   def setMulti(self, name, data):
31 |     return ""
32 | 
33 |   def getMulti(self, name, items):
34 |     return ""
35 | 
36 |   def lock(self, name):
37 |     return False
38 | 
39 |   def unlock(self, name):
40 |     return False
41 | 
42 |   def delete(self, name):
43 |     pass
44 | 


--------------------------------------------------------------------------------
/main.py:
--------------------------------------------------------------------------------
 1 | from pathlib import Path
 2 | import os
 3 | import json
 4 | 
 5 | CURRENT_DIR = Path(__file__).resolve().parent
 6 | CRICFY_PLUGIN_DIR = CURRENT_DIR / 'plugin.video.cricfy'
 7 | CRICFY_PLUGIN_RESOURCES_DIR = CRICFY_PLUGIN_DIR / 'resources'
 8 | 
 9 | CRICFY_SECRET1_FILE_PATH = CRICFY_PLUGIN_RESOURCES_DIR / 'secret1.txt'
10 | CRICFY_SECRET2_FILE_PATH = CRICFY_PLUGIN_RESOURCES_DIR / 'secret2.txt'
11 | CRICFY_PROPERTIES_FILE_PATH = CRICFY_PLUGIN_RESOURCES_DIR / 'cricfy_properties.json'
12 | 
13 | 
14 | def main():
15 |   CRICFY_FIREBASE_API_KEY = os.getenv('CRICFY_FIREBASE_API_KEY')
16 |   CRICFY_FIREBASE_APP_ID = os.getenv('CRICFY_FIREBASE_APP_ID')
17 |   CRICFY_PACKAGE_NAME = os.getenv('CRICFY_PACKAGE_NAME')
18 |   CRICFY_SECRET1 = os.getenv('CRICFY_SECRET1')
19 |   CRICFY_SECRET2 = os.getenv('CRICFY_SECRET2')
20 | 
21 |   if (
22 |     not CRICFY_FIREBASE_API_KEY
23 |     or not CRICFY_FIREBASE_APP_ID
24 |     or not CRICFY_PACKAGE_NAME
25 |     or (not CRICFY_SECRET1 and not CRICFY_SECRET2)
26 |   ):
27 |     raise Exception("Required environment variables not set.")
28 | 
29 |   if CRICFY_SECRET1:
30 |     with open(CRICFY_SECRET1_FILE_PATH, 'w') as f:
31 |       f.write(CRICFY_SECRET1)
32 | 
33 |   if CRICFY_SECRET2:
34 |     with open(CRICFY_SECRET2_FILE_PATH, 'w') as f:
35 |       f.write(CRICFY_SECRET2)
36 | 
37 |   cricfy_properties = {
38 |     "cricfy_firebase_api_key": CRICFY_FIREBASE_API_KEY,
39 |     "cricfy_firebase_app_id": CRICFY_FIREBASE_APP_ID,
40 |     "cricfy_package_name": CRICFY_PACKAGE_NAME
41 |   }
42 |   with open(CRICFY_PROPERTIES_FILE_PATH, 'w') as f:
43 |     json.dump(cricfy_properties, f, separators=(',', ':'))
44 | 
45 |   print("All Operations completed successfully.")
46 | 
47 | 
48 | if __name__ == "__main__":
49 |   main()
50 | 


--------------------------------------------------------------------------------
/plugin.video.cricfy/lib/providers.py:
--------------------------------------------------------------------------------
 1 | import time
 2 | import json
 3 | import hashlib
 4 | from lib.config import cache
 5 | from lib.logger import log_error, log_info
 6 | from lib.crypto_utils import decrypt_content, decrypt_data
 7 | from lib.req import fetch_url
 8 | from lib.m3u_parser import PlaylistItem, parse_m3u
 9 | from lib.remote_config import get_provider_api_url
10 | 
11 | PROVIDERS_CACHE_KEY = "cricfy_providers"
12 | CHANNEL_CACHE_TTL = 3600  # 1 hour
13 | 
14 | 
15 | def _hash_key(key: str) -> str:
16 |   """
17 |   Simple hash function for caching keys.
18 |   """
19 |   return hashlib.sha256(key.encode()).hexdigest()
20 | 
21 | 
22 | def get_providers():
23 |   """
24 |   Fetches and decrypts the list of providers from Cricfy.
25 |   Uses caching to avoid repeated network calls.
26 |   """
27 |   cached_providers = cache.get(PROVIDERS_CACHE_KEY)
28 |   if cached_providers and isinstance(cached_providers, str):
29 |     return json.loads(cached_providers)
30 | 
31 |   log_info("providers", "[Cache Miss] Fetching providers from remote URL")
32 | 
33 |   url = get_provider_api_url()
34 | 
35 |   if not url:
36 |     log_error("providers", "Provider API URL is not found")
37 |     return []
38 | 
39 |   response = fetch_url(
40 |     f"{url}/cats.txt",
41 |     timeout=15,
42 |   )
43 |   if response:
44 |     try:
45 |       decrypted_data = decrypt_data(response)
46 |       if not decrypted_data:
47 |         return []
48 | 
49 |       providers = json.loads(decrypted_data)
50 | 
51 |       if not isinstance(providers, list):
52 |         return []
53 | 
54 |       cache.set(PROVIDERS_CACHE_KEY, decrypted_data)
55 |       log_info("providers", "Providers cached successfully")
56 |       return providers
57 |     except Exception as e:
58 |       log_error("providers", f"Error parsing providers: {e}")
59 |   return []
60 | 
61 | 
62 | def get_channels(provider_url: str):
63 |   """
64 |   Fetches channels for a specific provider.
65 |   """
66 |   channel_cache_key = f"channels_{_hash_key(provider_url)}"
67 |   cached_channels = cache.get(channel_cache_key)
68 |   if cached_channels and isinstance(cached_channels, str):
69 |     channel_data = json.loads(cached_channels)
70 |     fetch_time = float(channel_data.get('fetch_time'))
71 |     channels = json.loads(channel_data.get('channels', "[]"))
72 |     if (time.time() - fetch_time <= CHANNEL_CACHE_TTL) and isinstance(channels, list):
73 |       return [PlaylistItem.from_dict(item) for item in channels]
74 | 
75 |   log_info(
76 |     "providers", f"[Cache Miss] Fetching M3U URL ({provider_url}) content")
77 | 
78 |   try:
79 |     content = fetch_url(provider_url, timeout=15)
80 |     content = decrypt_content(content)
81 |     channels = parse_m3u(content)
82 |     cache.set(channel_cache_key, json.dumps({
83 |       'channels': json.dumps(channels, default=lambda o: o.to_dict()),
84 |       'fetch_time': time.time()
85 |     }))
86 |     return channels
87 |   except Exception as e:
88 |     log_error(
89 |       "providers", f"Error fetching M3U URL ({provider_url}) content: {e}")
90 |     raise e
91 | 


--------------------------------------------------------------------------------
/.github/workflows/build.yml:
--------------------------------------------------------------------------------
  1 | name: Build Cricfy Kodi Plugin
  2 | 
  3 | on:
  4 |   push:
  5 |     branches: [main]
  6 |     paths:
  7 |       - "plugin.video.cricfy/**"
  8 |       - ".python-version"
  9 |       - "pyproject.toml"
 10 |       - "uv.lock"
 11 |       - "main.py"
 12 |       - ".github/workflows/build.yml"
 13 |     tags:
 14 |       - "v*.*.*"
 15 |   workflow_dispatch:
 16 | 
 17 | permissions:
 18 |   contents: write
 19 | 
 20 | jobs:
 21 |   build:
 22 |     runs-on: ubuntu-latest
 23 | 
 24 |     steps:
 25 |       - name: Checkout repository
 26 |         uses: actions/checkout@v6
 27 | 
 28 |       - name: "Set up Python"
 29 |         uses: actions/setup-python@v6
 30 |         with:
 31 |           python-version-file: ".python-version"
 32 | 
 33 |       - name: Install uv
 34 |         uses: astral-sh/setup-uv@v7
 35 | 
 36 |       - name: Install the project
 37 |         run: uv sync --locked --all-extras
 38 | 
 39 |       - name: Run main.py
 40 |         env:
 41 |           CRICFY_SECRET1: ${{ secrets.CRICFY_SECRET1 }}
 42 |           CRICFY_SECRET2: ${{ secrets.CRICFY_SECRET2 }}
 43 |           CRICFY_FIREBASE_API_KEY: ${{ secrets.CRICFY_FIREBASE_API_KEY }}
 44 |           CRICFY_FIREBASE_APP_ID: ${{ secrets.CRICFY_FIREBASE_APP_ID }}
 45 |           CRICFY_PACKAGE_NAME: ${{ secrets.CRICFY_PACKAGE_NAME }}
 46 |         run: uv run main.py
 47 | 
 48 |       - name: Upload artifact
 49 |         uses: actions/upload-artifact@v5
 50 |         with:
 51 |           name: plugin.video.cricfy
 52 |           path: plugin.video.cricfy* # Wildcard is needed to include the enclosing folder
 53 | 
 54 |   release:
 55 |     needs: build
 56 |     if: startsWith(github.ref, 'refs/tags/v')
 57 |     runs-on: ubuntu-latest
 58 |     steps:
 59 |       - name: Download built artifact
 60 |         uses: actions/download-artifact@v6
 61 |         with:
 62 |           name: plugin.video.cricfy
 63 |           path: dist
 64 | 
 65 |       - name: Zip the folder
 66 |         run: |
 67 |           cd dist
 68 |           zip -r plugin.video.cricfy-${{ github.ref_name }}.zip plugin.video.cricfy
 69 |           rm -rf plugin.video.cricfy
 70 | 
 71 |       - name: Create GitHub release and upload asset(s)
 72 |         uses: softprops/action-gh-release@v2
 73 |         with:
 74 |           tag_name: ${{ github.ref_name }}
 75 |           name: Release ${{ github.ref_name }}
 76 |           files: dist/**
 77 |           make_latest: true
 78 |           prerelease: false
 79 |           draft: false
 80 |           generate_release_notes: true
 81 | 
 82 | 
 83 |   pre-release:
 84 |     needs: build
 85 |     if:  ${{ ! startsWith(github.ref, 'refs/tags/v') }}
 86 |     runs-on: ubuntu-latest
 87 |     steps:
 88 |       - name: Download built artifact
 89 |         uses: actions/download-artifact@v6
 90 |         with:
 91 |           name: plugin.video.cricfy
 92 |           path: dist
 93 | 
 94 |       - name: Zip the folder
 95 |         run: |
 96 |           cd dist
 97 |           zip -r plugin.video.cricfy-${{ github.ref_name }}.zip plugin.video.cricfy
 98 |           rm -rf plugin.video.cricfy
 99 | 
100 |       - name: Generate tag
101 |         id: gen_tag
102 |         run: |
103 |           echo "tag=${{ github.ref_name }}.$(date +'%Y.%m.%d.%H.%M')" >> $GITHUB_OUTPUT
104 | 
105 |       - name: Create GitHub release and upload asset(s)
106 |         uses: softprops/action-gh-release@v2
107 |         with:
108 |           tag_name: ${{ steps.gen_tag.outputs.tag }}
109 |           files: dist/**
110 |           prerelease: true
111 |           draft: false
112 |           generate_release_notes: true
113 | 


--------------------------------------------------------------------------------
/plugin.video.cricfy/lib/crypto_utils.py:
--------------------------------------------------------------------------------
  1 | import base64
  2 | from dataclasses import dataclass
  3 | from typing import Optional
  4 | from lib.logger import log_error
  5 | from lib.config import ADDON_PATH
  6 | from Cryptodome.Cipher import AES
  7 | from Cryptodome.Util.Padding import unpad
  8 | 
  9 | SECRET1_FILE_PATH = ADDON_PATH / "resources" / "secret1.txt"
 10 | SECRET2_FILE_PATH = ADDON_PATH / "resources" / "secret2.txt"
 11 | SECRET1 = SECRET1_FILE_PATH.read_text(encoding="utf-8").strip()
 12 | SECRET2 = SECRET2_FILE_PATH.read_text(encoding="utf-8").strip()
 13 | 
 14 | 
 15 | @dataclass
 16 | class KeyInfo:
 17 |   key: bytes
 18 |   iv: bytes
 19 | 
 20 | 
 21 | def hex_string_to_bytes(hex_str: str) -> bytes:
 22 |   return bytes.fromhex(hex_str)
 23 | 
 24 | 
 25 | def parse_key_info(secret: str) -> KeyInfo:
 26 |   key_hex, iv_hex = secret.split(":")
 27 |   return KeyInfo(
 28 |     key=hex_string_to_bytes(key_hex),
 29 |     iv=hex_string_to_bytes(iv_hex),
 30 |   )
 31 | 
 32 | 
 33 | def keys():
 34 |   keys = {}
 35 |   if SECRET1:
 36 |     keys["key1"] = parse_key_info(SECRET1)
 37 |   if SECRET2:
 38 |     keys["key2"] = parse_key_info(SECRET2)
 39 |   return keys
 40 | 
 41 | 
 42 | def decrypt_data(encrypted_base64: str) -> Optional[str]:
 43 |   try:
 44 |     clean_base64 = (
 45 |       encrypted_base64.strip()
 46 |       .replace("\n", "")
 47 |       .replace("\r", "")
 48 |       .replace(" ", "")
 49 |       .replace("\t", "")
 50 |     )
 51 | 
 52 |     ciphertext = base64.b64decode(clean_base64)
 53 | 
 54 |     for key_info in keys().values():
 55 |       result = try_decrypt(ciphertext, key_info)
 56 |       if result is not None:
 57 |         return result
 58 | 
 59 |     log_error("crypto_utils", "Decryption failed with all keys.")
 60 |     return None
 61 |   except Exception as e:
 62 |     log_error("crypto_utils", f"Decryption failed: {e}")
 63 |     return None
 64 | 
 65 | 
 66 | def try_decrypt(ciphertext: bytes, key_info: KeyInfo) -> Optional[str]:
 67 |   try:
 68 |     cipher = AES.new(key_info.key, AES.MODE_CBC, key_info.iv)
 69 |     decrypted = cipher.decrypt(ciphertext)
 70 | 
 71 |     # PKCS5/7 unpadding
 72 |     pad_len = decrypted[-1]
 73 |     decrypted = decrypted[:-pad_len]
 74 | 
 75 |     text = decrypted.decode("utf-8")
 76 | 
 77 |     if (
 78 |       text.startswith("{")
 79 |       or text.startswith("[")
 80 |       or "http" in text.lower()
 81 |     ):
 82 |       return text
 83 |     return None
 84 |   except Exception:
 85 |     return None
 86 | 
 87 | 
 88 | def decrypt_content(content: str) -> str:
 89 |   content = content.strip()
 90 |   try:
 91 |     # Check if content is already valid M3U
 92 |     if (content.startswith("#EXTM3U") or
 93 |         content.startswith("#EXTINF") or
 94 |             content.startswith("#KODIPROP")):
 95 |       return content
 96 | 
 97 |     trimmed_content = content.strip()
 98 | 
 99 |     # Check length requirement
100 |     if len(trimmed_content) < 79:
101 |       return trimmed_content
102 | 
103 |     # Extract parts for decryption (String slicing logic remains the same)
104 |     part1 = trimmed_content[0:10]
105 |     part2 = trimmed_content[34:-54]
106 |     part3 = trimmed_content[-10:]
107 |     encrypted_data_str = part1 + part2 + part3
108 | 
109 |     iv_base64 = trimmed_content[10:34]
110 |     key_base64 = trimmed_content[-54:-10]
111 | 
112 |     # Decode from Base64
113 |     iv = base64.b64decode(iv_base64)
114 |     key = base64.b64decode(key_base64)
115 |     encrypted_bytes = base64.b64decode(encrypted_data_str)
116 | 
117 |     # Decrypt using AES/CBC/PKCS5Padding
118 |     cipher = AES.new(key, AES.MODE_CBC, iv)
119 |     decrypted_padded = cipher.decrypt(encrypted_bytes)
120 | 
121 |     # Unpad and decode to string
122 |     decrypted_data = unpad(decrypted_padded, AES.block_size)
123 | 
124 |     return decrypted_data.decode('utf-8')
125 | 
126 |   except Exception as e:
127 |     log_error("crypto_utils", f"Content decryption failed: {e}")
128 |     return content  # Return original content if decryption fails
129 | 


--------------------------------------------------------------------------------
/plugin.video.cricfy/lib/remote_config.py:
--------------------------------------------------------------------------------
  1 | import requests
  2 | import uuid
  3 | import json
  4 | from lib.config import ADDON_PATH
  5 | from lib.logger import log_error
  6 | 
  7 | """
  8 |   Firebase Remote Config Fetcher
  9 |   Fetches remote config from Firebase to get API endpoints dynamically.
 10 | 
 11 |   Credits:
 12 |   - https://github.com/NivinCNC/CNCVerse-Cloud-Stream-Extension/blob/master/CricifyProvider/src/main/kotlin/com/cncverse/FirebaseRemoteConfigFetcher.kt
 13 | """
 14 | 
 15 | CRICFY_PROPERTIES_FILE_PATH = ADDON_PATH / \
 16 |   "resources" / "cricfy_properties.json"
 17 | CRICFY_PROPERTIES = json.loads(
 18 |   CRICFY_PROPERTIES_FILE_PATH.read_text(encoding="utf-8"))
 19 | 
 20 | # Constants
 21 | CRICFY_PACKAGE_NAME = CRICFY_PROPERTIES.get("cricfy_package_name")
 22 | CRICFY_FIREBASE_API_KEY = CRICFY_PROPERTIES.get("cricfy_firebase_api_key")
 23 | CRICFY_FIREBASE_APP_ID = CRICFY_PROPERTIES.get("cricfy_firebase_app_id")
 24 | PROJECT_NUMBER = CRICFY_FIREBASE_APP_ID.split(":")[1]
 25 | 
 26 | 
 27 | def _get_random_instance_id():
 28 |   """Generates a random UUID without dashes"""
 29 |   return uuid.uuid4().hex
 30 | 
 31 | 
 32 | def fetch_remote_config():
 33 |   """
 34 |   Fetches Firebase Remote Config and returns the entries map.
 35 |   :return: Dictionary of config entries or None if fetch fails.
 36 |   """
 37 |   # Basic validation
 38 |   if not CRICFY_FIREBASE_API_KEY or not CRICFY_FIREBASE_APP_ID or not PROJECT_NUMBER:
 39 |     log_error("remote_config", "Error: Missing Firebase Credentials (CRICFY_FIREBASE_API_KEY, CRICFY_FIREBASE_APP_ID, or PROJECT_NUMBER)")
 40 |     return None
 41 | 
 42 |   url = f"https://firebaseremoteconfig.googleapis.com/v1/projects/{PROJECT_NUMBER}/namespaces/firebase:fetch"
 43 |   # Generate fake instance ID (clean hex string)
 44 |   app_instance_id = _get_random_instance_id()
 45 | 
 46 |   # Request Payload
 47 |   payload = {
 48 |     "appInstanceId": app_instance_id,
 49 |     "appInstanceIdToken": "",
 50 |     "appId": CRICFY_FIREBASE_APP_ID,
 51 |     "countryCode": "US",
 52 |     "languageCode": "en-US",
 53 |     "platformVersion": "30",
 54 |     "timeZone": "UTC",
 55 |     "appVersion": "5.0",
 56 |     "appBuild": "50",
 57 |     "packageName": CRICFY_PACKAGE_NAME,
 58 |     "sdkVersion": "22.1.0",
 59 |     "analyticsUserProperties": {}
 60 |   }
 61 | 
 62 |   # Headers
 63 |   headers = {
 64 |     "Content-Type": "application/json",
 65 |     "Accept": "application/json",
 66 |     "X-Android-Package": CRICFY_PACKAGE_NAME,
 67 |     "X-Goog-Api-Key": CRICFY_FIREBASE_API_KEY,
 68 |     "X-Google-GFE-Can-Retry": "yes"
 69 |   }
 70 | 
 71 |   try:
 72 |     response = requests.post(
 73 |       url,
 74 |       headers=headers,
 75 |       json=payload,
 76 |       timeout=30,
 77 |     )
 78 | 
 79 |     if response.status_code == 200:
 80 |       response_data = response.json()
 81 | 
 82 |       # The structure usually has an 'entries' key holding the actual config
 83 |       return response_data.get("entries")
 84 |     else:
 85 |       log_error("remote_config",
 86 |                 f"Firebase Request Failed: {response.status_code} - {response.text}")
 87 |       return None
 88 | 
 89 |   except Exception as e:
 90 |     log_error("remote_config", f"Exception fetching remote config: {e}")
 91 |     return None
 92 | 
 93 | 
 94 | def get_provider_api_url():
 95 |   """
 96 |   Gets the provider API URL from Firebase Remote Config.
 97 |   Prioritizes 'cric_api2' then falls back to 'cric_api1'.
 98 |   """
 99 |   try_count = 1
100 |   entries = None
101 | 
102 |   while try_count <= 3:
103 |     entries = fetch_remote_config()
104 |     if entries:
105 |       break
106 |     try_count += 1
107 | 
108 |   if not entries:
109 |     return None
110 | 
111 |   return entries.get("cric_api2") or entries.get("cric_api1")
112 | 
113 | 
114 | def get_api_urls():
115 |   """
116 |   Gets all available API URLs.
117 |   :return: Tuple (api1, api2)
118 |   """
119 |   entries = fetch_remote_config()
120 |   if not entries:
121 |     return None
122 | 
123 |   return (entries.get("cric_api1"), entries.get("cric_api2"))
124 | 


--------------------------------------------------------------------------------
/README.md:
--------------------------------------------------------------------------------
 1 | # Cricfy Plugin for Kodi
 2 | 
 3 | ![Cricfy Plugin for Kodi](plugin.video.cricfy/icon.png)
 4 | 
 5 | Cricfy Plugin for Kodi is an unofficial Kodi add-on that lets you stream Cricfy content directly from your Kodi media center. The plugin aggregates streams and providers to give a convenient viewing experience from within Kodi.
 6 | 
 7 | ## Features
 8 | 
 9 | - Browse and play Cricfy streams from within Kodi
10 | - Aggregates multiple providers through Cricfy for higher availability
11 | 
12 | ## Installation
13 | 
14 | 1. Download the latest plugin ZIP file from [Releases](https://github.com/itsyourap/cricfy-kodi-plugin/releases) to a location accessible from the device where Kodi is installed. If you received this plugin as a ZIP package, use that file.
15 | 2. Open Kodi.
16 | 3. (Optional) Enable installation from unknown sources if required:
17 |     - Go to Settings -> System -> Add-ons and enable "Unknown sources".
18 | 4. Install the add-on from the ZIP file:
19 |     - From Kodi's home screen, go to Add-ons.
20 |     - Open the Add-on browser (the open box icon in the top-left).
21 |     - Choose "Install from zip file".
22 |     - Navigate to and select the downloaded `plugin.video.cricfy.zip` file.
23 |     - Wait for the "Add-on enabled" (or similar) notification.
24 | 5. Launch the plugin:
25 |     - From the home screen go to Add-ons -> Video add-ons and open "Cricfy".
26 | 
27 | Notes:
28 | 
29 | - The exact menu labels may vary slightly between Kodi versions, but the "Install from zip file" method is common to all modern Kodi releases.
30 | 
31 | ## Usage
32 | 
33 | - After installation open the add-on from Video Add-ons.
34 | - Browse available providers, then select a provider to view their channels.
35 | 
36 | ## Troubleshooting
37 | 
38 | - If the add-on fails to install, double-check that you selected the correct ZIP file and that "Unknown sources" is enabled (if applicable).
39 | - If streams fail to play, check your internet connection and try another provider/stream in the add-on.
40 | - For persistent issues, check Kodi's log (enable debug logging in Settings -> System -> Logging) and review the log file for errors.
41 | 
42 | ## Credits
43 | 
44 | Major portions of the code were ported from the following repository:
45 | 
46 | <https://github.com/NivinCNC/CNCVerse-Cloud-Stream-Extension/tree/master/CricifyProvider>
47 | 
48 | Thanks a lot to [NivinCNC](https://github.com/NivinCNC) for their work on the original Cricfy provider extension for Cloudstream. This Kodi plugin is based on their implementation, adapted to work within the Kodi ecosystem.
49 | 
50 | Please see that project for reference and additional context.
51 | 
52 | ## Contributing
53 | 
54 | If you'd like to contribute improvements or fixes, fork the repository and submit a pull request with a clear description of your changes.
55 | 
56 | ## License
57 | 
58 | [![GNU GPLv3 Image](https://www.gnu.org/graphics/gplv3-127x51.png)](http://www.gnu.org/licenses/gpl-3.0.en.html)
59 | 
60 | You can use, study, share and modify it at your will. They can be redistributed and/or modified under the terms of the
61 | [GNU General Public License](https://www.gnu.org/licenses/gpl.html) version 3 or later published by the Free Software Foundation.
62 | 
63 | ## Support
64 | 
65 | [![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://buymeacoffee.com/itsyourap)
66 | 
67 | If you find this project helpful and would like to support its development, consider buying me a coffee! Your support helps keep the project alive and allows me to dedicate more time to improvements and new features. Thank you for your generosity!
68 | 
69 | ## Disclaimer
70 | 
71 | This is an unofficial plugin. Use at your own risk. The plugin is not affiliated with Cricfy or Kodi.
72 | 
73 | ## DMCA
74 | 
75 | We hereby issue this notice to inform you that this add-on just functions like an ordinary browser (like your browser) that fetches video files from internet, and do not violate the provisions of the Digital Millennium Copyright Act (DMCA). The Content this add-on may access is not hosted by us or the Kodi application but the websites it is browsing in their autonomous mode. It is sole responsibility of the user and his/her countries' or states' law. If you think it is violating any intellectual property then please contact the actual file hosts not the owners of this repository or the Kodi application.
76 | 


--------------------------------------------------------------------------------
/plugin.video.cricfy/lib/m3u_parser.py:
--------------------------------------------------------------------------------
  1 | import re
  2 | import json
  3 | 
  4 | 
  5 | class PlaylistItem:
  6 |   def __init__(self):
  7 |     self.title = ""
  8 |     self.url = ""
  9 |     self.tvg_logo = ""
 10 |     self.group_title = ""
 11 |     self.user_agent = ""
 12 |     self.cookie = ""
 13 |     self.referer = ""
 14 |     self.license_string = ""
 15 |     self.headers = {}
 16 |     self.is_drm = False
 17 | 
 18 |   def to_json(self) -> str:
 19 |     """Returns the JSON string representation of this object"""
 20 |     return json.dumps(self.__dict__)
 21 | 
 22 |   def to_dict(self) -> dict:
 23 |     """Returns the dictionary representation of this object"""
 24 |     return self.__dict__
 25 | 
 26 |   @staticmethod
 27 |   def from_dict(data):
 28 |     """Helper to create an object back from a dictionary"""
 29 |     item = PlaylistItem()
 30 |     # Update item with data, ignoring keys that don't exist in the class
 31 |     item.__dict__.update(data)
 32 |     return item
 33 | 
 34 | 
 35 | def parse_m3u(content: str):
 36 |   lines = content.splitlines()
 37 |   items: list[PlaylistItem] = []
 38 |   current_item = None
 39 | 
 40 |   # Buffers for properties appearing before the URL line
 41 |   buf_user_agent = None
 42 |   buf_cookie = None
 43 |   buf_referer = None
 44 |   buf_license_string = None
 45 |   buf_attrs = None
 46 |   buf_title = None
 47 | 
 48 |   for line in lines:
 49 |     line = line.strip()
 50 |     if not line:
 51 |       continue
 52 | 
 53 |     if line.startswith("#EXTINF"):
 54 |       # Extract Attributes (tvg-logo, group-title)
 55 |       # Regex for key="value" or key=value
 56 |       matches = re.findall(r'([a-zA-Z0-9_-]+)=("[^"]*"|[^,]+)', line)
 57 |       attrs = {m[0]: m[1].strip('"') for m in matches}
 58 | 
 59 |       buf_attrs = attrs
 60 | 
 61 |       # Extract Title (everything after the last comma)
 62 |       title_split = line.rsplit(',', 1)
 63 |       if len(title_split) > 1:
 64 |         buf_title = title_split[1].strip()
 65 |       else:
 66 |         buf_title = "Unknown Channel"
 67 | 
 68 |     elif line.startswith("#EXTVLCOPT"):
 69 |       # Handle VLC Options
 70 |       if "http-user-agent=" in line:
 71 |         buf_user_agent = line.split("http-user-agent=")[1]
 72 |       if "http-referrer=" in line:
 73 |         buf_referer = line.split("http-referrer=")[1]
 74 | 
 75 |     elif line.startswith("#EXTHTTP"):
 76 |       # Custom HTTP headers format often found in these M3Us
 77 |       try:
 78 |         json_str = line.replace("#EXTHTTP:", "")
 79 |         data = json.loads(json_str)
 80 |         if "cookie" in data:
 81 |           buf_cookie = data["cookie"]
 82 |         if "user-agent" in data:
 83 |           buf_user_agent = data["user-agent"]
 84 |       except:
 85 |         pass
 86 | 
 87 |     elif line.startswith("#KODIPROP:inputstream.adaptive.license_key="):
 88 |       # License String for DRM
 89 |       buf_license_string = line.split("=", 1)[1]
 90 | 
 91 |     elif not line.startswith("#"):
 92 |       # Must be URL Line
 93 |       current_item = PlaylistItem()
 94 | 
 95 |       # Apply buffered items
 96 |       if buf_user_agent:
 97 |         current_item.user_agent = buf_user_agent
 98 |       if buf_cookie:
 99 |         current_item.cookie = buf_cookie
100 |       if buf_referer:
101 |         current_item.referer = buf_referer
102 |       if buf_license_string:
103 |         current_item.license_string = buf_license_string
104 |         current_item.is_drm = True
105 |       if buf_attrs:
106 |         if "tvg-logo" in buf_attrs:
107 |           current_item.tvg_logo = buf_attrs["tvg-logo"]
108 |         if "group-title" in buf_attrs:
109 |           current_item.group_title = buf_attrs["group-title"]
110 |       if buf_title:
111 |         current_item.title = buf_title
112 | 
113 |       # Reset buffers
114 |       buf_user_agent = None
115 |       buf_cookie = None
116 |       buf_referer = None
117 |       buf_license_string = None
118 |       buf_attrs = None
119 |       buf_title = None
120 | 
121 |       full_url_line = line
122 | 
123 |       # Handle pipe separated parameters (url|User-Agent=...&Referer=...)
124 |       if "|" in full_url_line:
125 |         url_parts = full_url_line.split("|")
126 |         current_item.url = url_parts[0]
127 |         params = url_parts[1].split("&")
128 |         for p in params:
129 |           if "=" in p:
130 |             k, v = p.split("=", 1)
131 |             if k.lower() == "user-agent":
132 |               current_item.user_agent = v
133 |             elif k.lower() == "referer":
134 |               current_item.referer = v
135 |             elif k.lower() == "cookie":
136 |               current_item.cookie = v
137 |             else:
138 |               current_item.headers[k] = v
139 |       else:
140 |         current_item.url = full_url_line
141 | 
142 |       items.append(current_item)
143 |       current_item = None  # Reset for next item
144 | 
145 |   return items
146 | 


--------------------------------------------------------------------------------
/plugin.video.cricfy/main.py:
--------------------------------------------------------------------------------
  1 | import re
  2 | import sys
  3 | from urllib.parse import urlencode, parse_qsl
  4 | import xbmcgui
  5 | import xbmcplugin
  6 | from lib.providers import get_providers, get_channels
  7 | from lib.req import license_headers
  8 | from lib.logger import log_error
  9 | 
 10 | # Base URL for the addon
 11 | BASE_URL = sys.argv[0]
 12 | ADDON_HANDLE = int(sys.argv[1])
 13 | 
 14 | 
 15 | def build_url(query):
 16 |   return f'{BASE_URL}?{urlencode(query)}'
 17 | 
 18 | 
 19 | def list_providers():
 20 |   """
 21 |   Lists the providers from Cricfy
 22 |   """
 23 |   provider_list = get_providers()
 24 | 
 25 |   for prov in provider_list:
 26 |     title = prov.get('title', 'Unknown')
 27 |     image = prov.get(
 28 |       'image', 'https://www.iconexperience.com/_img/v_collection_png/256x256/shadow/unknown.png')
 29 |     cat_link = prov.get('catLink', '')
 30 | 
 31 |     if not cat_link or not cat_link.startswith('http'):
 32 |       continue
 33 | 
 34 |     # Create a folder item for this provider
 35 |     li = xbmcgui.ListItem(label=title)
 36 |     li.setArt({'icon': image, 'thumb': image})
 37 | 
 38 |     url = build_url({'mode': 'list_channels', 'url': cat_link, 'title': title})
 39 |     xbmcplugin.addDirectoryItem(
 40 |       handle=ADDON_HANDLE, url=url, listitem=li, isFolder=True)
 41 | 
 42 |   xbmcplugin.endOfDirectory(ADDON_HANDLE)
 43 | 
 44 | 
 45 | def list_channels(provider_url):
 46 |   """
 47 |   Fetches the M3U from the specific provider and lists channels.
 48 |   """
 49 |   if not provider_url or not provider_url.startswith('http'):
 50 |     xbmcgui.Dialog().notification(
 51 |         'Error', 'Invalid provider URL', xbmcgui.NOTIFICATION_ERROR)
 52 |     xbmcplugin.endOfDirectory(ADDON_HANDLE)
 53 |     return
 54 | 
 55 |   # Fetch M3U content
 56 |   try:
 57 |     channels = get_channels(provider_url=provider_url)
 58 |     if not channels:
 59 |       xbmcgui.Dialog().notification(
 60 |           'Error', 'No channels found', xbmcgui.NOTIFICATION_ERROR)
 61 |       xbmcplugin.endOfDirectory(ADDON_HANDLE)
 62 |       return
 63 |   except Exception as e:
 64 |     log_error("main", f"Error fetching channels: {e}")
 65 |     xbmcgui.Dialog().notification(
 66 |         'Error', 'Failed to fetch playlist content', xbmcgui.NOTIFICATION_ERROR)
 67 |     xbmcplugin.endOfDirectory(ADDON_HANDLE)
 68 |     return
 69 | 
 70 |   for ch in channels:
 71 |     li = xbmcgui.ListItem(label=ch.title)
 72 |     li.setArt({'thumb': ch.tvg_logo, 'icon': ch.tvg_logo})
 73 |     li.setInfo('video', {'title': ch.title, 'genre': ch.group_title})
 74 |     li.setProperty('IsPlayable', 'true')
 75 | 
 76 |     # Construct URL for playback mode
 77 |     # We encode the channel data into the URL so we don't have to re-parse on playback
 78 |     params = {
 79 |       'mode': 'play',
 80 |       'provider_url': provider_url,
 81 |       'channel_title': ch.title,
 82 |     }
 83 | 
 84 |     url = build_url(params)
 85 |     xbmcplugin.addDirectoryItem(
 86 |       handle=ADDON_HANDLE, url=url, listitem=li, isFolder=False)
 87 |   xbmcplugin.endOfDirectory(ADDON_HANDLE)
 88 | 
 89 | 
 90 | def play_video(provider_url, channel_title):
 91 |   """
 92 |   Resolves the URL and sets up Inputstream Adaptive for DRM or HLS.
 93 |   """
 94 |   try:
 95 |     channels = get_channels(provider_url=provider_url)
 96 |     channel = next((ch for ch in channels if ch.title == channel_title), None)
 97 |     if not channel:
 98 |       raise ValueError("Channel not found")
 99 | 
100 |     url = channel.url
101 |     user_agent = channel.user_agent
102 |     cookie = channel.cookie
103 |     referer = channel.referer
104 |     license_string = channel.license_string
105 |     headers = channel.headers
106 |   except Exception as e:
107 |     log_error("main", f"Error resolving channel: {e}")
108 |     xbmcgui.Dialog().notification(
109 |         'Error', 'Failed to resolve channel URL', xbmcgui.NOTIFICATION_ERROR)
110 |     return
111 | 
112 |   li = xbmcgui.ListItem(path=url)
113 | 
114 |   # Construct standard headers string for Kodi
115 |   stream_headers = []
116 |   if headers:
117 |     for k, v in headers.items():
118 |       stream_headers.append(f'{k}={v}')
119 | 
120 |   if user_agent:
121 |     stream_headers.append(f'User-Agent={user_agent}')
122 |   if referer:
123 |     stream_headers.append(f'Referer={referer}')
124 |   if cookie:
125 |     stream_headers.append(f'Cookie={cookie}')
126 | 
127 |   # Check if DASH (mpd) or HLS (m3u/m3u8) or DRM license is present
128 |   if '.mpd' in url or '.m3u8' in url or '.m3u' in url or license_string:
129 |     li.setProperty('inputstream', 'inputstream.adaptive')
130 | 
131 |     if (stream_headers):
132 |       encoded_headers = '&'.join(stream_headers)
133 |       li.setProperty('inputstream.adaptive.manifest_headers', encoded_headers)
134 |       li.setProperty('inputstream.adaptive.stream_headers', encoded_headers)
135 |       url += '|' + encoded_headers
136 |       li.setPath(url)
137 | 
138 |     if license_string:
139 |       # Check if Clearkey license exists
140 |       # Match format hex:hex (one or more hex digits each side)
141 |       hex_pair_re = re.compile(r'^[0-9a-fA-F]+:[0-9a-fA-F]+$')
142 | 
143 |       if license_string and hex_pair_re.match(license_string):
144 |         drm_config = f"org.w3.clearkey|{license_string}"
145 |         li.setProperty('inputstream.adaptive.drm_legacy', drm_config)
146 | 
147 |       # If it's a URL (Clearkey License Server)
148 |       elif license_string and license_string.startswith('http'):
149 |         drm_config = f"org.w3.clearkey|{license_string}|{urlencode(license_headers)}"
150 |         li.setProperty('inputstream.adaptive.drm_legacy', drm_config)
151 |   xbmcplugin.setResolvedUrl(ADDON_HANDLE, True, li)
152 | 
153 | 
154 | def router(param_string):
155 |   params = dict(parse_qsl(param_string))
156 |   mode = params.get('mode')
157 | 
158 |   if mode is None:
159 |     list_providers()
160 |   elif mode == 'list_channels':
161 |     list_channels(params.get('url'))
162 |   elif mode == 'play':
163 |     play_video(
164 |       params.get('provider_url'),
165 |       params.get('channel_title')
166 |     )
167 |   else:
168 |     xbmcgui.Dialog().notification(
169 |       'Error', 'Not implemented', xbmcgui.NOTIFICATION_ERROR)
170 | 
171 | 
172 | if __name__ == '__main__':
173 |   router(sys.argv[2][1:])
174 | 


--------------------------------------------------------------------------------
/uv.lock:
--------------------------------------------------------------------------------
  1 | version = 1
  2 | revision = 3
  3 | requires-python = ">=3.12"
  4 | 
  5 | [[package]]
  6 | name = "certifi"
  7 | version = "2026.1.4"
  8 | source = { registry = "https://pypi.org/simple" }
  9 | sdist = { url = "https://files.pythonhosted.org/packages/e0/2d/a891ca51311197f6ad14a7ef42e2399f36cf2f9bd44752b3dc4eab60fdc5/certifi-2026.1.4.tar.gz", hash = "sha256:ac726dd470482006e014ad384921ed6438c457018f4b3d204aea4281258b2120", size = 154268, upload-time = "2026-01-04T02:42:41.825Z" }
 10 | wheels = [
 11 |     { url = "https://files.pythonhosted.org/packages/e6/ad/3cc14f097111b4de0040c83a525973216457bbeeb63739ef1ed275c1c021/certifi-2026.1.4-py3-none-any.whl", hash = "sha256:9943707519e4add1115f44c2bc244f782c0249876bf51b6599fee1ffbedd685c", size = 152900, upload-time = "2026-01-04T02:42:40.15Z" },
 12 | ]
 13 | 
 14 | [[package]]
 15 | name = "charset-normalizer"
 16 | version = "3.4.4"
 17 | source = { registry = "https://pypi.org/simple" }
 18 | sdist = { url = "https://files.pythonhosted.org/packages/13/69/33ddede1939fdd074bce5434295f38fae7136463422fe4fd3e0e89b98062/charset_normalizer-3.4.4.tar.gz", hash = "sha256:94537985111c35f28720e43603b8e7b43a6ecfb2ce1d3058bbe955b73404e21a", size = 129418, upload-time = "2025-10-14T04:42:32.879Z" }
 19 | wheels = [
 20 |     { url = "https://files.pythonhosted.org/packages/f3/85/1637cd4af66fa687396e757dec650f28025f2a2f5a5531a3208dc0ec43f2/charset_normalizer-3.4.4-cp312-cp312-macosx_10_13_universal2.whl", hash = "sha256:0a98e6759f854bd25a58a73fa88833fba3b7c491169f86ce1180c948ab3fd394", size = 208425, upload-time = "2025-10-14T04:40:53.353Z" },
 21 |     { url = "https://files.pythonhosted.org/packages/9d/6a/04130023fef2a0d9c62d0bae2649b69f7b7d8d24ea5536feef50551029df/charset_normalizer-3.4.4-cp312-cp312-manylinux2014_aarch64.manylinux_2_17_aarch64.manylinux_2_28_aarch64.whl", hash = "sha256:b5b290ccc2a263e8d185130284f8501e3e36c5e02750fc6b6bdeb2e9e96f1e25", size = 148162, upload-time = "2025-10-14T04:40:54.558Z" },
 22 |     { url = "https://files.pythonhosted.org/packages/78/29/62328d79aa60da22c9e0b9a66539feae06ca0f5a4171ac4f7dc285b83688/charset_normalizer-3.4.4-cp312-cp312-manylinux2014_armv7l.manylinux_2_17_armv7l.manylinux_2_31_armv7l.whl", hash = "sha256:74bb723680f9f7a6234dcf67aea57e708ec1fbdf5699fb91dfd6f511b0a320ef", size = 144558, upload-time = "2025-10-14T04:40:55.677Z" },
 23 |     { url = "https://files.pythonhosted.org/packages/86/bb/b32194a4bf15b88403537c2e120b817c61cd4ecffa9b6876e941c3ee38fe/charset_normalizer-3.4.4-cp312-cp312-manylinux2014_ppc64le.manylinux_2_17_ppc64le.manylinux_2_28_ppc64le.whl", hash = "sha256:f1e34719c6ed0b92f418c7c780480b26b5d9c50349e9a9af7d76bf757530350d", size = 161497, upload-time = "2025-10-14T04:40:57.217Z" },
 24 |     { url = "https://files.pythonhosted.org/packages/19/89/a54c82b253d5b9b111dc74aca196ba5ccfcca8242d0fb64146d4d3183ff1/charset_normalizer-3.4.4-cp312-cp312-manylinux2014_s390x.manylinux_2_17_s390x.manylinux_2_28_s390x.whl", hash = "sha256:2437418e20515acec67d86e12bf70056a33abdacb5cb1655042f6538d6b085a8", size = 159240, upload-time = "2025-10-14T04:40:58.358Z" },
 25 |     { url = "https://files.pythonhosted.org/packages/c0/10/d20b513afe03acc89ec33948320a5544d31f21b05368436d580dec4e234d/charset_normalizer-3.4.4-cp312-cp312-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl", hash = "sha256:11d694519d7f29d6cd09f6ac70028dba10f92f6cdd059096db198c283794ac86", size = 153471, upload-time = "2025-10-14T04:40:59.468Z" },
 26 |     { url = "https://files.pythonhosted.org/packages/61/fa/fbf177b55bdd727010f9c0a3c49eefa1d10f960e5f09d1d887bf93c2e698/charset_normalizer-3.4.4-cp312-cp312-manylinux_2_31_riscv64.manylinux_2_39_riscv64.whl", hash = "sha256:ac1c4a689edcc530fc9d9aa11f5774b9e2f33f9a0c6a57864e90908f5208d30a", size = 150864, upload-time = "2025-10-14T04:41:00.623Z" },
 27 |     { url = "https://files.pythonhosted.org/packages/05/12/9fbc6a4d39c0198adeebbde20b619790e9236557ca59fc40e0e3cebe6f40/charset_normalizer-3.4.4-cp312-cp312-musllinux_1_2_aarch64.whl", hash = "sha256:21d142cc6c0ec30d2efee5068ca36c128a30b0f2c53c1c07bd78cb6bc1d3be5f", size = 150647, upload-time = "2025-10-14T04:41:01.754Z" },
 28 |     { url = "https://files.pythonhosted.org/packages/ad/1f/6a9a593d52e3e8c5d2b167daf8c6b968808efb57ef4c210acb907c365bc4/charset_normalizer-3.4.4-cp312-cp312-musllinux_1_2_armv7l.whl", hash = "sha256:5dbe56a36425d26d6cfb40ce79c314a2e4dd6211d51d6d2191c00bed34f354cc", size = 145110, upload-time = "2025-10-14T04:41:03.231Z" },
 29 |     { url = "https://files.pythonhosted.org/packages/30/42/9a52c609e72471b0fc54386dc63c3781a387bb4fe61c20231a4ebcd58bdd/charset_normalizer-3.4.4-cp312-cp312-musllinux_1_2_ppc64le.whl", hash = "sha256:5bfbb1b9acf3334612667b61bd3002196fe2a1eb4dd74d247e0f2a4d50ec9bbf", size = 162839, upload-time = "2025-10-14T04:41:04.715Z" },
 30 |     { url = "https://files.pythonhosted.org/packages/c4/5b/c0682bbf9f11597073052628ddd38344a3d673fda35a36773f7d19344b23/charset_normalizer-3.4.4-cp312-cp312-musllinux_1_2_riscv64.whl", hash = "sha256:d055ec1e26e441f6187acf818b73564e6e6282709e9bcb5b63f5b23068356a15", size = 150667, upload-time = "2025-10-14T04:41:05.827Z" },
 31 |     { url = "https://files.pythonhosted.org/packages/e4/24/a41afeab6f990cf2daf6cb8c67419b63b48cf518e4f56022230840c9bfb2/charset_normalizer-3.4.4-cp312-cp312-musllinux_1_2_s390x.whl", hash = "sha256:af2d8c67d8e573d6de5bc30cdb27e9b95e49115cd9baad5ddbd1a6207aaa82a9", size = 160535, upload-time = "2025-10-14T04:41:06.938Z" },
 32 |     { url = "https://files.pythonhosted.org/packages/2a/e5/6a4ce77ed243c4a50a1fecca6aaaab419628c818a49434be428fe24c9957/charset_normalizer-3.4.4-cp312-cp312-musllinux_1_2_x86_64.whl", hash = "sha256:780236ac706e66881f3b7f2f32dfe90507a09e67d1d454c762cf642e6e1586e0", size = 154816, upload-time = "2025-10-14T04:41:08.101Z" },
 33 |     { url = "https://files.pythonhosted.org/packages/a8/ef/89297262b8092b312d29cdb2517cb1237e51db8ecef2e9af5edbe7b683b1/charset_normalizer-3.4.4-cp312-cp312-win32.whl", hash = "sha256:5833d2c39d8896e4e19b689ffc198f08ea58116bee26dea51e362ecc7cd3ed26", size = 99694, upload-time = "2025-10-14T04:41:09.23Z" },
 34 |     { url = "https://files.pythonhosted.org/packages/3d/2d/1e5ed9dd3b3803994c155cd9aacb60c82c331bad84daf75bcb9c91b3295e/charset_normalizer-3.4.4-cp312-cp312-win_amd64.whl", hash = "sha256:a79cfe37875f822425b89a82333404539ae63dbdddf97f84dcbc3d339aae9525", size = 107131, upload-time = "2025-10-14T04:41:10.467Z" },
 35 |     { url = "https://files.pythonhosted.org/packages/d0/d9/0ed4c7098a861482a7b6a95603edce4c0d9db2311af23da1fb2b75ec26fc/charset_normalizer-3.4.4-cp312-cp312-win_arm64.whl", hash = "sha256:376bec83a63b8021bb5c8ea75e21c4ccb86e7e45ca4eb81146091b56599b80c3", size = 100390, upload-time = "2025-10-14T04:41:11.915Z" },
 36 |     { url = "https://files.pythonhosted.org/packages/97/45/4b3a1239bbacd321068ea6e7ac28875b03ab8bc0aa0966452db17cd36714/charset_normalizer-3.4.4-cp313-cp313-macosx_10_13_universal2.whl", hash = "sha256:e1f185f86a6f3403aa2420e815904c67b2f9ebc443f045edd0de921108345794", size = 208091, upload-time = "2025-10-14T04:41:13.346Z" },
 37 |     { url = "https://files.pythonhosted.org/packages/7d/62/73a6d7450829655a35bb88a88fca7d736f9882a27eacdca2c6d505b57e2e/charset_normalizer-3.4.4-cp313-cp313-manylinux2014_aarch64.manylinux_2_17_aarch64.manylinux_2_28_aarch64.whl", hash = "sha256:6b39f987ae8ccdf0d2642338faf2abb1862340facc796048b604ef14919e55ed", size = 147936, upload-time = "2025-10-14T04:41:14.461Z" },
 38 |     { url = "https://files.pythonhosted.org/packages/89/c5/adb8c8b3d6625bef6d88b251bbb0d95f8205831b987631ab0c8bb5d937c2/charset_normalizer-3.4.4-cp313-cp313-manylinux2014_armv7l.manylinux_2_17_armv7l.manylinux_2_31_armv7l.whl", hash = "sha256:3162d5d8ce1bb98dd51af660f2121c55d0fa541b46dff7bb9b9f86ea1d87de72", size = 144180, upload-time = "2025-10-14T04:41:15.588Z" },
 39 |     { url = "https://files.pythonhosted.org/packages/91/ed/9706e4070682d1cc219050b6048bfd293ccf67b3d4f5a4f39207453d4b99/charset_normalizer-3.4.4-cp313-cp313-manylinux2014_ppc64le.manylinux_2_17_ppc64le.manylinux_2_28_ppc64le.whl", hash = "sha256:81d5eb2a312700f4ecaa977a8235b634ce853200e828fbadf3a9c50bab278328", size = 161346, upload-time = "2025-10-14T04:41:16.738Z" },
 40 |     { url = "https://files.pythonhosted.org/packages/d5/0d/031f0d95e4972901a2f6f09ef055751805ff541511dc1252ba3ca1f80cf5/charset_normalizer-3.4.4-cp313-cp313-manylinux2014_s390x.manylinux_2_17_s390x.manylinux_2_28_s390x.whl", hash = "sha256:5bd2293095d766545ec1a8f612559f6b40abc0eb18bb2f5d1171872d34036ede", size = 158874, upload-time = "2025-10-14T04:41:17.923Z" },
 41 |     { url = "https://files.pythonhosted.org/packages/f5/83/6ab5883f57c9c801ce5e5677242328aa45592be8a00644310a008d04f922/charset_normalizer-3.4.4-cp313-cp313-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl", hash = "sha256:a8a8b89589086a25749f471e6a900d3f662d1d3b6e2e59dcecf787b1cc3a1894", size = 153076, upload-time = "2025-10-14T04:41:19.106Z" },
 42 |     { url = "https://files.pythonhosted.org/packages/75/1e/5ff781ddf5260e387d6419959ee89ef13878229732732ee73cdae01800f2/charset_normalizer-3.4.4-cp313-cp313-manylinux_2_31_riscv64.manylinux_2_39_riscv64.whl", hash = "sha256:bc7637e2f80d8530ee4a78e878bce464f70087ce73cf7c1caf142416923b98f1", size = 150601, upload-time = "2025-10-14T04:41:20.245Z" },
 43 |     { url = "https://files.pythonhosted.org/packages/d7/57/71be810965493d3510a6ca79b90c19e48696fb1ff964da319334b12677f0/charset_normalizer-3.4.4-cp313-cp313-musllinux_1_2_aarch64.whl", hash = "sha256:f8bf04158c6b607d747e93949aa60618b61312fe647a6369f88ce2ff16043490", size = 150376, upload-time = "2025-10-14T04:41:21.398Z" },
 44 |     { url = "https://files.pythonhosted.org/packages/e5/d5/c3d057a78c181d007014feb7e9f2e65905a6c4ef182c0ddf0de2924edd65/charset_normalizer-3.4.4-cp313-cp313-musllinux_1_2_armv7l.whl", hash = "sha256:554af85e960429cf30784dd47447d5125aaa3b99a6f0683589dbd27e2f45da44", size = 144825, upload-time = "2025-10-14T04:41:22.583Z" },
 45 |     { url = "https://files.pythonhosted.org/packages/e6/8c/d0406294828d4976f275ffbe66f00266c4b3136b7506941d87c00cab5272/charset_normalizer-3.4.4-cp313-cp313-musllinux_1_2_ppc64le.whl", hash = "sha256:74018750915ee7ad843a774364e13a3db91682f26142baddf775342c3f5b1133", size = 162583, upload-time = "2025-10-14T04:41:23.754Z" },
 46 |     { url = "https://files.pythonhosted.org/packages/d7/24/e2aa1f18c8f15c4c0e932d9287b8609dd30ad56dbe41d926bd846e22fb8d/charset_normalizer-3.4.4-cp313-cp313-musllinux_1_2_riscv64.whl", hash = "sha256:c0463276121fdee9c49b98908b3a89c39be45d86d1dbaa22957e38f6321d4ce3", size = 150366, upload-time = "2025-10-14T04:41:25.27Z" },
 47 |     { url = "https://files.pythonhosted.org/packages/e4/5b/1e6160c7739aad1e2df054300cc618b06bf784a7a164b0f238360721ab86/charset_normalizer-3.4.4-cp313-cp313-musllinux_1_2_s390x.whl", hash = "sha256:362d61fd13843997c1c446760ef36f240cf81d3ebf74ac62652aebaf7838561e", size = 160300, upload-time = "2025-10-14T04:41:26.725Z" },
 48 |     { url = "https://files.pythonhosted.org/packages/7a/10/f882167cd207fbdd743e55534d5d9620e095089d176d55cb22d5322f2afd/charset_normalizer-3.4.4-cp313-cp313-musllinux_1_2_x86_64.whl", hash = "sha256:9a26f18905b8dd5d685d6d07b0cdf98a79f3c7a918906af7cc143ea2e164c8bc", size = 154465, upload-time = "2025-10-14T04:41:28.322Z" },
 49 |     { url = "https://files.pythonhosted.org/packages/89/66/c7a9e1b7429be72123441bfdbaf2bc13faab3f90b933f664db506dea5915/charset_normalizer-3.4.4-cp313-cp313-win32.whl", hash = "sha256:9b35f4c90079ff2e2edc5b26c0c77925e5d2d255c42c74fdb70fb49b172726ac", size = 99404, upload-time = "2025-10-14T04:41:29.95Z" },
 50 |     { url = "https://files.pythonhosted.org/packages/c4/26/b9924fa27db384bdcd97ab83b4f0a8058d96ad9626ead570674d5e737d90/charset_normalizer-3.4.4-cp313-cp313-win_amd64.whl", hash = "sha256:b435cba5f4f750aa6c0a0d92c541fb79f69a387c91e61f1795227e4ed9cece14", size = 107092, upload-time = "2025-10-14T04:41:31.188Z" },
 51 |     { url = "https://files.pythonhosted.org/packages/af/8f/3ed4bfa0c0c72a7ca17f0380cd9e4dd842b09f664e780c13cff1dcf2ef1b/charset_normalizer-3.4.4-cp313-cp313-win_arm64.whl", hash = "sha256:542d2cee80be6f80247095cc36c418f7bddd14f4a6de45af91dfad36d817bba2", size = 100408, upload-time = "2025-10-14T04:41:32.624Z" },
 52 |     { url = "https://files.pythonhosted.org/packages/2a/35/7051599bd493e62411d6ede36fd5af83a38f37c4767b92884df7301db25d/charset_normalizer-3.4.4-cp314-cp314-macosx_10_13_universal2.whl", hash = "sha256:da3326d9e65ef63a817ecbcc0df6e94463713b754fe293eaa03da99befb9a5bd", size = 207746, upload-time = "2025-10-14T04:41:33.773Z" },
 53 |     { url = "https://files.pythonhosted.org/packages/10/9a/97c8d48ef10d6cd4fcead2415523221624bf58bcf68a802721a6bc807c8f/charset_normalizer-3.4.4-cp314-cp314-manylinux2014_aarch64.manylinux_2_17_aarch64.manylinux_2_28_aarch64.whl", hash = "sha256:8af65f14dc14a79b924524b1e7fffe304517b2bff5a58bf64f30b98bbc5079eb", size = 147889, upload-time = "2025-10-14T04:41:34.897Z" },
 54 |     { url = "https://files.pythonhosted.org/packages/10/bf/979224a919a1b606c82bd2c5fa49b5c6d5727aa47b4312bb27b1734f53cd/charset_normalizer-3.4.4-cp314-cp314-manylinux2014_armv7l.manylinux_2_17_armv7l.manylinux_2_31_armv7l.whl", hash = "sha256:74664978bb272435107de04e36db5a9735e78232b85b77d45cfb38f758efd33e", size = 143641, upload-time = "2025-10-14T04:41:36.116Z" },
 55 |     { url = "https://files.pythonhosted.org/packages/ba/33/0ad65587441fc730dc7bd90e9716b30b4702dc7b617e6ba4997dc8651495/charset_normalizer-3.4.4-cp314-cp314-manylinux2014_ppc64le.manylinux_2_17_ppc64le.manylinux_2_28_ppc64le.whl", hash = "sha256:752944c7ffbfdd10c074dc58ec2d5a8a4cd9493b314d367c14d24c17684ddd14", size = 160779, upload-time = "2025-10-14T04:41:37.229Z" },
 56 |     { url = "https://files.pythonhosted.org/packages/67/ed/331d6b249259ee71ddea93f6f2f0a56cfebd46938bde6fcc6f7b9a3d0e09/charset_normalizer-3.4.4-cp314-cp314-manylinux2014_s390x.manylinux_2_17_s390x.manylinux_2_28_s390x.whl", hash = "sha256:d1f13550535ad8cff21b8d757a3257963e951d96e20ec82ab44bc64aeb62a191", size = 159035, upload-time = "2025-10-14T04:41:38.368Z" },
 57 |     { url = "https://files.pythonhosted.org/packages/67/ff/f6b948ca32e4f2a4576aa129d8bed61f2e0543bf9f5f2b7fc3758ed005c9/charset_normalizer-3.4.4-cp314-cp314-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl", hash = "sha256:ecaae4149d99b1c9e7b88bb03e3221956f68fd6d50be2ef061b2381b61d20838", size = 152542, upload-time = "2025-10-14T04:41:39.862Z" },
 58 |     { url = "https://files.pythonhosted.org/packages/16/85/276033dcbcc369eb176594de22728541a925b2632f9716428c851b149e83/charset_normalizer-3.4.4-cp314-cp314-manylinux_2_31_riscv64.manylinux_2_39_riscv64.whl", hash = "sha256:cb6254dc36b47a990e59e1068afacdcd02958bdcce30bb50cc1700a8b9d624a6", size = 149524, upload-time = "2025-10-14T04:41:41.319Z" },
 59 |     { url = "https://files.pythonhosted.org/packages/9e/f2/6a2a1f722b6aba37050e626530a46a68f74e63683947a8acff92569f979a/charset_normalizer-3.4.4-cp314-cp314-musllinux_1_2_aarch64.whl", hash = "sha256:c8ae8a0f02f57a6e61203a31428fa1d677cbe50c93622b4149d5c0f319c1d19e", size = 150395, upload-time = "2025-10-14T04:41:42.539Z" },
 60 |     { url = "https://files.pythonhosted.org/packages/60/bb/2186cb2f2bbaea6338cad15ce23a67f9b0672929744381e28b0592676824/charset_normalizer-3.4.4-cp314-cp314-musllinux_1_2_armv7l.whl", hash = "sha256:47cc91b2f4dd2833fddaedd2893006b0106129d4b94fdb6af1f4ce5a9965577c", size = 143680, upload-time = "2025-10-14T04:41:43.661Z" },
 61 |     { url = "https://files.pythonhosted.org/packages/7d/a5/bf6f13b772fbb2a90360eb620d52ed8f796f3c5caee8398c3b2eb7b1c60d/charset_normalizer-3.4.4-cp314-cp314-musllinux_1_2_ppc64le.whl", hash = "sha256:82004af6c302b5d3ab2cfc4cc5f29db16123b1a8417f2e25f9066f91d4411090", size = 162045, upload-time = "2025-10-14T04:41:44.821Z" },
 62 |     { url = "https://files.pythonhosted.org/packages/df/c5/d1be898bf0dc3ef9030c3825e5d3b83f2c528d207d246cbabe245966808d/charset_normalizer-3.4.4-cp314-cp314-musllinux_1_2_riscv64.whl", hash = "sha256:2b7d8f6c26245217bd2ad053761201e9f9680f8ce52f0fcd8d0755aeae5b2152", size = 149687, upload-time = "2025-10-14T04:41:46.442Z" },
 63 |     { url = "https://files.pythonhosted.org/packages/a5/42/90c1f7b9341eef50c8a1cb3f098ac43b0508413f33affd762855f67a410e/charset_normalizer-3.4.4-cp314-cp314-musllinux_1_2_s390x.whl", hash = "sha256:799a7a5e4fb2d5898c60b640fd4981d6a25f1c11790935a44ce38c54e985f828", size = 160014, upload-time = "2025-10-14T04:41:47.631Z" },
 64 |     { url = "https://files.pythonhosted.org/packages/76/be/4d3ee471e8145d12795ab655ece37baed0929462a86e72372fd25859047c/charset_normalizer-3.4.4-cp314-cp314-musllinux_1_2_x86_64.whl", hash = "sha256:99ae2cffebb06e6c22bdc25801d7b30f503cc87dbd283479e7b606f70aff57ec", size = 154044, upload-time = "2025-10-14T04:41:48.81Z" },
 65 |     { url = "https://files.pythonhosted.org/packages/b0/6f/8f7af07237c34a1defe7defc565a9bc1807762f672c0fde711a4b22bf9c0/charset_normalizer-3.4.4-cp314-cp314-win32.whl", hash = "sha256:f9d332f8c2a2fcbffe1378594431458ddbef721c1769d78e2cbc06280d8155f9", size = 99940, upload-time = "2025-10-14T04:41:49.946Z" },
 66 |     { url = "https://files.pythonhosted.org/packages/4b/51/8ade005e5ca5b0d80fb4aff72a3775b325bdc3d27408c8113811a7cbe640/charset_normalizer-3.4.4-cp314-cp314-win_amd64.whl", hash = "sha256:8a6562c3700cce886c5be75ade4a5db4214fda19fede41d9792d100288d8f94c", size = 107104, upload-time = "2025-10-14T04:41:51.051Z" },
 67 |     { url = "https://files.pythonhosted.org/packages/da/5f/6b8f83a55bb8278772c5ae54a577f3099025f9ade59d0136ac24a0df4bde/charset_normalizer-3.4.4-cp314-cp314-win_arm64.whl", hash = "sha256:de00632ca48df9daf77a2c65a484531649261ec9f25489917f09e455cb09ddb2", size = 100743, upload-time = "2025-10-14T04:41:52.122Z" },
 68 |     { url = "https://files.pythonhosted.org/packages/0a/4c/925909008ed5a988ccbb72dcc897407e5d6d3bd72410d69e051fc0c14647/charset_normalizer-3.4.4-py3-none-any.whl", hash = "sha256:7a32c560861a02ff789ad905a2fe94e3f840803362c84fecf1851cb4cf3dc37f", size = 53402, upload-time = "2025-10-14T04:42:31.76Z" },
 69 | ]
 70 | 
 71 | [[package]]
 72 | name = "cricfy-kodi-plugin"
 73 | version = "1.3.1"
 74 | source = { virtual = "." }
 75 | dependencies = [
 76 |     { name = "kodistubs" },
 77 |     { name = "pycryptodomex" },
 78 |     { name = "requests" },
 79 | ]
 80 | 
 81 | [package.metadata]
 82 | requires-dist = [
 83 |     { name = "kodistubs", specifier = ">=21.0.0" },
 84 |     { name = "pycryptodomex", specifier = ">=3.23.0" },
 85 |     { name = "requests", specifier = ">=2.32.5" },
 86 | ]
 87 | 
 88 | [[package]]
 89 | name = "idna"
 90 | version = "3.11"
 91 | source = { registry = "https://pypi.org/simple" }
 92 | sdist = { url = "https://files.pythonhosted.org/packages/6f/6d/0703ccc57f3a7233505399edb88de3cbd678da106337b9fcde432b65ed60/idna-3.11.tar.gz", hash = "sha256:795dafcc9c04ed0c1fb032c2aa73654d8e8c5023a7df64a53f39190ada629902", size = 194582, upload-time = "2025-10-12T14:55:20.501Z" }
 93 | wheels = [
 94 |     { url = "https://files.pythonhosted.org/packages/0e/61/66938bbb5fc52dbdf84594873d5b51fb1f7c7794e9c0f5bd885f30bc507b/idna-3.11-py3-none-any.whl", hash = "sha256:771a87f49d9defaf64091e6e6fe9c18d4833f140bd19464795bc32d966ca37ea", size = 71008, upload-time = "2025-10-12T14:55:18.883Z" },
 95 | ]
 96 | 
 97 | [[package]]
 98 | name = "kodistubs"
 99 | version = "21.0.0"
100 | source = { registry = "https://pypi.org/simple" }
101 | sdist = { url = "https://files.pythonhosted.org/packages/24/bc/5cf6fcb211cfcfe572b48897140806c88d2c2ab7597d51dcac2313950304/Kodistubs-21.0.0.tar.gz", hash = "sha256:2c342eebf6c85c690788e6a4156a76d8eaa21b4e19e73df601ced0ca28d23576", size = 69842, upload-time = "2024-04-07T13:44:08.103Z" }
102 | wheels = [
103 |     { url = "https://files.pythonhosted.org/packages/c0/68/7ebaa78fa4ffe81e373419de1aa0aaa5a5f92b378ec616d7696646eecc87/Kodistubs-21.0.0-py3-none-any.whl", hash = "sha256:b82cf094648ad5c75cf532bc377e1255c71730011d23d664b7df8ac96aedd3e0", size = 71378, upload-time = "2024-04-07T13:44:06.109Z" },
104 | ]
105 | 
106 | [[package]]
107 | name = "pycryptodomex"
108 | version = "3.23.0"
109 | source = { registry = "https://pypi.org/simple" }
110 | sdist = { url = "https://files.pythonhosted.org/packages/c9/85/e24bf90972a30b0fcd16c73009add1d7d7cd9140c2498a68252028899e41/pycryptodomex-3.23.0.tar.gz", hash = "sha256:71909758f010c82bc99b0abf4ea12012c98962fbf0583c2164f8b84533c2e4da", size = 4922157, upload-time = "2025-05-17T17:23:41.434Z" }
111 | wheels = [
112 |     { url = "https://files.pythonhosted.org/packages/2e/00/10edb04777069a42490a38c137099d4b17ba6e36a4e6e28bdc7470e9e853/pycryptodomex-3.23.0-cp313-cp313t-macosx_10_13_universal2.whl", hash = "sha256:7b37e08e3871efe2187bc1fd9320cc81d87caf19816c648f24443483005ff886", size = 2498764, upload-time = "2025-05-17T17:22:21.453Z" },
113 |     { url = "https://files.pythonhosted.org/packages/6b/3f/2872a9c2d3a27eac094f9ceaa5a8a483b774ae69018040ea3240d5b11154/pycryptodomex-3.23.0-cp313-cp313t-macosx_10_13_x86_64.whl", hash = "sha256:91979028227543010d7b2ba2471cf1d1e398b3f183cb105ac584df0c36dac28d", size = 1643012, upload-time = "2025-05-17T17:22:23.702Z" },
114 |     { url = "https://files.pythonhosted.org/packages/70/af/774c2e2b4f6570fbf6a4972161adbb183aeeaa1863bde31e8706f123bf92/pycryptodomex-3.23.0-cp313-cp313t-manylinux_2_17_aarch64.manylinux2014_aarch64.whl", hash = "sha256:6b8962204c47464d5c1c4038abeadd4514a133b28748bcd9fa5b6d62e3cec6fa", size = 2187643, upload-time = "2025-05-17T17:22:26.37Z" },
115 |     { url = "https://files.pythonhosted.org/packages/de/a3/71065b24cb889d537954cedc3ae5466af00a2cabcff8e29b73be047e9a19/pycryptodomex-3.23.0-cp313-cp313t-manylinux_2_17_x86_64.manylinux2014_x86_64.whl", hash = "sha256:a33986a0066860f7fcf7c7bd2bc804fa90e434183645595ae7b33d01f3c91ed8", size = 2273762, upload-time = "2025-05-17T17:22:28.313Z" },
116 |     { url = "https://files.pythonhosted.org/packages/c9/0b/ff6f43b7fbef4d302c8b981fe58467b8871902cdc3eb28896b52421422cc/pycryptodomex-3.23.0-cp313-cp313t-manylinux_2_5_i686.manylinux1_i686.manylinux_2_17_i686.manylinux2014_i686.whl", hash = "sha256:c7947ab8d589e3178da3d7cdeabe14f841b391e17046954f2fbcd941705762b5", size = 2313012, upload-time = "2025-05-17T17:22:30.57Z" },
117 |     { url = "https://files.pythonhosted.org/packages/02/de/9d4772c0506ab6da10b41159493657105d3f8bb5c53615d19452afc6b315/pycryptodomex-3.23.0-cp313-cp313t-musllinux_1_2_aarch64.whl", hash = "sha256:c25e30a20e1b426e1f0fa00131c516f16e474204eee1139d1603e132acffc314", size = 2186856, upload-time = "2025-05-17T17:22:32.819Z" },
118 |     { url = "https://files.pythonhosted.org/packages/28/ad/8b30efcd6341707a234e5eba5493700a17852ca1ac7a75daa7945fcf6427/pycryptodomex-3.23.0-cp313-cp313t-musllinux_1_2_i686.whl", hash = "sha256:da4fa650cef02db88c2b98acc5434461e027dce0ae8c22dd5a69013eaf510006", size = 2347523, upload-time = "2025-05-17T17:22:35.386Z" },
119 |     { url = "https://files.pythonhosted.org/packages/0f/02/16868e9f655b7670dbb0ac4f2844145cbc42251f916fc35c414ad2359849/pycryptodomex-3.23.0-cp313-cp313t-musllinux_1_2_x86_64.whl", hash = "sha256:58b851b9effd0d072d4ca2e4542bf2a4abcf13c82a29fd2c93ce27ee2a2e9462", size = 2272825, upload-time = "2025-05-17T17:22:37.632Z" },
120 |     { url = "https://files.pythonhosted.org/packages/ca/18/4ca89ac737230b52ac8ffaca42f9c6f1fd07c81a6cd821e91af79db60632/pycryptodomex-3.23.0-cp313-cp313t-win32.whl", hash = "sha256:a9d446e844f08299236780f2efa9898c818fe7e02f17263866b8550c7d5fb328", size = 1772078, upload-time = "2025-05-17T17:22:40Z" },
121 |     { url = "https://files.pythonhosted.org/packages/73/34/13e01c322db027682e00986873eca803f11c56ade9ba5bbf3225841ea2d4/pycryptodomex-3.23.0-cp313-cp313t-win_amd64.whl", hash = "sha256:bc65bdd9fc8de7a35a74cab1c898cab391a4add33a8fe740bda00f5976ca4708", size = 1803656, upload-time = "2025-05-17T17:22:42.139Z" },
122 |     { url = "https://files.pythonhosted.org/packages/54/68/9504c8796b1805d58f4425002bcca20f12880e6fa4dc2fc9a668705c7a08/pycryptodomex-3.23.0-cp313-cp313t-win_arm64.whl", hash = "sha256:c885da45e70139464f082018ac527fdaad26f1657a99ee13eecdce0f0ca24ab4", size = 1707172, upload-time = "2025-05-17T17:22:44.704Z" },
123 |     { url = "https://files.pythonhosted.org/packages/dd/9c/1a8f35daa39784ed8adf93a694e7e5dc15c23c741bbda06e1d45f8979e9e/pycryptodomex-3.23.0-cp37-abi3-macosx_10_9_universal2.whl", hash = "sha256:06698f957fe1ab229a99ba2defeeae1c09af185baa909a31a5d1f9d42b1aaed6", size = 2499240, upload-time = "2025-05-17T17:22:46.953Z" },
124 |     { url = "https://files.pythonhosted.org/packages/7a/62/f5221a191a97157d240cf6643747558759126c76ee92f29a3f4aee3197a5/pycryptodomex-3.23.0-cp37-abi3-macosx_10_9_x86_64.whl", hash = "sha256:b2c2537863eccef2d41061e82a881dcabb04944c5c06c5aa7110b577cc487545", size = 1644042, upload-time = "2025-05-17T17:22:49.098Z" },
125 |     { url = "https://files.pythonhosted.org/packages/8c/fd/5a054543c8988d4ed7b612721d7e78a4b9bf36bc3c5ad45ef45c22d0060e/pycryptodomex-3.23.0-cp37-abi3-manylinux_2_17_aarch64.manylinux2014_aarch64.whl", hash = "sha256:43c446e2ba8df8889e0e16f02211c25b4934898384c1ec1ec04d7889c0333587", size = 2186227, upload-time = "2025-05-17T17:22:51.139Z" },
126 |     { url = "https://files.pythonhosted.org/packages/c8/a9/8862616a85cf450d2822dbd4fff1fcaba90877907a6ff5bc2672cafe42f8/pycryptodomex-3.23.0-cp37-abi3-manylinux_2_17_x86_64.manylinux2014_x86_64.whl", hash = "sha256:f489c4765093fb60e2edafdf223397bc716491b2b69fe74367b70d6999257a5c", size = 2272578, upload-time = "2025-05-17T17:22:53.676Z" },
127 |     { url = "https://files.pythonhosted.org/packages/46/9f/bda9c49a7c1842820de674ab36c79f4fbeeee03f8ff0e4f3546c3889076b/pycryptodomex-3.23.0-cp37-abi3-manylinux_2_5_i686.manylinux1_i686.manylinux_2_17_i686.manylinux2014_i686.whl", hash = "sha256:bdc69d0d3d989a1029df0eed67cc5e8e5d968f3724f4519bd03e0ec68df7543c", size = 2312166, upload-time = "2025-05-17T17:22:56.585Z" },
128 |     { url = "https://files.pythonhosted.org/packages/03/cc/870b9bf8ca92866ca0186534801cf8d20554ad2a76ca959538041b7a7cf4/pycryptodomex-3.23.0-cp37-abi3-musllinux_1_2_aarch64.whl", hash = "sha256:6bbcb1dd0f646484939e142462d9e532482bc74475cecf9c4903d4e1cd21f003", size = 2185467, upload-time = "2025-05-17T17:22:59.237Z" },
129 |     { url = "https://files.pythonhosted.org/packages/96/e3/ce9348236d8e669fea5dd82a90e86be48b9c341210f44e25443162aba187/pycryptodomex-3.23.0-cp37-abi3-musllinux_1_2_i686.whl", hash = "sha256:8a4fcd42ccb04c31268d1efeecfccfd1249612b4de6374205376b8f280321744", size = 2346104, upload-time = "2025-05-17T17:23:02.112Z" },
130 |     { url = "https://files.pythonhosted.org/packages/a5/e9/e869bcee87beb89040263c416a8a50204f7f7a83ac11897646c9e71e0daf/pycryptodomex-3.23.0-cp37-abi3-musllinux_1_2_x86_64.whl", hash = "sha256:55ccbe27f049743a4caf4f4221b166560d3438d0b1e5ab929e07ae1702a4d6fd", size = 2271038, upload-time = "2025-05-17T17:23:04.872Z" },
131 |     { url = "https://files.pythonhosted.org/packages/8d/67/09ee8500dd22614af5fbaa51a4aee6e342b5fa8aecf0a6cb9cbf52fa6d45/pycryptodomex-3.23.0-cp37-abi3-win32.whl", hash = "sha256:189afbc87f0b9f158386bf051f720e20fa6145975f1e76369303d0f31d1a8d7c", size = 1771969, upload-time = "2025-05-17T17:23:07.115Z" },
132 |     { url = "https://files.pythonhosted.org/packages/69/96/11f36f71a865dd6df03716d33bd07a67e9d20f6b8d39820470b766af323c/pycryptodomex-3.23.0-cp37-abi3-win_amd64.whl", hash = "sha256:52e5ca58c3a0b0bd5e100a9fbc8015059b05cffc6c66ce9d98b4b45e023443b9", size = 1803124, upload-time = "2025-05-17T17:23:09.267Z" },
133 |     { url = "https://files.pythonhosted.org/packages/f9/93/45c1cdcbeb182ccd2e144c693eaa097763b08b38cded279f0053ed53c553/pycryptodomex-3.23.0-cp37-abi3-win_arm64.whl", hash = "sha256:02d87b80778c171445d67e23d1caef279bf4b25c3597050ccd2e13970b57fd51", size = 1707161, upload-time = "2025-05-17T17:23:11.414Z" },
134 | ]
135 | 
136 | [[package]]
137 | name = "requests"
138 | version = "2.32.5"
139 | source = { registry = "https://pypi.org/simple" }
140 | dependencies = [
141 |     { name = "certifi" },
142 |     { name = "charset-normalizer" },
143 |     { name = "idna" },
144 |     { name = "urllib3" },
145 | ]
146 | sdist = { url = "https://files.pythonhosted.org/packages/c9/74/b3ff8e6c8446842c3f5c837e9c3dfcfe2018ea6ecef224c710c85ef728f4/requests-2.32.5.tar.gz", hash = "sha256:dbba0bac56e100853db0ea71b82b4dfd5fe2bf6d3754a8893c3af500cec7d7cf", size = 134517, upload-time = "2025-08-18T20:46:02.573Z" }
147 | wheels = [
148 |     { url = "https://files.pythonhosted.org/packages/1e/db/4254e3eabe8020b458f1a747140d32277ec7a271daf1d235b70dc0b4e6e3/requests-2.32.5-py3-none-any.whl", hash = "sha256:2462f94637a34fd532264295e186976db0f5d453d1cdd31473c85a6a161affb6", size = 64738, upload-time = "2025-08-18T20:46:00.542Z" },
149 | ]
150 | 
151 | [[package]]
152 | name = "urllib3"
153 | version = "2.6.3"
154 | source = { registry = "https://pypi.org/simple" }
155 | sdist = { url = "https://files.pythonhosted.org/packages/c7/24/5f1b3bdffd70275f6661c76461e25f024d5a38a46f04aaca912426a2b1d3/urllib3-2.6.3.tar.gz", hash = "sha256:1b62b6884944a57dbe321509ab94fd4d3b307075e0c2eae991ac71ee15ad38ed", size = 435556, upload-time = "2026-01-07T16:24:43.925Z" }
156 | wheels = [
157 |     { url = "https://files.pythonhosted.org/packages/39/08/aaaad47bc4e9dc8c725e68f9d04865dbcb2052843ff09c97b08904852d84/urllib3-2.6.3-py3-none-any.whl", hash = "sha256:bf272323e553dfb2e87d9bfd225ca7b0f467b919d7bbd355436d3fd37cb0acd4", size = 131584, upload-time = "2026-01-07T16:24:42.685Z" },
158 | ]
159 | 


--------------------------------------------------------------------------------
/LICENSE:
--------------------------------------------------------------------------------
  1 | GNU GENERAL PUBLIC LICENSE
  2 |                        Version 3, 29 June 2007
  3 | 
  4 |  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
  5 |  Everyone is permitted to copy and distribute verbatim copies
  6 |  of this license document, but changing it is not allowed.
  7 | 
  8 |                             Preamble
  9 | 
 10 |   The GNU General Public License is a free, copyleft license for
 11 | software and other kinds of works.
 12 | 
 13 |   The licenses for most software and other practical works are designed
 14 | to take away your freedom to share and change the works.  By contrast,
 15 | the GNU General Public License is intended to guarantee your freedom to
 16 | share and change all versions of a program--to make sure it remains free
 17 | software for all its users.  We, the Free Software Foundation, use the
 18 | GNU General Public License for most of our software; it applies also to
 19 | any other work released this way by its authors.  You can apply it to
 20 | your programs, too.
 21 | 
 22 |   When we speak of free software, we are referring to freedom, not
 23 | price.  Our General Public Licenses are designed to make sure that you
 24 | have the freedom to distribute copies of free software (and charge for
 25 | them if you wish), that you receive source code or can get it if you
 26 | want it, that you can change the software or use pieces of it in new
 27 | free programs, and that you know you can do these things.
 28 | 
 29 |   To protect your rights, we need to prevent others from denying you
 30 | these rights or asking you to surrender the rights.  Therefore, you have
 31 | certain responsibilities if you distribute copies of the software, or if
 32 | you modify it: responsibilities to respect the freedom of others.
 33 | 
 34 |   For example, if you distribute copies of such a program, whether
 35 | gratis or for a fee, you must pass on to the recipients the same
 36 | freedoms that you received.  You must make sure that they, too, receive
 37 | or can get the source code.  And you must show them these terms so they
 38 | know their rights.
 39 | 
 40 |   Developers that use the GNU GPL protect your rights with two steps:
 41 | (1) assert copyright on the software, and (2) offer you this License
 42 | giving you legal permission to copy, distribute and/or modify it.
 43 | 
 44 |   For the developers' and authors' protection, the GPL clearly explains
 45 | that there is no warranty for this free software.  For both users' and
 46 | authors' sake, the GPL requires that modified versions be marked as
 47 | changed, so that their problems will not be attributed erroneously to
 48 | authors of previous versions.
 49 | 
 50 |   Some devices are designed to deny users access to install or run
 51 | modified versions of the software inside them, although the manufacturer
 52 | can do so.  This is fundamentally incompatible with the aim of
 53 | protecting users' freedom to change the software.  The systematic
 54 | pattern of such abuse occurs in the area of products for individuals to
 55 | use, which is precisely where it is most unacceptable.  Therefore, we
 56 | have designed this version of the GPL to prohibit the practice for those
 57 | products.  If such problems arise substantially in other domains, we
 58 | stand ready to extend this provision to those domains in future versions
 59 | of the GPL, as needed to protect the freedom of users.
 60 | 
 61 |   Finally, every program is threatened constantly by software patents.
 62 | States should not allow patents to restrict development and use of
 63 | software on general-purpose computers, but in those that do, we wish to
 64 | avoid the special danger that patents applied to a free program could
 65 | make it effectively proprietary.  To prevent this, the GPL assures that
 66 | patents cannot be used to render the program non-free.
 67 | 
 68 |   The precise terms and conditions for copying, distribution and
 69 | modification follow.
 70 | 
 71 |                        TERMS AND CONDITIONS
 72 | 
 73 |   0. Definitions.
 74 | 
 75 |   "This License" refers to version 3 of the GNU General Public License.
 76 | 
 77 |   "Copyright" also means copyright-like laws that apply to other kinds of
 78 | works, such as semiconductor masks.
 79 | 
 80 |   "The Program" refers to any copyrightable work licensed under this
 81 | License.  Each licensee is addressed as "you".  "Licensees" and
 82 | "recipients" may be individuals or organizations.
 83 | 
 84 |   To "modify" a work means to copy from or adapt all or part of the work
 85 | in a fashion requiring copyright permission, other than the making of an
 86 | exact copy.  The resulting work is called a "modified version" of the
 87 | earlier work or a work "based on" the earlier work.
 88 | 
 89 |   A "covered work" means either the unmodified Program or a work based
 90 | on the Program.
 91 | 
 92 |   To "propagate" a work means to do anything with it that, without
 93 | permission, would make you directly or secondarily liable for
 94 | infringement under applicable copyright law, except executing it on a
 95 | computer or modifying a private copy.  Propagation includes copying,
 96 | distribution (with or without modification), making available to the
 97 | public, and in some countries other activities as well.
 98 | 
 99 |   To "convey" a work means any kind of propagation that enables other
100 | parties to make or receive copies.  Mere interaction with a user through
101 | a computer network, with no transfer of a copy, is not conveying.
102 | 
103 |   An interactive user interface displays "Appropriate Legal Notices"
104 | to the extent that it includes a convenient and prominently visible
105 | feature that (1) displays an appropriate copyright notice, and (2)
106 | tells the user that there is no warranty for the work (except to the
107 | extent that warranties are provided), that licensees may convey the
108 | work under this License, and how to view a copy of this License.  If
109 | the interface presents a list of user commands or options, such as a
110 | menu, a prominent item in the list meets this criterion.
111 | 
112 |   1. Source Code.
113 | 
114 |   The "source code" for a work means the preferred form of the work
115 | for making modifications to it.  "Object code" means any non-source
116 | form of a work.
117 | 
118 |   A "Standard Interface" means an interface that either is an official
119 | standard defined by a recognized standards body, or, in the case of
120 | interfaces specified for a particular programming language, one that
121 | is widely used among developers working in that language.
122 | 
123 |   The "System Libraries" of an executable work include anything, other
124 | than the work as a whole, that (a) is included in the normal form of
125 | packaging a Major Component, but which is not part of that Major
126 | Component, and (b) serves only to enable use of the work with that
127 | Major Component, or to implement a Standard Interface for which an
128 | implementation is available to the public in source code form.  A
129 | "Major Component", in this context, means a major essential component
130 | (kernel, window system, and so on) of the specific operating system
131 | (if any) on which the executable work runs, or a compiler used to
132 | produce the work, or an object code interpreter used to run it.
133 | 
134 |   The "Corresponding Source" for a work in object code form means all
135 | the source code needed to generate, install, and (for an executable
136 | work) run the object code and to modify the work, including scripts to
137 | control those activities.  However, it does not include the work's
138 | System Libraries, or general-purpose tools or generally available free
139 | programs which are used unmodified in performing those activities but
140 | which are not part of the work.  For example, Corresponding Source
141 | includes interface definition files associated with source files for
142 | the work, and the source code for shared libraries and dynamically
143 | linked subprograms that the work is specifically designed to require,
144 | such as by intimate data communication or control flow between those
145 | subprograms and other parts of the work.
146 | 
147 |   The Corresponding Source need not include anything that users
148 | can regenerate automatically from other parts of the Corresponding
149 | Source.
150 | 
151 |   The Corresponding Source for a work in source code form is that
152 | same work.
153 | 
154 |   2. Basic Permissions.
155 | 
156 |   All rights granted under this License are granted for the term of
157 | copyright on the Program, and are irrevocable provided the stated
158 | conditions are met.  This License explicitly affirms your unlimited
159 | permission to run the unmodified Program.  The output from running a
160 | covered work is covered by this License only if the output, given its
161 | content, constitutes a covered work.  This License acknowledges your
162 | rights of fair use or other equivalent, as provided by copyright law.
163 | 
164 |   You may make, run and propagate covered works that you do not
165 | convey, without conditions so long as your license otherwise remains
166 | in force.  You may convey covered works to others for the sole purpose
167 | of having them make modifications exclusively for you, or provide you
168 | with facilities for running those works, provided that you comply with
169 | the terms of this License in conveying all material for which you do
170 | not control copyright.  Those thus making or running the covered works
171 | for you must do so exclusively on your behalf, under your direction
172 | and control, on terms that prohibit them from making any copies of
173 | your copyrighted material outside their relationship with you.
174 | 
175 |   Conveying under any other circumstances is permitted solely under
176 | the conditions stated below.  Sublicensing is not allowed; section 10
177 | makes it unnecessary.
178 | 
179 |   3. Protecting Users' Legal Rights From Anti-Circumvention Law.
180 | 
181 |   No covered work shall be deemed part of an effective technological
182 | measure under any applicable law fulfilling obligations under article
183 | 11 of the WIPO copyright treaty adopted on 20 December 1996, or
184 | similar laws prohibiting or restricting circumvention of such
185 | measures.
186 | 
187 |   When you convey a covered work, you waive any legal power to forbid
188 | circumvention of technological measures to the extent such circumvention
189 | is effected by exercising rights under this License with respect to
190 | the covered work, and you disclaim any intention to limit operation or
191 | modification of the work as a means of enforcing, against the work's
192 | users, your or third parties' legal rights to forbid circumvention of
193 | technological measures.
194 | 
195 |   4. Conveying Verbatim Copies.
196 | 
197 |   You may convey verbatim copies of the Program's source code as you
198 | receive it, in any medium, provided that you conspicuously and
199 | appropriately publish on each copy an appropriate copyright notice;
200 | keep intact all notices stating that this License and any
201 | non-permissive terms added in accord with section 7 apply to the code;
202 | keep intact all notices of the absence of any warranty; and give all
203 | recipients a copy of this License along with the Program.
204 | 
205 |   You may charge any price or no price for each copy that you convey,
206 | and you may offer support or warranty protection for a fee.
207 | 
208 |   5. Conveying Modified Source Versions.
209 | 
210 |   You may convey a work based on the Program, or the modifications to
211 | produce it from the Program, in the form of source code under the
212 | terms of section 4, provided that you also meet all of these conditions:
213 | 
214 |     a) The work must carry prominent notices stating that you modified
215 |     it, and giving a relevant date.
216 | 
217 |     b) The work must carry prominent notices stating that it is
218 |     released under this License and any conditions added under section
219 |     7.  This requirement modifies the requirement in section 4 to
220 |     "keep intact all notices".
221 | 
222 |     c) You must license the entire work, as a whole, under this
223 |     License to anyone who comes into possession of a copy.  This
224 |     License will therefore apply, along with any applicable section 7
225 |     additional terms, to the whole of the work, and all its parts,
226 |     regardless of how they are packaged.  This License gives no
227 |     permission to license the work in any other way, but it does not
228 |     invalidate such permission if you have separately received it.
229 | 
230 |     d) If the work has interactive user interfaces, each must display
231 |     Appropriate Legal Notices; however, if the Program has interactive
232 |     interfaces that do not display Appropriate Legal Notices, your
233 |     work need not make them do so.
234 | 
235 |   A compilation of a covered work with other separate and independent
236 | works, which are not by their nature extensions of the covered work,
237 | and which are not combined with it such as to form a larger program,
238 | in or on a volume of a storage or distribution medium, is called an
239 | "aggregate" if the compilation and its resulting copyright are not
240 | used to limit the access or legal rights of the compilation's users
241 | beyond what the individual works permit.  Inclusion of a covered work
242 | in an aggregate does not cause this License to apply to the other
243 | parts of the aggregate.
244 | 
245 |   6. Conveying Non-Source Forms.
246 | 
247 |   You may convey a covered work in object code form under the terms
248 | of sections 4 and 5, provided that you also convey the
249 | machine-readable Corresponding Source under the terms of this License,
250 | in one of these ways:
251 | 
252 |     a) Convey the object code in, or embodied in, a physical product
253 |     (including a physical distribution medium), accompanied by the
254 |     Corresponding Source fixed on a durable physical medium
255 |     customarily used for software interchange.
256 | 
257 |     b) Convey the object code in, or embodied in, a physical product
258 |     (including a physical distribution medium), accompanied by a
259 |     written offer, valid for at least three years and valid for as
260 |     long as you offer spare parts or customer support for that product
261 |     model, to give anyone who possesses the object code either (1) a
262 |     copy of the Corresponding Source for all the software in the
263 |     product that is covered by this License, on a durable physical
264 |     medium customarily used for software interchange, for a price no
265 |     more than your reasonable cost of physically performing this
266 |     conveying of source, or (2) access to copy the
267 |     Corresponding Source from a network server at no charge.
268 | 
269 |     c) Convey individual copies of the object code with a copy of the
270 |     written offer to provide the Corresponding Source.  This
271 |     alternative is allowed only occasionally and noncommercially, and
272 |     only if you received the object code with such an offer, in accord
273 |     with subsection 6b.
274 | 
275 |     d) Convey the object code by offering access from a designated
276 |     place (gratis or for a charge), and offer equivalent access to the
277 |     Corresponding Source in the same way through the same place at no
278 |     further charge.  You need not require recipients to copy the
279 |     Corresponding Source along with the object code.  If the place to
280 |     copy the object code is a network server, the Corresponding Source
281 |     may be on a different server (operated by you or a third party)
282 |     that supports equivalent copying facilities, provided you maintain
283 |     clear directions next to the object code saying where to find the
284 |     Corresponding Source.  Regardless of what server hosts the
285 |     Corresponding Source, you remain obligated to ensure that it is
286 |     available for as long as needed to satisfy these requirements.
287 | 
288 |     e) Convey the object code using peer-to-peer transmission, provided
289 |     you inform other peers where the object code and Corresponding
290 |     Source of the work are being offered to the general public at no
291 |     charge under subsection 6d.
292 | 
293 |   A separable portion of the object code, whose source code is excluded
294 | from the Corresponding Source as a System Library, need not be
295 | included in conveying the object code work.
296 | 
297 |   A "User Product" is either (1) a "consumer product", which means any
298 | tangible personal property which is normally used for personal, family,
299 | or household purposes, or (2) anything designed or sold for incorporation
300 | into a dwelling.  In determining whether a product is a consumer product,
301 | doubtful cases shall be resolved in favor of coverage.  For a particular
302 | product received by a particular user, "normally used" refers to a
303 | typical or common use of that class of product, regardless of the status
304 | of the particular user or of the way in which the particular user
305 | actually uses, or expects or is expected to use, the product.  A product
306 | is a consumer product regardless of whether the product has substantial
307 | commercial, industrial or non-consumer uses, unless such uses represent
308 | the only significant mode of use of the product.
309 | 
310 |   "Installation Information" for a User Product means any methods,
311 | procedures, authorization keys, or other information required to install
312 | and execute modified versions of a covered work in that User Product from
313 | a modified version of its Corresponding Source.  The information must
314 | suffice to ensure that the continued functioning of the modified object
315 | code is in no case prevented or interfered with solely because
316 | modification has been made.
317 | 
318 |   If you convey an object code work under this section in, or with, or
319 | specifically for use in, a User Product, and the conveying occurs as
320 | part of a transaction in which the right of possession and use of the
321 | User Product is transferred to the recipient in perpetuity or for a
322 | fixed term (regardless of how the transaction is characterized), the
323 | Corresponding Source conveyed under this section must be accompanied
324 | by the Installation Information.  But this requirement does not apply
325 | if neither you nor any third party retains the ability to install
326 | modified object code on the User Product (for example, the work has
327 | been installed in ROM).
328 | 
329 |   The requirement to provide Installation Information does not include a
330 | requirement to continue to provide support service, warranty, or updates
331 | for a work that has been modified or installed by the recipient, or for
332 | the User Product in which it has been modified or installed.  Access to a
333 | network may be denied when the modification itself materially and
334 | adversely affects the operation of the network or violates the rules and
335 | protocols for communication across the network.
336 | 
337 |   Corresponding Source conveyed, and Installation Information provided,
338 | in accord with this section must be in a format that is publicly
339 | documented (and with an implementation available to the public in
340 | source code form), and must require no special password or key for
341 | unpacking, reading or copying.
342 | 
343 |   7. Additional Terms.
344 | 
345 |   "Additional permissions" are terms that supplement the terms of this
346 | License by making exceptions from one or more of its conditions.
347 | Additional permissions that are applicable to the entire Program shall
348 | be treated as though they were included in this License, to the extent
349 | that they are valid under applicable law.  If additional permissions
350 | apply only to part of the Program, that part may be used separately
351 | under those permissions, but the entire Program remains governed by
352 | this License without regard to the additional permissions.
353 | 
354 |   When you convey a copy of a covered work, you may at your option
355 | remove any additional permissions from that copy, or from any part of
356 | it.  (Additional permissions may be written to require their own
357 | removal in certain cases when you modify the work.)  You may place
358 | additional permissions on material, added by you to a covered work,
359 | for which you have or can give appropriate copyright permission.
360 | 
361 |   Notwithstanding any other provision of this License, for material you
362 | add to a covered work, you may (if authorized by the copyright holders of
363 | that material) supplement the terms of this License with terms:
364 | 
365 |     a) Disclaiming warranty or limiting liability differently from the
366 |     terms of sections 15 and 16 of this License; or
367 | 
368 |     b) Requiring preservation of specified reasonable legal notices or
369 |     author attributions in that material or in the Appropriate Legal
370 |     Notices displayed by works containing it; or
371 | 
372 |     c) Prohibiting misrepresentation of the origin of that material, or
373 |     requiring that modified versions of such material be marked in
374 |     reasonable ways as different from the original version; or
375 | 
376 |     d) Limiting the use for publicity purposes of names of licensors or
377 |     authors of the material; or
378 | 
379 |     e) Declining to grant rights under trademark law for use of some
380 |     trade names, trademarks, or service marks; or
381 | 
382 |     f) Requiring indemnification of licensors and authors of that
383 |     material by anyone who conveys the material (or modified versions of
384 |     it) with contractual assumptions of liability to the recipient, for
385 |     any liability that these contractual assumptions directly impose on
386 |     those licensors and authors.
387 | 
388 |   All other non-permissive additional terms are considered "further
389 | restrictions" within the meaning of section 10.  If the Program as you
390 | received it, or any part of it, contains a notice stating that it is
391 | governed by this License along with a term that is a further
392 | restriction, you may remove that term.  If a license document contains
393 | a further restriction but permits relicensing or conveying under this
394 | License, you may add to a covered work material governed by the terms
395 | of that license document, provided that the further restriction does
396 | not survive such relicensing or conveying.
397 | 
398 |   If you add terms to a covered work in accord with this section, you
399 | must place, in the relevant source files, a statement of the
400 | additional terms that apply to those files, or a notice indicating
401 | where to find the applicable terms.
402 | 
403 |   Additional terms, permissive or non-permissive, may be stated in the
404 | form of a separately written license, or stated as exceptions;
405 | the above requirements apply either way.
406 | 
407 |   8. Termination.
408 | 
409 |   You may not propagate or modify a covered work except as expressly
410 | provided under this License.  Any attempt otherwise to propagate or
411 | modify it is void, and will automatically terminate your rights under
412 | this License (including any patent licenses granted under the third
413 | paragraph of section 11).
414 | 
415 |   However, if you cease all violation of this License, then your
416 | license from a particular copyright holder is reinstated (a)
417 | provisionally, unless and until the copyright holder explicitly and
418 | finally terminates your license, and (b) permanently, if the copyright
419 | holder fails to notify you of the violation by some reasonable means
420 | prior to 60 days after the cessation.
421 | 
422 |   Moreover, your license from a particular copyright holder is
423 | reinstated permanently if the copyright holder notifies you of the
424 | violation by some reasonable means, this is the first time you have
425 | received notice of violation of this License (for any work) from that
426 | copyright holder, and you cure the violation prior to 30 days after
427 | your receipt of the notice.
428 | 
429 |   Termination of your rights under this section does not terminate the
430 | licenses of parties who have received copies or rights from you under
431 | this License.  If your rights have been terminated and not permanently
432 | reinstated, you do not qualify to receive new licenses for the same
433 | material under section 10.
434 | 
435 |   9. Acceptance Not Required for Having Copies.
436 | 
437 |   You are not required to accept this License in order to receive or
438 | run a copy of the Program.  Ancillary propagation of a covered work
439 | occurring solely as a consequence of using peer-to-peer transmission
440 | to receive a copy likewise does not require acceptance.  However,
441 | nothing other than this License grants you permission to propagate or
442 | modify any covered work.  These actions infringe copyright if you do
443 | not accept this License.  Therefore, by modifying or propagating a
444 | covered work, you indicate your acceptance of this License to do so.
445 | 
446 |   10. Automatic Licensing of Downstream Recipients.
447 | 
448 |   Each time you convey a covered work, the recipient automatically
449 | receives a license from the original licensors, to run, modify and
450 | propagate that work, subject to this License.  You are not responsible
451 | for enforcing compliance by third parties with this License.
452 | 
453 |   An "entity transaction" is a transaction transferring control of an
454 | organization, or substantially all assets of one, or subdividing an
455 | organization, or merging organizations.  If propagation of a covered
456 | work results from an entity transaction, each party to that
457 | transaction who receives a copy of the work also receives whatever
458 | licenses to the work the party's predecessor in interest had or could
459 | give under the previous paragraph, plus a right to possession of the
460 | Corresponding Source of the work from the predecessor in interest, if
461 | the predecessor has it or can get it with reasonable efforts.
462 | 
463 |   You may not impose any further restrictions on the exercise of the
464 | rights granted or affirmed under this License.  For example, you may
465 | not impose a license fee, royalty, or other charge for exercise of
466 | rights granted under this License, and you may not initiate litigation
467 | (including a cross-claim or counterclaim in a lawsuit) alleging that
468 | any patent claim is infringed by making, using, selling, offering for
469 | sale, or importing the Program or any portion of it.
470 | 
471 |   11. Patents.
472 | 
473 |   A "contributor" is a copyright holder who authorizes use under this
474 | License of the Program or a work on which the Program is based.  The
475 | work thus licensed is called the contributor's "contributor version".
476 | 
477 |   A contributor's "essential patent claims" are all patent claims
478 | owned or controlled by the contributor, whether already acquired or
479 | hereafter acquired, that would be infringed by some manner, permitted
480 | by this License, of making, using, or selling its contributor version,
481 | but do not include claims that would be infringed only as a
482 | consequence of further modification of the contributor version.  For
483 | purposes of this definition, "control" includes the right to grant
484 | patent sublicenses in a manner consistent with the requirements of
485 | this License.
486 | 
487 |   Each contributor grants you a non-exclusive, worldwide, royalty-free
488 | patent license under the contributor's essential patent claims, to
489 | make, use, sell, offer for sale, import and otherwise run, modify and
490 | propagate the contents of its contributor version.
491 | 
492 |   In the following three paragraphs, a "patent license" is any express
493 | agreement or commitment, however denominated, not to enforce a patent
494 | (such as an express permission to practice a patent or covenant not to
495 | sue for patent infringement).  To "grant" such a patent license to a
496 | party means to make such an agreement or commitment not to enforce a
497 | patent against the party.
498 | 
499 |   If you convey a covered work, knowingly relying on a patent license,
500 | and the Corresponding Source of the work is not available for anyone
501 | to copy, free of charge and under the terms of this License, through a
502 | publicly available network server or other readily accessible means,
503 | then you must either (1) cause the Corresponding Source to be so
504 | available, or (2) arrange to deprive yourself of the benefit of the
505 | patent license for this particular work, or (3) arrange, in a manner
506 | consistent with the requirements of this License, to extend the patent
507 | license to downstream recipients.  "Knowingly relying" means you have
508 | actual knowledge that, but for the patent license, your conveying the
509 | covered work in a country, or your recipient's use of the covered work
510 | in a country, would infringe one or more identifiable patents in that
511 | country that you have reason to believe are valid.
512 | 
513 |   If, pursuant to or in connection with a single transaction or
514 | arrangement, you convey, or propagate by procuring conveyance of, a
515 | covered work, and grant a patent license to some of the parties
516 | receiving the covered work authorizing them to use, propagate, modify
517 | or convey a specific copy of the covered work, then the patent license
518 | you grant is automatically extended to all recipients of the covered
519 | work and works based on it.
520 | 
521 |   A patent license is "discriminatory" if it does not include within
522 | the scope of its coverage, prohibits the exercise of, or is
523 | conditioned on the non-exercise of one or more of the rights that are
524 | specifically granted under this License.  You may not convey a covered
525 | work if you are a party to an arrangement with a third party that is
526 | in the business of distributing software, under which you make payment
527 | to the third party based on the extent of your activity of conveying
528 | the work, and under which the third party grants, to any of the
529 | parties who would receive the covered work from you, a discriminatory
530 | patent license (a) in connection with copies of the covered work
531 | conveyed by you (or copies made from those copies), or (b) primarily
532 | for and in connection with specific products or compilations that
533 | contain the covered work, unless you entered into that arrangement,
534 | or that patent license was granted, prior to 28 March 2007.
535 | 
536 |   Nothing in this License shall be construed as excluding or limiting
537 | any implied license or other defenses to infringement that may
538 | otherwise be available to you under applicable patent law.
539 | 
540 |   12. No Surrender of Others' Freedom.
541 | 
542 |   If conditions are imposed on you (whether by court order, agreement or
543 | otherwise) that contradict the conditions of this License, they do not
544 | excuse you from the conditions of this License.  If you cannot convey a
545 | covered work so as to satisfy simultaneously your obligations under this
546 | License and any other pertinent obligations, then as a consequence you may
547 | not convey it at all.  For example, if you agree to terms that obligate you
548 | to collect a royalty for further conveying from those to whom you convey
549 | the Program, the only way you could satisfy both those terms and this
550 | License would be to refrain entirely from conveying the Program.
551 | 
552 |   13. Use with the GNU Affero General Public License.
553 | 
554 |   Notwithstanding any other provision of this License, you have
555 | permission to link or combine any covered work with a work licensed
556 | under version 3 of the GNU Affero General Public License into a single
557 | combined work, and to convey the resulting work.  The terms of this
558 | License will continue to apply to the part which is the covered work,
559 | but the special requirements of the GNU Affero General Public License,
560 | section 13, concerning interaction through a network will apply to the
561 | combination as such.
562 | 
563 |   14. Revised Versions of this License.
564 | 
565 |   The Free Software Foundation may publish revised and/or new versions of
566 | the GNU General Public License from time to time.  Such new versions will
567 | be similar in spirit to the present version, but may differ in detail to
568 | address new problems or concerns.
569 | 
570 |   Each version is given a distinguishing version number.  If the
571 | Program specifies that a certain numbered version of the GNU General
572 | Public License "or any later version" applies to it, you have the
573 | option of following the terms and conditions either of that numbered
574 | version or of any later version published by the Free Software
575 | Foundation.  If the Program does not specify a version number of the
576 | GNU General Public License, you may choose any version ever published
577 | by the Free Software Foundation.
578 | 
579 |   If the Program specifies that a proxy can decide which future
580 | versions of the GNU General Public License can be used, that proxy's
581 | public statement of acceptance of a version permanently authorizes you
582 | to choose that version for the Program.
583 | 
584 |   Later license versions may give you additional or different
585 | permissions.  However, no additional obligations are imposed on any
586 | author or copyright holder as a result of your choosing to follow a
587 | later version.
588 | 
589 |   15. Disclaimer of Warranty.
590 | 
591 |   THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
592 | APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
593 | HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
594 | OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
595 | THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
596 | PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
597 | IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
598 | ALL NECESSARY SERVICING, REPAIR OR CORRECTION.
599 | 
600 |   16. Limitation of Liability.
601 | 
602 |   IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
603 | WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
604 | THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
605 | GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
606 | USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
607 | DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
608 | PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
609 | EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
610 | SUCH DAMAGES.
611 | 
612 |   17. Interpretation of Sections 15 and 16.
613 | 
614 |   If the disclaimer of warranty and limitation of liability provided
615 | above cannot be given local legal effect according to their terms,
616 | reviewing courts shall apply local law that most closely approximates
617 | an absolute waiver of all civil liability in connection with the
618 | Program, unless a warranty or assumption of liability accompanies a
619 | copy of the Program in return for a fee.
620 | 
621 |                      END OF TERMS AND CONDITIONS
622 | 
623 |             How to Apply These Terms to Your New Programs
624 | 
625 |   If you develop a new program, and you want it to be of the greatest
626 | possible use to the public, the best way to achieve this is to make it
627 | free software which everyone can redistribute and change under these terms.
628 | 
629 |   To do so, attach the following notices to the program.  It is safest
630 | to attach them to the start of each source file to most effectively
631 | state the exclusion of warranty; and each file should have at least
632 | the "copyright" line and a pointer to where the full notice is found.
633 | 
634 |     <one line to give the program's name and a brief idea of what it does.>
635 |     Copyright (C) <year>  <name of author>
636 | 
637 |     This program is free software: you can redistribute it and/or modify
638 |     it under the terms of the GNU General Public License as published by
639 |     the Free Software Foundation, either version 3 of the License, or
640 |     (at your option) any later version.
641 | 
642 |     This program is distributed in the hope that it will be useful,
643 |     but WITHOUT ANY WARRANTY; without even the implied warranty of
644 |     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
645 |     GNU General Public License for more details.
646 | 
647 |     You should have received a copy of the GNU General Public License
648 |     along with this program.  If not, see <https://www.gnu.org/licenses/>.
649 | 
650 | Also add information on how to contact you by electronic and paper mail.
651 | 
652 |   If the program does terminal interaction, make it output a short
653 | notice like this when it starts in an interactive mode:
654 | 
655 |     <program>  Copyright (C) <year>  <name of author>
656 |     This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
657 |     This is free software, and you are welcome to redistribute it
658 |     under certain conditions; type `show c' for details.
659 | 
660 | The hypothetical commands `show w' and `show c' should show the appropriate
661 | parts of the General Public License.  Of course, your program's commands
662 | might be different; for a GUI interface, you would use an "about box".
663 | 
664 |   You should also get your employer (if you work as a programmer) or school,
665 | if any, to sign a "copyright disclaimer" for the program, if necessary.
666 | For more information on this, and how to apply and follow the GNU GPL, see
667 | <https://www.gnu.org/licenses/>.
668 | 
669 |   The GNU General Public License does not permit incorporating your program
670 | into proprietary programs.  If your program is a subroutine library, you
671 | may consider it more useful to permit linking proprietary applications with
672 | the library.  If this is what you want to do, use the GNU Lesser General
673 | Public License instead of this License.  But first, please read
674 | <https://www.gnu.org/licenses/why-not-lgpl.html>.


--------------------------------------------------------------------------------
