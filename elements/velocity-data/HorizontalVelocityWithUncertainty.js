const ElementScaffold = require('../scaffold');
const ElementVelocityType = require('./VelocityType');
const { binaryToBigInt } = require("../../utils");

const C = 16;
const x = 0.038;
const A = 13;
const B = 0;

class ElementHorizontalVelocityWithUncertainty extends ElementScaffold {
    constructor(speedKmPerHour, uncertaintyEncoded) {
        if (typeof speedKmPerHour !== 'number' || speedKmPerHour < 0) {
            throw new Error('Invalid speed (must be a positive number in km/h)');
        }
        if (!isValidEncodedUncertainty(uncertaintyEncoded)) {
            throw new Error('Invalid uncertainty encoded value (must be 0–7)');
        }

        const velocityType = new ElementVelocityType("HORIZONTAL-VELOCITY-WITH-UNCERTAINTY");

        const encodedValue = encodeSpeed(speedKmPerHour);

        super(1, 13); // 3 bits VelocityType + 7 bits Speed + 3 bits Uncertainty

        this.velocityType = velocityType;
        this.speed = speedKmPerHour;
        this.encodedValue = encodedValue;
        this.uncertaintyEncoded = uncertaintyEncoded;

        const velocityTypeBinary = this.velocityType.toBinary();
        const encodedSpeedBinary = encodedValue.toString(2).padStart(7, '0');
        const uncertaintyBinary = uncertaintyEncoded.toString(2).padStart(3, '0');

        this.binary = velocityTypeBinary + encodedSpeedBinary + uncertaintyBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(13, '0');

        let index = 0;

        const velocityTypeBits = binary.slice(index, index + 3); index += 3;
        const encodedSpeedBits = binary.slice(index, index + 7); index += 7;
        const uncertaintyBits = binary.slice(index, index + 3); index += 3;

        const { velocityType } = ElementVelocityType.fromValue(parseInt(velocityTypeBits, 2));

        if (velocityType !== "HORIZONTAL-VELOCITY-WITH-UNCERTAINTY") {
            throw new Error('Invalid VelocityType for ElementHorizontalVelocityWithUncertainty (must be HORIZONTAL-VELOCITY-WITH-UNCERTAINTY)');
        }

        const encodedSpeed = parseInt(encodedSpeedBits, 2);
        const uncertaintyEncoded = parseInt(uncertaintyBits, 2);

        const speed = decodeSpeed(encodedSpeed);

        return new ElementHorizontalVelocityWithUncertainty(speed, uncertaintyEncoded);
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

module.exports = ElementHorizontalVelocityWithUncertainty;

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

function isValidEncodedUncertainty(value) {
    return Number.isInteger(value) && value >= 0 && value <= 7;
}
