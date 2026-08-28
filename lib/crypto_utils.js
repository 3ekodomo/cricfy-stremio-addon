const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

let SECRET1 = process.env.CRICFY_SECRET1 || '';
let SECRET2 = process.env.CRICFY_SECRET2 || '';

try {
  if (!SECRET1) SECRET1 = fs.readFileSync(path.join(__dirname, '../resources/secret1.txt'), 'utf8').trim();
} catch (e) { }

try {
  if (!SECRET2) SECRET2 = fs.readFileSync(path.join(__dirname, '../resources/secret2.txt'), 'utf8').trim();
} catch (e) { }

function parseKeyInfo(secret) {
  if (!secret) return null;
  const parts = secret.split(":");
  if (parts.length !== 2) return null;
  return { key: Buffer.from(parts[0], 'hex'), iv: Buffer.from(parts[1], 'hex') };
}

function getKeys() {
  const keys = {};
  if (SECRET1) keys["key1"] = parseKeyInfo(SECRET1);
  if (SECRET2) keys["key2"] = parseKeyInfo(SECRET2);
  return keys;
}

function tryDecrypt(ciphertextBuffer, keyInfo) {
  try {
    const decipher = crypto.createDecipheriv('aes-128-cbc', keyInfo.key, keyInfo.iv);
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(ciphertextBuffer, undefined, 'utf8');
    decrypted += decipher.final('utf8');
    const text = decrypted.toString('utf8');
    if (text.startsWith("{") || text.startsWith("[") || text.toLowerCase().includes("http")) return text;
    return null;
  } catch (err) { return null; }
}

function decryptData(encryptedBase64) {
  try {
    const cleanBase64 = encryptedBase64.trim().replace(/[\n\r \t]/g, "");
    const ciphertextBuffer = Buffer.from(cleanBase64, 'base64');
    const keys = getKeys();
    for (const keyId in keys) {
      if (keys[keyId]) {
        const result = tryDecrypt(ciphertextBuffer, keys[keyId]);
        if (result !== null) return result;
      }
    }
    return null;
  } catch (err) { return null; }
}

function decryptContent(content) {
  content = content.trim();
  try {
    if (content.startsWith("#EXTM3U") || content.startsWith("#EXTINF") || content.startsWith("#KODIPROP")) {
      return content;
    }
    const trimmedContent = content.trim();
    if (trimmedContent.length < 79) return trimmedContent;

    const part1 = trimmedContent.substring(0, 10);
    const part2 = trimmedContent.substring(34, trimmedContent.length - 54);
    const part3 = trimmedContent.substring(trimmedContent.length - 10);
    const encryptedDataStr = part1 + part2 + part3;

    const ivBase64 = trimmedContent.substring(10, 34);
    const keyBase64 = trimmedContent.substring(trimmedContent.length - 54, trimmedContent.length - 10);

    let iv = Buffer.from(ivBase64, 'base64');
    let key = Buffer.from(keyBase64, 'base64');

    // Pycryptodome AES CBC requires IV to be exactly 16 bytes.
    // If the base64 decoding results in more, it's either an invalid format or we need to truncate.
    // We truncate to match what we need. Base64 of 24 chars gives 18 bytes.
    // Wait! In Python, base64.b64decode might ignore non-alphabet characters or pad differently.
    // But actually, we just need the first 16 bytes. Same for key, which is 32 bytes for AES-256 or 16 for AES-128.
    // Let's use aes-256-cbc if key is 32 bytes, else aes-128-cbc.

    if (iv.length > 16) iv = iv.subarray(0, 16);
    if (key.length > 32) key = key.subarray(0, 32);
    else if (key.length > 24 && key.length < 32) key = key.subarray(0, 24);
    else if (key.length > 16 && key.length < 24) key = key.subarray(0, 16);

    const algorithm = key.length === 32 ? 'aes-256-cbc' : (key.length === 24 ? 'aes-192-cbc' : 'aes-128-cbc');

    const encryptedBytes = Buffer.from(encryptedDataStr, 'base64');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(encryptedBytes, undefined, 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted.toString('utf8');
  } catch (err) {
    console.error("crypto_utils: Content decryption failed: ", err.message);
    return content;
  }
}

module.exports = { decryptData, decryptContent };
