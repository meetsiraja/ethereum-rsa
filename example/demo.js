const EthRSA = require('ethereum-rsa');
const CONFIG = require('./config')

// Will encrypt message and compress message in base64 encoded format
async function encrypt(message, senderPrivateKey, recipientPublicKey){
    let cipherText = await EthRSA.encryptMessage(message, senderPrivateKey, recipientPublicKey);
    return cipherText
}

// Will decrypted message from compressed cipher text
async function decrypt(cipherText, recipientPrivateKey, senderPublicKey){
    let decryptedMessage = await EthRSA.decryptMessage(cipherText, recipientPrivateKey, senderPublicKey);
    return decryptedMessage
}

async function test(){

    let recipientPublicKey = EthRSA.publicKeyByPrivateKey(CONFIG.RECIPIENT_PRIVATEKEY);

    let cipherText = await encrypt("Hey There!", CONFIG.SENDER_PRIVATEKEY, recipientPublicKey);
    console.log(`Encrypted Message: ${cipherText}`);

    let senderPublicKey = EthRSA.publicKeyByPrivateKey(CONFIG.SENDER_PRIVATEKEY);

    let decryptedMessage = await decrypt(cipherText, CONFIG.RECIPIENT_PRIVATEKEY, senderPublicKey);
    console.log(`Decrypted Message: ${decryptedMessage}`);

    return;
}

test();

