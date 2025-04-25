const ElementScaffold = require('./scaffold');

class ElementHorizontalVelocity extends ElementScaffold {
    constructor(speed) {
        super(1, 7); // 7 bits for horizontal velocity

        if (speed >= 0) {
            this.horizontalVelocity = speed;
            this.value = convertSpeedToBinary(speed);
        } else {
            throw new Error(`Invalid Horizontal Velocity: ${speed}`);
        }
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        const speed = convertBinaryToSpeed(value);
        return new ElementHorizontalVelocity(speed);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        return Number.isInteger(value) && value >= 0 && value <= 127;
    }
}

module.exports = ElementHorizontalVelocity;

// --- Helper functions ---

function convertSpeedToBinary(speed) {
    if (speed <= 28) {
        return Math.round(speed);
    }

    const C = 16;
    const x = 0.038;
    const A = 13;

    for (let K = 29; K <= 127; K++) {
        const approxSpeed = C * Math.pow(1 + x, K - A);
        if (approxSpeed >= speed) {
            return K;
        }
    }

    throw new Error('Speed too high to encode in 7 bits');
}

function convertBinaryToSpeed(value) {
    if (value < 0 || value > 127) {
        throw new Error('Invalid 7-bit horizontal velocity value.');
    }

    if (value <= 28) {
        return value;
    }

    const C = 16;
    const x = 0.038;
    const A = 13;

    const speed = C * Math.pow(1 + x, value - A);
    return Math.round(speed * 1000) / 1000;
}
