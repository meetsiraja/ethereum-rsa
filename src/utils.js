function addPrefix0x(hexString){
    return hexString.startsWith('0x') ? hexString : `0x${hexString}`
}

function removePrefix0x(hexString){
    return hexString.startsWith('0x') ? hexString.substring(2) : hexString
}

function compressHex(hex) {
  hex = removePrefix0x(hex);
  return new Buffer(hex, 'hex').toString('base64');
}

function decompressString(compressedString) {
  const hex = new Buffer(compressedString, 'base64').toString('hex');
  return addPrefix0x(hex);
}

module.exports = {
    addPrefix0x,
    removePrefix0x,
    compressHex,
    decompressString
}