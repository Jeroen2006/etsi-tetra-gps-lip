const ElementScaffold = require('../scaffold');

class ElementStartAngle extends ElementScaffold {
    constructor(startAngle) {
        if (!isValidEncodedAngle(startAngle)) {
            throw new Error('Invalid encoded Angle value (must be 0–255)');
        }

        super(1, 8); // 8 bits

        this.startAngle = startAngle;
        this.value = startAngle;
    }

    static fromValue(angle) {
        if (typeof angle === 'string') angle = parseInt(angle, 2);

        if (!isValidEncodedAngle(angle)) {
            throw new Error('Invalid Angle encoded value');
        }

        return new ElementStartAngle(angle);
    }

    static isValid(angle) {
        if (typeof angle === 'string') angle = parseInt(angle, 2);

        return isValidEncodedAngle(angle);
    }

    static calculateDegrees(angle) {
        if (typeof angle === 'string') angle = parseInt(angle, 2);

        return (angle * 360) / 256;
    }
}

module.exports = ElementStartAngle;

// --- Helper validation function ---

function isValidEncodedAngle(value) {
    return Number.isInteger(value) && value >= 0 && value <= 255;
}
