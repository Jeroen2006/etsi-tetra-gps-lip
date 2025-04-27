const ElementScaffold = require('../scaffold');

const RESERVED_VALUE = 63;

// Constants from 6.3.13 spec
const A = 2;
const x = 0.2;
const B = 5;
const C = -4;

class ElementHalfMinorAxis extends ElementScaffold {
    constructor(halfOfMinorAxis) {
        if (!isValidEncodedHalfMinorAxis(halfOfMinorAxis)) {
            throw new Error('Invalid encoded value for Half of Minor Axis (must be 0–62)');
        }

        super(1, 6); // 6 bits

        this.halfOfMinorAxis = halfOfMinorAxis;
        this.value = halfOfMinorAxis;
    }

    static fromValue(halfOfMinorAxis) {
        if (typeof halfOfMinorAxis === 'string') halfOfMinorAxis = parseInt(halfOfMinorAxis, 2);

        if (!isValidEncodedHalfMinorAxis(halfOfMinorAxis)) {
            throw new Error('Invalid Half of Minor Axis encoded value');
        }

        return new ElementHalfMinorAxis(halfOfMinorAxis);
    }

    static isValid(halfOfMinorAxis) {
        if (typeof halfOfMinorAxis === 'string') halfOfMinorAxis = parseInt(halfOfMinorAxis, 2);

        return isValidEncodedHalfMinorAxis(halfOfMinorAxis);
    }

    static calculateMeters(halfOfMinorAxis) {
        if (typeof halfOfMinorAxis === 'string') halfOfMinorAxis = parseInt(halfOfMinorAxis, 2);

        if (halfOfMinorAxis === RESERVED_VALUE) {
            return null; // Reserved
        }

        return A * Math.pow(1 + x, halfOfMinorAxis + B) + C;
    }
}

module.exports = ElementHalfMinorAxis;

// --- Helper validation function ---

function isValidEncodedHalfMinorAxis(value) {
    return Number.isInteger(value) && value >= 0 && value <= 62;
}
