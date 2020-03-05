## ethereum-rsa
![npm](https://img.shields.io/npm/v/ethereum-rsa) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) 

Encrypt and Decrypt message using **Ethereum keys**. 

### How it works?

- Let's say, `Alice` wants to send secured message to `Bob`. This is How it will work:
1. `Alice` encrypt message using his **privatekey** and **Bob's publickey**.
2. `Alice` sends encrypted message to `Bob`.
3. `Bob` decrypt message using his **privatekey** and **Alice publickey**.

##### Benifits:
- Only `Bob` can read the message
- `Bob` can be sure that the message really comes from `Alice` 
<p align="center">
    <img src="./diagram.jpg" />
</p>

## Installation

```bash
npm install ethereum-rsa --save
```

### Initialization

```js
const EthRSA = require('ethereum-rsa');
```

### Retrive PublicKey from PrivateKey:
This function will return the uncompressed publicKey from privateKey.
```js
let publicKey = EthRSA.publicKeyByPrivateKey("4a2e11580d318f86079775229a377194d3629bb8448dfbfb8352d0cc4fc3f008");

console.log(publicKey);
```
#### Output:
```
04de9432ee891cbc70ff41acbcb253d06317703e943de2f2cb7aaae71dfa91ba0d8c4ed05dc7a6b804134b9225a539699bedb222e73900ebeea3bbf4161045f007
```

### Encryption of Message:
Encrypt the message using sender's private key and recipient public key.

##### Parameters:
- **message**: Message in plain text.
- **senderPrivateKey**: Private key of the sender.
- **recipientPublicKey**: Public key of the recipient. Public key should be in uncompressed format & 04 attached at left.

##### API: 
```js
EthRSA.encryptMessage(message, senderPrivateKey, recipientPublicKey);
```

##### Example:

```js
EthRSA.encryptMessage(
    "Hey There!",
    "4a2e11580d318f86079775229a377194d3629bb8448dfbfb8352d0cc4fc3f008",
    "044f93e10b7a052260c4686dbfca7ac09d5d830c01bfe544b92438f65ebf961d64acf9992fd70565920f303bca209f7a4a96f10510a2ed0922485b4758cc2b180a"
)
.then(console.log);
```
##### Output:
```
br+Tol1WJkejU+rvUCm7dGm2IeOLF/SiMOi3i3Ho3G4=
```

### Decryption of Message:
Decrypt the message using sender's public key and recipient private key. Here public key should be in uncompressed format & with 04 attached left side.

##### Parameters:
- **cipherText**: Encrypted message.
- **recipientPrivateKey**: Private key of the recipient.
- **senderPublicKey**: Public key of the sender. Public key should be in uncompressed format & 04 attached at left.

##### API: 
```js
EthRSA.decryptMessage(cipherText, recipientPrivateKey, senderPublicKey);
```

##### Example:
```js
EthRSA.decryptMessage(
    "br+Tol1WJkejU+rvUCm7dGm2IeOLF/SiMOi3i3Ho3G4=",
    "e4a2d1f1568c1eb7ffacdbaea7607d9e768fd3d3d97ec5119ccf5d8bb6c0e613",
    "04de9432ee891cbc70ff41acbcb253d06317703e943de2f2cb7aaae71dfa91ba0d8c4ed05dc7a6b804134b9225a539699bedb222e73900ebeea3bbf4161045f007"
)
.then(console.log);
```
##### Output:
```
Hey There!
```
## Running tests:

```
npm test
```

## Contributing

- Issues & Pull requests are welcome! Fork, branch, and submit PR.

## Changelog

- [Changelog](https://github.com/meetsiraja/ethereum-rsa/blob/master/CHANGELOG.md)

## Licence

[MIT](https://github.com/meetsiraja/ethereum-rsa/blob/master/LICENCE.md)