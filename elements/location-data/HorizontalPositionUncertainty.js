const ElementScaffold = require('../scaffold');

const RESERVED_VALUE = 63;

// Direct table values from the spec
const lookupTable = {
    0: "Less than 1 m",
    1: "Less than 2 m",
    2: "Less than 3.2 m",
    10: "Less than 27 m",
    20: "Less than 187 m",
    30: "Less than 1.18 km",
    40: "Less than 7.31 km",
    50: "Less than 45.3 km",
    60: "Less than 280 km",
    61: "Less than 337 km",
    62: "Less than 404 km",
    63: "Best effort",
};

// Constants for formula (for intermediate values)
const A = 2;
const x = 0.2;
const B = 5;
const C = -4;

class ElementHorizontalPositionUncertainty extends ElementScaffold {
    constructor(horizontalPositionUncertainty) {
        if (!isValidEncodedHpu(horizontalPositionUncertainty)) {
            throw new Error('Invalid encoded value for Horizontal Position Uncertainty (must be 0–63)');
        }

        super(1, 6); // 6 bits

        this.horizontalPositionUncertainty = horizontalPositionUncertainty;
        this.value = horizontalPositionUncertainty;
    }

    static fromValue(horizontalPositionUncertainty) {
        if (typeof horizontalPositionUncertainty === 'string') horizontalPositionUncertainty = parseInt(horizontalPositionUncertainty, 2);

        if (!isValidEncodedHpu(horizontalPositionUncertainty)) {
            throw new Error('Invalid Horizontal Position Uncertainty encoded value');
        }

        return new ElementHorizontalPositionUncertainty(horizontalPositionUncertainty);
    }

    static isValid(horizontalPositionUncertainty) {
        if (typeof horizontalPositionUncertainty === 'string') horizontalPositionUncertainty = parseInt(horizontalPositionUncertainty, 2);

        return isValidEncodedHpu(horizontalPositionUncertainty);
    }

    static getMeaning(horizontalPositionUncertainty) {
        if (typeof horizontalPositionUncertainty === 'string') horizontalPositionUncertainty = parseInt(horizontalPositionUncertainty, 2);

        if (horizontalPositionUncertainty in lookupTable) {
            return lookupTable[horizontalPositionUncertainty];
        }

        if (horizontalPositionUncertainty === RESERVED_VALUE) {
            return "Best effort";
        }

        // Otherwise use the formula
        const meters = A * Math.pow(1 + x, horizontalPositionUncertainty + B) + C;
        if (meters >= 1000) {
            return `Less than ${(meters / 1000).toFixed(2)} km`;
        } else {
            return `Less than ${meters.toFixed(1)} m`;
        }
    }
}

module.exports = ElementHorizontalPositionUncertainty;

// --- Helper validation function ---

function isValidEncodedHpu(value) {
    return Number.isInteger(value) && value >= 0 && value <= 63;
}
