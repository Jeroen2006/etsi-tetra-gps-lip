const ElementScaffold = require('./scaffold');

class ElementLongitude extends ElementScaffold {
    constructor(longitude) {
        super(1, 25);

        if (longitude >= -180 && longitude <= (180 - (360 / (1 << 25)))) {
            this.longitude = longitude;
            this.value = convertLongitudeToBinary(longitude);
        } else {
            throw new Error(`Invalid Longitude: ${longitude}`);
        }
    }

    static fromValue(value) {
        if (typeof value === 'string')  value = parseInt(value, 2);
        
        const longitude = convertBinaryToLongitude(value);
        return new ElementLongitude(longitude);
    }

    static isValid(value) {
        const longitude = convertBinaryToLongitude(value);
        return longitude >= -180 && longitude <= (180 - (360 / (1 << 25)));
    }
}

module.exports = ElementLongitude;

// Helper functions

function convertLongitudeToBinary(longitude) {
    // Validate input
    if (longitude < -180 || longitude > (180 - (360 / (1 << 25)))) {
        throw new Error('Longitude out of range. It should be between -180 and +(180 - 360/2^25) degrees.');
    }

    const scaleFactor = (1 << 25); // 2^25 = 33554432
    const stepSize = 360 / scaleFactor; // each step represents this many degrees

    let steps = Math.round(longitude / stepSize);

    // Handle two's complement for negative values
    if (steps < 0) {
        steps = steps + scaleFactor;
    }

    return steps; // Return number (25-bit unsigned int)
}

function convertBinaryToLongitude(value) {
    if (value < 0 || value >= (1 << 25)) {
        throw new Error('Invalid 25-bit value.');
    }

    const scaleFactor = (1 << 25); // 2^25
    const stepSize = 360 / scaleFactor;

    // Interpret two's complement
    if (value & (1 << 24)) { // if sign bit is set
        value = value - scaleFactor;
    }

    const longitude = value * stepSize;

    // Round to 6 decimal places
    return Math.round(longitude * 1e6) / 1e6;
}
