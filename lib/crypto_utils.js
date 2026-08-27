const crypto = require('crypto');

// Secrets injected via environment variables
const SECRET1 = process.env.CRICFY_SECRET1 || '';
const SECRET2 = process.env.CRICFY_SECRET2 || '';

function parseKeyInfo(secret) {
  if (!secret) return null;
  const parts = secret.split(":");
  if (parts.length !== 2) return null;
  return {
    key: Buffer.from(parts[0], 'hex'),
    iv: Buffer.from(parts[1], 'hex')
  };
}

function getKeys() {
  const keys = {};
  if (SECRET1) {
    keys["key1"] = parseKeyInfo(SECRET1);
  }
  if (SECRET2) {
    keys["key2"] = parseKeyInfo(SECRET2);
  }
  return keys;
}

function tryDecrypt(ciphertextBuffer, keyInfo) {
  try {
    const decipher = crypto.createDecipheriv('aes-128-cbc', keyInfo.key, keyInfo.iv);
    // Setting auto padding to true (default) handles PKCS5/7 padding automatically
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(ciphertextBuffer, undefined, 'utf8');
    decrypted += decipher.final('utf8');

    const text = decrypted.toString('utf8');

    if (
      text.startsWith("{") ||
      text.startsWith("[") ||
      text.toLowerCase().includes("http")
    ) {
      return text;
    }
    return null;
  } catch (err) {
    return null;
  }
}

function decryptData(encryptedBase64) {
  try {
    const cleanBase64 = encryptedBase64
      .trim()
      .replace(/\n/g, "")
      .replace(/\r/g, "")
      .replace(/ /g, "")
      .replace(/\t/g, "");

    const ciphertextBuffer = Buffer.from(cleanBase64, 'base64');

    const keys = getKeys();
    for (const keyId in keys) {
      const keyInfo = keys[keyId];
      if (keyInfo) {
        const result = tryDecrypt(ciphertextBuffer, keyInfo);
        if (result !== null) {
          return result;
        }
      }
    }

    console.error("crypto_utils: Decryption failed with all keys.");
    return null;
  } catch (err) {
    console.error("crypto_utils: Decryption failed: ", err.message);
    return null;
  }
}

function decryptContent(content) {
  content = content.trim();
  try {
    if (
      content.startsWith("#EXTM3U") ||
      content.startsWith("#EXTINF") ||
      content.startsWith("#KODIPROP")
    ) {
      return content;
    }

    const trimmedContent = content.trim();
    if (trimmedContent.length < 79) {
      return trimmedContent;
    }

    const part1 = trimmedContent.substring(0, 10);
    const part2 = trimmedContent.substring(34, trimmedContent.length - 54);
    const part3 = trimmedContent.substring(trimmedContent.length - 10);
    const encryptedDataStr = part1 + part2 + part3;

    const ivBase64 = trimmedContent.substring(10, 34);
    const keyBase64 = trimmedContent.substring(trimmedContent.length - 54, trimmedContent.length - 10);

    const iv = Buffer.from(ivBase64, 'base64');
    const key = Buffer.from(keyBase64, 'base64');
    const encryptedBytes = Buffer.from(encryptedDataStr, 'base64');

    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(encryptedBytes, undefined, 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted.toString('utf8');
  } catch (err) {
    console.error("crypto_utils: Content decryption failed: ", err.message);
    return content;
  }
}

module.exports = {
  decryptData,
  decryptContent
};
