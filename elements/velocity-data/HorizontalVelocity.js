const ElementScaffold = require('../scaffold');
const ElementVelocityType = require('./VelocityType');

const { binaryToBigInt } = require("../../utils");

const C = 16;
const x = 0.038;
const A = 13;
const B = 0;

class ElementHorizontalVelocity extends ElementScaffold {
    constructor(speedKmPerHour) {
        if (typeof speedKmPerHour !== 'number' || speedKmPerHour < 0) {
            throw new Error('Invalid speed (must be a positive number in km/h)');
        }

        const velocityType = new ElementVelocityType("HORIZONTAL-VELOCITY");

        const encodedValue = encodeSpeed(speedKmPerHour);

        super(1, 10); // 3 bits VelocityType + 7 bits Encoded speed = 10 bits total

        this.velocityType = velocityType;
        this.speed = speedKmPerHour;
        this.encodedValue = encodedValue;

        const velocityTypeBinary = this.velocityType.toBinary();
        const encodedSpeedBinary = encodedValue.toString(2).padStart(7, '0');

        this.binary = velocityTypeBinary + encodedSpeedBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(10, '0');

        let index = 0;

        const velocityTypeBits = binary.slice(index, index + 3); index += 3;
        const encodedSpeedBits = binary.slice(index, index + 7); index += 7;

        const { velocityType } = ElementVelocityType.fromValue(parseInt(velocityTypeBits, 2));
        console.log(velocityType)

        if (velocityType !== "HORIZONTAL-VELOCITY") {
            throw new Error('Invalid VelocityType for ElementHorizontalVelocity (must be HORIZONTAL-VELOCITY)');
        }

        const encodedSpeed = parseInt(encodedSpeedBits, 2);

        const speed = decodeSpeed(encodedSpeed);

        return new ElementHorizontalVelocity(speed);
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

module.exports = ElementHorizontalVelocity;

// --- Helper encode/decode functions ---

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

function isValidEncodedHv(value) {
    return Number.isInteger(value) && value >= 0 && value <= 127;
}
