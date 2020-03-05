var expect  = require('chai').expect;
const EthRSA = require('../index');

const SENDER_PRIVATEKEY = "4a2e11580d318f86079775229a377194d3629bb8448dfbfb8352d0cc4fc3f008";
const RECIPIENT_PRIVATEKEY = "e4a2d1f1568c1eb7ffacdbaea7607d9e768fd3d3d97ec5119ccf5d8bb6c0e613";

let recipientPublicKey, senderPublicKey, cipherText;

it('Retriving sender\'s publickey from privateKey', async function(done) {
    senderPublicKey = EthRSA.publicKeyByPrivateKey(SENDER_PRIVATEKEY);
    expect(senderPublicKey).to.equal('04de9432ee891cbc70ff41acbcb253d06317703e943de2f2cb7aaae71dfa91ba0d8c4ed05dc7a6b804134b9225a539699bedb222e73900ebeea3bbf4161045f007');
    done();
});

it('Retriving receipient publickey from privateKey', async function(done) {
    recipientPublicKey = EthRSA.publicKeyByPrivateKey(RECIPIENT_PRIVATEKEY);
    expect(recipientPublicKey).to.equal('044f93e10b7a052260c4686dbfca7ac09d5d830c01bfe544b92438f65ebf961d64acf9992fd70565920f303bca209f7a4a96f10510a2ed0922485b4758cc2b180a');
    done();
});

it('Encrypting Message using sender privateKey and recipient publickey', function(done) {
    EthRSA.encryptMessage("Hey", SENDER_PRIVATEKEY, recipientPublicKey).then(i => {
        cipherText = i;
        done();
    });        
});

it('Decrypting Message using recipient privateKey and sender publickey', function(done) {
    EthRSA.decryptMessage(cipherText, RECIPIENT_PRIVATEKEY, senderPublicKey).then(i => {
        expect(i).to.equal("Hey");
        done();
    });        
});