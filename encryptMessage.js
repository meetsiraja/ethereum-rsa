const crypto = require('crypto');
const  getSharedSecret = require('./secret');
const { compressHex, addPrefix0x } = require('./utils')

/**
 * Encrypt message using sender's private key and recipient public key
 *
 * @method encryptMessage
 * @param {string} plaintext message in plain text
 * @param {string} privateKey privatekey of the sender
 * @param {string} publicKey public key of the receiver
 * @return {String} compressed encrypted msg in base64 format
 */
async function encryptMessage(plaintext, privateKey, publicKey) {

    const algorithm = 'aes-256-cbc';
    
    const secret = await getSharedSecret(privateKey, publicKey);
    const iv = crypto.randomBytes(16);
  
    const cipher = crypto.createCipheriv(algorithm, secret, iv);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
  
    const concatenated = `${encrypted}${iv.toString('hex')}`;
  
    const compressedMessage = compressHex(concatenated);
    return compressedMessage;
}

module.exports = encryptMessage;