const ElementScaffold = require('./scaffold');

class ElementLatitude extends ElementScaffold {
    constructor(latitude) {
        super(1, 24); // 24 bits for latitude

        if (latitude >= -90 && latitude <= (90 - (180 / (1 << 24)))) {
            this.latitude = latitude;
            this.value = convertLatitudeToBinary(latitude);
        } else {
            throw new Error(`Invalid Latitude: ${latitude}`);
        }
    }

    static fromValue(value) {
        if (typeof value === 'string')  value = parseInt(value, 2);
        
        const latitude = convertBinaryToLatitude(value);
        return new ElementLatitude(latitude);
    }

    static isValid(value) {
        const latitude = convertBinaryToLatitude(value);
        return latitude >= -90 && latitude <= (90 - (180 / (1 << 24)));
    }
}

module.exports = ElementLatitude;

// Helper functions

function convertLatitudeToBinary(latitude) {
    if (latitude < -90 || latitude > (90 - (180 / (1 << 24)))) {
        throw new Error('Latitude out of range. It should be between -90 and +(90 - 180/2^24) degrees.');
    }

    const scaleFactor = (1 << 24); // 2^24 = 16777216
    const stepSize = 180 / scaleFactor; // each step represents this many degrees

    let steps = Math.round(latitude / stepSize);

    // Handle two's complement for negative values
    if (steps < 0) {
        steps = steps + scaleFactor;
    }

    return steps; // Return number (24-bit unsigned int)
}

function convertBinaryToLatitude(value) {
    if (value < 0 || value >= (1 << 24)) {
        throw new Error('Invalid 24-bit value.');
    }

    const scaleFactor = (1 << 24); // 2^24
    const stepSize = 180 / scaleFactor;

    // Interpret two's complement
    if (value & (1 << 23)) { // if sign bit is set
        value = value - scaleFactor;
    }

    const latitude = value * stepSize;

    return Math.round(latitude * 1e6) / 1e6;
}
