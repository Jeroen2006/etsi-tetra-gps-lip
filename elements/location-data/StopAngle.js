const ElementScaffold = require('../scaffold');

class ElementStopAngle extends ElementScaffold {
    constructor(stopAngle) {
        if (!isValidEncodedAngle(stopAngle)) {
            throw new Error('Invalid encoded Angle value (must be 0–255)');
        }

        super(1, 8); // 8 bits

        this.stopAngle = stopAngle;
        this.value = stopAngle;
    }

    static fromValue(angle) {
        if (typeof angle === 'string') angle = parseInt(angle, 2);

        if (!isValidEncodedAngle(angle)) {
            throw new Error('Invalid Angle encoded value');
        }

        return new ElementStopAngle(angle);
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

module.exports = ElementStopAngle;

// --- Helper validation function ---

function isValidEncodedAngle(value) {
    return Number.isInteger(value) && value >= 0 && value <= 255;
}
