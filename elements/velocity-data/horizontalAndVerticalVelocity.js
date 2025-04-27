const ElementScaffold = require('../scaffold');
const ElementVelocityType = require('./VelocityType');
const { binaryToBigInt } = require("../../utils");

const C = 16;
const x = 0.038;
const A = 13;
const B = 0;

class ElementHorizontalAndVerticalVelocity extends ElementScaffold {
    constructor(horizontalSpeedKmH, verticalSpeedKmH, verticalDirection) {
        if (typeof horizontalSpeedKmH !== 'number' || horizontalSpeedKmH < 0) {
            throw new Error('Horizontal speed must be a positive number');
        }
        if (typeof verticalSpeedKmH !== 'number' || verticalSpeedKmH < 0) {
            throw new Error('Vertical speed must be a positive number');
        }
        if (!['UP', 'DOWN'].includes(verticalDirection)) {
            throw new Error('Vertical direction must be "UP" or "DOWN"');
        }

        const velocityType = new ElementVelocityType("HORIZONTAL-AND-VERTICAL-VELOCITY");

        const horizontalEncoded = encodeSpeed(horizontalSpeedKmH);
        const verticalSignBit = verticalDirection === 'UP' ? '0' : '1';
        const verticalMagnitudeEncoded = encodeSpeed(verticalSpeedKmH);

        super(1, 18); // 3 + 7 + 8 bits = 18 bits

        this.velocityType = velocityType;
        this.horizontalSpeed = horizontalSpeedKmH;
        this.verticalSpeed = verticalSpeedKmH;
        this.verticalDirection = verticalDirection;
        this.horizontalEncoded = horizontalEncoded;
        this.verticalEncoded = verticalMagnitudeEncoded;

        const velocityTypeBinary = this.velocityType.toBinary();
        const horizontalBinary = horizontalEncoded.toString(2).padStart(7, '0');
        const verticalBinary = verticalSignBit + verticalMagnitudeEncoded.toString(2).padStart(7, '0');

        this.binary = velocityTypeBinary + horizontalBinary + verticalBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(18, '0');

        let index = 0;

        const velocityTypeBits = binary.slice(index, index + 3); index += 3;
        const horizontalBits = binary.slice(index, index + 7); index += 7;
        const verticalBits = binary.slice(index, index + 8); index += 8;

        const { velocityType } = ElementVelocityType.fromValue(parseInt(velocityTypeBits, 2));

        if (velocityType !== "HORIZONTAL-AND-VERTICAL-VELOCITY") {
            throw new Error('Invalid VelocityType for ElementHorizontalAndVerticalVelocity (must be HORIZONTAL-AND-VERTICAL-VELOCITY)');
        }

        const horizontalEncoded = parseInt(horizontalBits, 2);
        const verticalSign = verticalBits[0];
        const verticalMagnitudeEncoded = parseInt(verticalBits.slice(1), 2);

        const horizontalSpeed = decodeSpeed(horizontalEncoded);
        const verticalSpeed = decodeSpeed(verticalMagnitudeEncoded);
        const verticalDirection = verticalSign === '0' ? 'UP' : 'DOWN';

        return new ElementHorizontalAndVerticalVelocity(horizontalSpeed, verticalSpeed, verticalDirection);
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

module.exports = ElementHorizontalAndVerticalVelocity;

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
