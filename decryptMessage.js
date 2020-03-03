const crypto = require('crypto');
const getSharedSecret = require('./secret');
const { decompressString, addPrefix0x } = require('./utils')

/**
 * Decrypt message using sender's public key and recipient private key
 *
 * @method encryptMessage
 * @param {string} plaintext message in plain text
 * @param {string} privateKey privatekey of the sender
 * @param {string} publicKey public key of the receiver
 * @return {string} decrypted message in plain text
 */
async function decryptMessage(compressedCiphertext, privateKey, publicKey) {

  privateKey = addPrefix0x(privateKey);
  
  const decompressed = decompressString(compressedCiphertext).substring(2);
  const ciphertext = decompressed.substring(0, decompressed.length - 32);
  const iv = Buffer.from(
    decompressed.substring(decompressed.length - 32),
    'hex'
  );

  const algorithm = 'aes-256-cbc';

  const secret = await getSharedSecret(privateKey, publicKey);
  const decipher = crypto.createDecipheriv(algorithm, secret, iv);
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

module.exports = decryptMessage;
