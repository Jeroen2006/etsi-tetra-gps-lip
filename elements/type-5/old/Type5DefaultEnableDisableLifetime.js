const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const { binaryToBigInt } = require("../../utils");

// Lookup table for Default Enable/Disable Lifetime
const defaultLifetimeDef = {
    0: "UNTIL-MIGRATION",
    1: "UNTIL-NEXT-ATTACH",
    2: "RESERVED",
    3: "RESERVED"
};

class ElementType5DefaultEnableDisableLifetime extends ElementScaffold {
    constructor(lifetimeValue) {
        const elementIdentifier = new ElementType5ElementIdentifier("DEFAULT-ENABLE-DISABLE-LIFETIME");

        if (typeof lifetimeValue !== 'number' || !(lifetimeValue in defaultLifetimeDef)) {
            throw new Error('Invalid Default Enable/Disable Lifetime value (must be 0–3).');
        }

        super(1, 13); // 5 bits ID + 6 bits length + 2 bits payload

        this.elementIdentifier = elementIdentifier;
        this.lifetimeValue = lifetimeValue;
        this.description = defaultLifetimeDef[lifetimeValue];
        this.length = 2;

        const elementIdentifierBinary = this.elementIdentifier.value.toString(2).padStart(5, '0');
        const elementLengthBinary = this.length.toString(2).padStart(6, '0');
        const lifetimeValueBinary = lifetimeValue.toString(2).padStart(2, '0');

        this.binary = elementIdentifierBinary + elementLengthBinary + lifetimeValueBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(13, '0');

        let index = 0;

        const elementIdentifierBits = binary.slice(index, index + 5); index += 5;
        const elementLengthBits = binary.slice(index, index + 6); index += 6;
        const lifetimeBits = binary.slice(index, index + 2); index += 2;

        const identifier = ElementType5ElementIdentifier.fromValue(parseInt(elementIdentifierBits, 2));
        if (identifier.identifierName !== "DEFAULT-ENABLE-DISABLE-LIFETIME") {
            throw new Error('Invalid Type 5 Element Identifier (must be DEFAULT-ENABLE-DISABLE-LIFETIME)');
        }

        const elementLength = parseInt(elementLengthBits, 2);
        if (elementLength !== 2) {
            throw new Error(`Invalid element length for DEFAULT-ENABLE-DISABLE-LIFETIME (expected 2, got ${elementLength})`);
        }

        const lifetimeValue = parseInt(lifetimeBits, 2);

        return new ElementType5DefaultEnableDisableLifetime(lifetimeValue);
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
        return defaultLifetimeDef;
    }
}

module.exports = ElementType5DefaultEnableDisableLifetime;
