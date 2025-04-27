const ElementScaffold = require('../scaffold');
const ElementVelocityType = require('./VelocityType');
const { binaryToBigInt } = require("../../utils");

const C = 16;
const x = 0.038;
const A = 13;
const B = 0;

class ElementHorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty extends ElementScaffold {
    constructor(horizontalSpeedKmH, horizontalUncertaintyEncoded, verticalSpeedKmH, verticalDirection, verticalUncertaintyEncoded, directionOfTravelExtendedDegrees, directionUncertaintyEncoded) {
        if (typeof horizontalSpeedKmH !== 'number' || horizontalSpeedKmH < 0) {
            throw new Error('Horizontal speed must be a positive number');
        }
        if (!isValidEncodedUncertainty(horizontalUncertaintyEncoded)) {
            throw new Error('Invalid horizontal uncertainty encoded value (must be 0–7)');
        }
        if (typeof verticalSpeedKmH !== 'number' || verticalSpeedKmH < 0) {
            throw new Error('Vertical speed must be a positive number');
        }
        if (!['UP', 'DOWN'].includes(verticalDirection)) {
            throw new Error('Vertical direction must be "UP" or "DOWN"');
        }
        if (!isValidEncodedUncertainty(verticalUncertaintyEncoded)) {
            throw new Error('Invalid vertical uncertainty encoded value (must be 0–7)');
        }
        if (typeof directionOfTravelExtendedDegrees !== 'number' || directionOfTravelExtendedDegrees < 0 || directionOfTravelExtendedDegrees >= 360) {
            throw new Error('Direction of travel must be between 0 and 360 degrees');
        }
        if (!isValidEncodedUncertainty(directionUncertaintyEncoded)) {
            throw new Error('Invalid direction uncertainty encoded value (must be 0–7)');
        }

        const velocityType = new ElementVelocityType("HORIZONTAL-AND-VERTICAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED-AND-UNCERTAINTY");

        const horizontalEncoded = encodeSpeed(horizontalSpeedKmH);
        const verticalEncoded = encodeSpeed(verticalSpeedKmH);
        const directionEncoded = encodeAngle(directionOfTravelExtendedDegrees);
        const verticalSignBit = verticalDirection === 'UP' ? '0' : '1';

        super(1, 35); // 3+7+3+8+3+8+3 bits

        this.velocityType = velocityType;
        this.horizontalSpeed = horizontalSpeedKmH;
        this.horizontalUncertaintyEncoded = horizontalUncertaintyEncoded;
        this.verticalSpeed = verticalSpeedKmH;
        this.verticalDirection = verticalDirection;
        this.verticalUncertaintyEncoded = verticalUncertaintyEncoded;
        this.directionOfTravelExtendedDegrees = directionOfTravelExtendedDegrees;
        this.directionUncertaintyEncoded = directionUncertaintyEncoded;

        const velocityTypeBinary = this.velocityType.toBinary();
        const horizontalBinary = horizontalEncoded.toString(2).padStart(7, '0');
        const horizontalUncertaintyBinary = horizontalUncertaintyEncoded.toString(2).padStart(3, '0');
        const verticalBinary = verticalSignBit + verticalEncoded.toString(2).padStart(7, '0');
        const verticalUncertaintyBinary = verticalUncertaintyEncoded.toString(2).padStart(3, '0');
        const directionBinary = directionEncoded.toString(2).padStart(8, '0');
        const directionUncertaintyBinary = directionUncertaintyEncoded.toString(2).padStart(3, '0');

        this.binary = velocityTypeBinary + horizontalBinary + horizontalUncertaintyBinary + verticalBinary + verticalUncertaintyBinary + directionBinary + directionUncertaintyBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(35, '0');

        let index = 0;

        const velocityTypeBits = binary.slice(index, index + 3); index += 3;
        const horizontalBits = binary.slice(index, index + 7); index += 7;
        const horizontalUncertaintyBits = binary.slice(index, index + 3); index += 3;
        const verticalBits = binary.slice(index, index + 8); index += 8;
        const verticalUncertaintyBits = binary.slice(index, index + 3); index += 3;
        const directionBits = binary.slice(index, index + 8); index += 8;
        const directionUncertaintyBits = binary.slice(index, index + 3); index += 3;

        const { velocityType } = ElementVelocityType.fromValue(parseInt(velocityTypeBits, 2));

        if (velocityType !== "HORIZONTAL-AND-VERTICAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED-AND-UNCERTAINTY") {
            throw new Error('Invalid VelocityType (must be HORIZONTAL-AND-VERTICAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED-AND-UNCERTAINTY)');
        }

        const horizontalEncoded = parseInt(horizontalBits, 2);
        const horizontalUncertaintyEncoded = parseInt(horizontalUncertaintyBits, 2);

        const verticalSign = verticalBits[0];
        const verticalMagnitudeEncoded = parseInt(verticalBits.slice(1), 2);
        const verticalUncertaintyEncoded = parseInt(verticalUncertaintyBits, 2);

        const directionEncoded = parseInt(directionBits, 2);
        const directionUncertaintyEncoded = parseInt(directionUncertaintyBits, 2);

        const horizontalSpeed = decodeSpeed(horizontalEncoded);
        const verticalSpeed = decodeSpeed(verticalMagnitudeEncoded);
        const verticalDirection = verticalSign === '0' ? 'UP' : 'DOWN';
        const directionDegrees = decodeAngle(directionEncoded);

        return new ElementHorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty(
            horizontalSpeed,
            horizontalUncertaintyEncoded,
            verticalSpeed,
            verticalDirection,
            verticalUncertaintyEncoded,
            directionDegrees,
            directionUncertaintyEncoded
        );
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

module.exports = ElementHorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty;

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

function isValidEncodedUncertainty(value) {
    return Number.isInteger(value) && value >= 0 && value <= 7;
}
