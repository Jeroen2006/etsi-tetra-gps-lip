const ElementScaffold = require('../scaffold');

class ElementInnerRadius extends ElementScaffold {
    constructor(innerRadius) {
        if (!isValidEncodedInnerRadius(innerRadius)) {
            throw new Error('Invalid encoded value for Inner Radius (must be 0–65536)');
        }

        super(1, 16); // 16 bits

        this.innerRadius = innerRadius;
        this.value = innerRadius;
    }

    static fromValue(innerRadius) {
        if (typeof innerRadius === 'string') innerRadius = parseInt(innerRadius, 2);

        if (!isValidEncodedInnerRadius(innerRadius)) {
            throw new Error('Invalid Inner Radius encoded value');
        }

        return new ElementInnerRadius(innerRadius);
    }

    static isValid(innerRadius) {
        if (typeof innerRadius === 'string') innerRadius = parseInt(innerRadius, 2);

        return isValidEncodedInnerRadius(innerRadius);
    }

    static calculateMeters(innerRadius) {
        if (typeof innerRadius === 'string') innerRadius = parseInt(innerRadius, 2);

        return innerRadius * 2; // Step size: 2 meters per unit
    }
}

module.exports = ElementInnerRadius;

// --- Helper validation function ---

function isValidEncodedInnerRadius(value) {
    return Number.isInteger(value) && value >= 0 && value <= 65536;
}
