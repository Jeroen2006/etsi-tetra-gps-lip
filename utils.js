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
    // var hexString = '';
    // for (var i = 0; i < bits.length; i += 8) {
    //     var hexDigit = parseInt(bits.substr(i, 8), 2).toString(16);
    //     if (hexDigit.length < 2) hexDigit = '0' + hexDigit;

    //     hexString += hexDigit;
    // }
  
    // return hexString.toUpperCase();

    const bigInt = binaryToBigInt(bits);
    const hexString = bigInt.toString(16).toUpperCase();
    return hexString
}

function secondsToString(rawSeconds){
    if(rawSeconds < 60){
        return `${rawSeconds}s`;
    } 

    const seconds = rawSeconds % 60;
    const minutes = Math.floor(rawSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const formattedSeconds = seconds > 0 ? `${seconds}s` : '';
    const formattedMinutes = minutes > 0 ? `${minutes % 60}m` : '';
    const formattedHours = hours > 0 ? `${hours % 24}h` : '';
    const formattedDays = days > 0 ? `${days}d` : '';
    return `${formattedDays}${formattedHours}${formattedMinutes}${formattedSeconds}`.trim();
}


function binaryToBigInt(binaryString) {
    if (typeof binaryString !== 'string' || !/^[01]+$/.test(binaryString)) {
        throw new Error('Invalid binary string.');
    }

    return BigInt('0b' + binaryString);
}
module.exports = {
    hexToBinaryString,
    binaryToHex,
    binaryToBigInt,
    secondsToString
};