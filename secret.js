const crypto = require('crypto');
const scrypt = require("scrypt-js");

async function getSharedSecret(privateKey, publicKey) {
  const sec = crypto.createECDH('secp256k1');

  sec.setPrivateKey(privateKey.substring(2), 'hex');

  const secret = sec.computeSecret(publicKey, 'hex');
  const N = 16384;
  const r = 8;
  const p = 1;
  const dkLen = 32;

  return scrypt.scrypt(
    secret,
    Buffer.from('mFTNHUGyy6TE0kxZ8LW4bmR0gDdISfii', 'hex'),
    N,
    r,
    p,
    dkLen
  );
}

module.exports = getSharedSecret;