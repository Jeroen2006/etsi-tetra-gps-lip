function hexToBinaryString(hexString) {
    if (typeof hexString !== 'string' || !/^[0-9a-fA-F]+$/.test(hexString)) {
      throw new Error('Invalid hex string');
  }

  const expectedLength = hexString.length * 4; // 4 bits per hex digit

  const binary = hexString.split('').map(h =>
      parseInt(h, 16).toString(2).padStart(4, '0')
  ).join('');

  return binary.padStart(expectedLength, '0');
}

function binaryToHex(bits) {
    var hexString = '';
    for (var i = 0; i < bits.length; i += 8) {
        var hexDigit = parseInt(bits.substr(i, 8), 2).toString(16);
        if (hexDigit.length < 2) hexDigit = '0' + hexDigit;

        hexString += hexDigit;
    }
  
    return hexString.toUpperCase();
  }

module.exports = {
    hexToBinaryString,
    binaryToHex
};