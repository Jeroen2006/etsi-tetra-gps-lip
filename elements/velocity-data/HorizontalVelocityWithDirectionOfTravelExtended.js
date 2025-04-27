const ElementScaffold = require('../scaffold');
const ElementVelocityType = require('./VelocityType');
const { binaryToBigInt } = require("../../utils");

const C = 16;
const x = 0.038;
const A = 13;
const B = 0;

class ElementHorizontalVelocityWithDirectionOfTravelExtended extends ElementScaffold {
    constructor(horizontalSpeedKmH, directionOfTravelExtendedDegrees) {
        if (typeof horizontalSpeedKmH !== 'number' || horizontalSpeedKmH < 0) {
            throw new Error('Horizontal speed must be a positive number');
        }
        if (typeof directionOfTravelExtendedDegrees !== 'number' || directionOfTravelExtendedDegrees < 0 || directionOfTravelExtendedDegrees >= 360) {
            throw new Error('Direction of travel extended must be a number between 0 (inclusive) and 360 (exclusive)');
        }

        const velocityType = new ElementVelocityType("HORIZONTAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED");

        const horizontalEncoded = encodeSpeed(horizontalSpeedKmH);
        const directionEncoded = encodeAngle(directionOfTravelExtendedDegrees);

        super(1, 18); // 3 + 7 + 8 bits = 18 bits

        this.velocityType = velocityType;
        this.horizontalSpeed = horizontalSpeedKmH;
        this.directionOfTravelExtendedDegrees = directionOfTravelExtendedDegrees;
        this.horizontalEncoded = horizontalEncoded;
        this.directionEncoded = directionEncoded;

        const velocityTypeBinary = this.velocityType.toBinary();
        const horizontalBinary = horizontalEncoded.toString(2).padStart(7, '0');
        const directionBinary = directionEncoded.toString(2).padStart(8, '0');

        this.binary = velocityTypeBinary + horizontalBinary + directionBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(18, '0');

        let index = 0;

        const velocityTypeBits = binary.slice(index, index + 3); index += 3;
        const horizontalBits = binary.slice(index, index + 7); index += 7;
        const directionBits = binary.slice(index, index + 8); index += 8;

        const { velocityType } = ElementVelocityType.fromValue(parseInt(velocityTypeBits, 2));

        if (velocityType !== "HORIZONTAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED") {
            throw new Error('Invalid VelocityType (must be HORIZONTAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED)');
        }

        const horizontalEncoded = parseInt(horizontalBits, 2);
        const directionEncoded = parseInt(directionBits, 2);

        const horizontalSpeed = decodeSpeed(horizontalEncoded);
        const directionDegrees = decodeAngle(directionEncoded);

        return new ElementHorizontalVelocityWithDirectionOfTravelExtended(horizontalSpeed, directionDegrees);
    }

    static isValid(value) {
        try {
            this.fromValue(value);
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = ElementHorizontalVelocityWithDirectionOfTravelExtended;

// --- Helper functions

function encodeSpeed(speed) {
    if (speed <= 28) {
        return Math.round(speed);
    }

    let closestK = A;
    let minDiff = Infinity;

    for (let k = 29; k <= 127; k++) {
        const v = C * Math.pow(1 + x, (k - A)) + B;
        const diff = Math.abs(v - speed);
        if (diff < minDiff) {
            minDiff = diff;
            closestK = k;
        }
    }

    return closestK;
}

function decodeSpeed(encodedValue) {
    if (encodedValue <= 28) {
        return encodedValue;
    } else {
        return C * Math.pow(1 + x, (encodedValue - A)) + B;
    }
}

function encodeAngle(degrees) {
    return Math.round(degrees * 256 / 360) % 256;
}

function decodeAngle(encoded) {
    return (encoded * 360) / 256;
}
