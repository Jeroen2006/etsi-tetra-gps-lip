const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const { binaryToBigInt } = require("../../utils");

// Build the full lookup table
const maxResponseTimeDef = {};

maxResponseTimeDef[0] = "Immediate";

for (let i = 1; i <= 127; i++) {
    const seconds = i * 2;
    let description = `${seconds} s`;
    if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        description += ` (${minutes} min${remainingSeconds > 0 ? ` ${remainingSeconds} s` : ''})`;
    }
    maxResponseTimeDef[i] = description;
}

class ElementType5MaximumResponseTime extends ElementScaffold {
    constructor(responseTimeValue) {
        const elementIdentifier = new ElementType5ElementIdentifier("MAXIMUM-RESPONSE-TIME");

        if (typeof responseTimeValue !== 'number' || !(responseTimeValue in maxResponseTimeDef)) {
            throw new Error('Invalid Maximum Response Time value (must be between 0 and 127).');
        }

        super(1, 18); // 5 bits ID + 6 bits length + 7 bits payload

        this.elementIdentifier = elementIdentifier;
        this.responseTimeValue = responseTimeValue;
        this.description = maxResponseTimeDef[responseTimeValue];
        this.length = 7;

        const elementIdentifierBinary = this.elementIdentifier.value.toString(2).padStart(5, '0');
        const elementLengthBinary = this.length.toString(2).padStart(6, '0');
        const responseTimeBinary = responseTimeValue.toString(2).padStart(7, '0');

        this.binary = elementIdentifierBinary + elementLengthBinary + responseTimeBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(18, '0');

        let index = 0;

        const elementIdentifierBits = binary.slice(index, index + 5); index += 5;
        const elementLengthBits = binary.slice(index, index + 6); index += 6;
        const responseTimeBits = binary.slice(index, index + 7); index += 7;

        const identifier = ElementType5ElementIdentifier.fromValue(parseInt(elementIdentifierBits, 2));
        if (identifier.identifierName !== "MAXIMUM-RESPONSE-TIME") {
            throw new Error('Invalid Type 5 Element Identifier (must be MAXIMUM-RESPONSE-TIME)');
        }

        const elementLength = parseInt(elementLengthBits, 2);
        if (elementLength !== 7) {
            throw new Error(`Invalid element length for MAXIMUM-RESPONSE-TIME (expected 7, got ${elementLength})`);
        }

        const responseTimeValue = parseInt(responseTimeBits, 2);

        return new ElementType5MaximumResponseTime(responseTimeValue);
    }

    static isValid(value) {
        try {
            this.fromValue(value);
            return true;
        } catch {
            return false;
        }
    }

    static get def() {
        return maxResponseTimeDef;
    }
}

module.exports = ElementType5MaximumResponseTime;
