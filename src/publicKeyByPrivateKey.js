const EthKey = require('eth-key-pair');

/**
 * Generate publicKey from the privateKey.
 * This creates the uncompressed publicKey,
 * @returns {string}
 */
function publicKeyByPrivateKey(p){
    let publicKey = EthKey.publicKeyByPrivateKey(p)
    return '04'+publicKey;
}

module.exports = publicKeyByPrivateKey;