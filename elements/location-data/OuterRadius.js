const ElementScaffold = require('../scaffold');

class ElementOuterRadius extends ElementScaffold {
    constructor(outerRadius) {
        if (!isValidEncodedOuterRadius(outerRadius)) {
            throw new Error('Invalid encoded value for Outer Radius (must be 0–65536)');
        }

        super(1, 16); // 16 bits

        this.outerRadius = outerRadius;
        this.value = outerRadius;
    }

    static fromValue(outerRadius) {
        if (typeof outerRadius === 'string') outerRadius = parseInt(outerRadius, 2);

        if (!isValidEncodedOuterRadius(outerRadius)) {
            throw new Error('Invalid Outer Radius encoded value');
        }

        return new ElementOuterRadius(outerRadius);
    }

    static isValid(outerRadius) {
        if (typeof outerRadius === 'string') outerRadius = parseInt(outerRadius, 2);

        return isValidEncodedOuterRadius(outerRadius);
    }

    static calculateMeters(outerRadius) {
        if (typeof outerRadius === 'string') outerRadius = parseInt(outerRadius, 2);

        return outerRadius * 2; // Step size: 2 meters per unit
    }
}

module.exports = ElementOuterRadius;

// --- Helper validation function ---

function isValidEncodedOuterRadius(value) {
    return Number.isInteger(value) && value >= 0 && value <= 65536;
}
