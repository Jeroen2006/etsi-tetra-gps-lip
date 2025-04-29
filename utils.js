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
    const octets = bits.match(/.{1,4}/g); // Split into groups of 4 bits
    if (octets[octets.length - 1].length < 4) octets[octets.length - 1] = octets[octets.length - 1].padEnd(4, '0');

    const hex = octets.map(octet => parseInt(octet, 2).toString(16).toUpperCase()).join('');
    return hex;

    // const bigInt = binaryToBigInt(bits);
    // const hexString = bigInt.toString(16).toUpperCase();
    // return hexString
}

function secondsToString(rawSeconds){
    if(rawSeconds < 60){
        return `${rawSeconds}s`;
    } 

    const seconds = rawSeconds % 60;
    const minutes = Math.floor(rawSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    var formattedSeconds = seconds > 0 ? `${seconds}s` : '';
    var formattedMinutes = minutes > 0 ? `${minutes % 60}m` : '';
    var formattedHours = hours > 0 ? `${hours % 24}h` : '';
    var formattedDays = days > 0 ? `${days}d` : '';

    if(formattedMinutes == '0m') formattedMinutes = '';
    if(formattedHours == '0h') formattedHours = '';
    if(formattedSeconds == '0s') formattedSeconds = '';
    if(formattedDays == '0d') formattedDays = '';
    
    return `${formattedDays}${formattedHours}${formattedMinutes}${formattedSeconds}`.trim();
}

function metersToString(meters){
    if(meters < 1000){
        return `${meters}m`;
    } 

    const kilometers = meters / 1000;
    const hectometers = Math.floor(kilometers * 10) / 10;

    return `${hectometers}km`;
}


function binaryToBigInt(binaryString) {
    if (typeof binaryString !== 'string' || !/^[01]+$/.test(binaryString)) {
        throw new Error('Invalid binary string.');
    }

    return BigInt('0b' + binaryString);
}

function convertToDataElements(object){
    const filterKeys = ['length', 'type', 'value', 'binary', 'elementLength'];

    const newObject = {};
    for (const key in object) {
        const item = object[key];
        
        if (item instanceof Object) {
            newObject[key] = convertToDataElements(item);
        } else {
            if (filterKeys.includes(key)) continue;
            newObject[key] = item;
        }
    }

    for (const key in newObject) {
        const item = newObject[key];
        if (item instanceof Object && item[key]) {
            newObject[key] = item[key];
        }
    }

    for (const key in newObject) {
        const item = newObject[key];
        if (item instanceof Object) {
            for (const filterKey of filterKeys) {
                delete item[filterKey];
            }
        }
    }

    return newObject;
}

module.exports = {
    hexToBinaryString,
    binaryToHex,
    binaryToBigInt,
    secondsToString,
    convertToDataElements,
    metersToString
};