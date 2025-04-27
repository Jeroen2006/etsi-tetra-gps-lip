const ElementScaffold = require('../scaffold');

const RESERVED_VALUE = 63;

// Constants from 6.3.12 spec
const A = 2;
const x = 0.2;
const B = 5;
const C = -4;

class ElementHalfMajorAxis extends ElementScaffold {
    constructor(halfOfMajorAxis) {
        if (!isValidEncodedHalfMajorAxis(halfOfMajorAxis)) {
            throw new Error('Invalid encoded value for Half of Major Axis (must be 0–62)');
        }

        super(1, 6); // 6 bits

        this.halfOfMajorAxis = halfOfMajorAxis;
        this.value = halfOfMajorAxis;
    }

    static fromValue(halfOfMajorAxis) {
        if (typeof halfOfMajorAxis === 'string') halfOfMajorAxis = parseInt(halfOfMajorAxis, 2);

        if (!isValidEncodedHalfMajorAxis(halfOfMajorAxis)) {
            throw new Error('Invalid Half of Major Axis encoded value');
        }

        return new ElementHalfMajorAxis(halfOfMajorAxis);
    }

    static isValid(halfOfMajorAxis) {
        if (typeof halfOfMajorAxis === 'string') halfOfMajorAxis = parseInt(halfOfMajorAxis, 2);

        return isValidEncodedHalfMajorAxis(halfOfMajorAxis);
    }

    static calculateMeters(halfOfMajorAxis) {
        if (typeof halfOfMajorAxis === 'string') halfOfMajorAxis = parseInt(halfOfMajorAxis, 2);

        if (halfOfMajorAxis === RESERVED_VALUE) {
            return null; // Reserved
        }

        return A * Math.pow(1 + x, halfOfMajorAxis + B) + C;
    }
}

module.exports = ElementHalfMajorAxis;

// --- Helper validation function ---

function isValidEncodedHalfMajorAxis(value) {
    return Number.isInteger(value) && value >= 0 && value <= 62;
}
