const ElementScaffold = require('../scaffold');

class ElementAngle extends ElementScaffold {
    constructor(angle) {
        if (!isValidEncodedAngle(angle)) {
            throw new Error('Invalid encoded Angle value (must be 0–255)');
        }

        super(1, 8); // 8 bits

        this.angle = angle;
        this.value = angle;
    }

    static fromValue(angle) {
        if (typeof angle === 'string') angle = parseInt(angle, 2);

        if (!isValidEncodedAngle(angle)) {
            throw new Error('Invalid Angle encoded value');
        }

        return new ElementAngle(angle);
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

module.exports = ElementAngle;

// --- Helper validation function ---

function isValidEncodedAngle(value) {
    return Number.isInteger(value) && value >= 0 && value <= 255;
}
