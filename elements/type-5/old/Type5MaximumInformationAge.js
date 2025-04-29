const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const { binaryToBigInt } = require("../../utils");

// Build the full lookup table
const maxInformationAgeDef = {};

for (let i = 0; i <= 29; i++) {
    maxInformationAgeDef[i] = `${i + 1} s`;
}
for (let i = 30; i <= 59; i++) {
    maxInformationAgeDef[i] = `${(i - 29) * 5 + 30} s`; // starting from 35s, then 40s, etc.
}
for (let i = 60; i <= 72; i++) {
    maxInformationAgeDef[i] = `${(i - 59) * 0.5 + 3} min`; // 3.5min, 4min, etc.
}
for (let i = 73; i <= 126; i++) {
    maxInformationAgeDef[i] = `${i - 63} min`; // 10min, 11min, etc.
}
maxInformationAgeDef[126] = "1 h 3 min";
maxInformationAgeDef[127] = "Best effort";

class ElementType5MaximumInformationAge extends ElementScaffold {
    constructor(ageValue) {
        const elementIdentifier = new ElementType5ElementIdentifier("MAXIMUM-INFORMATION-AGE");

        if (typeof ageValue !== 'number' || !(ageValue in maxInformationAgeDef)) {
            throw new Error('Invalid Maximum Information Age value (must be between 0 and 127).');
        }

        super(1, 18); // 5 bits ID + 6 bits length + 7 bits payload

        this.elementIdentifier = elementIdentifier;
        this.ageValue = ageValue;
        this.description = maxInformationAgeDef[ageValue];
        this.length = 7;

        const elementIdentifierBinary = this.elementIdentifier.value.toString(2).padStart(5, '0');
        const elementLengthBinary = this.length.toString(2).padStart(6, '0');
        const ageValueBinary = ageValue.toString(2).padStart(7, '0');

        this.binary = elementIdentifierBinary + elementLengthBinary + ageValueBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(18, '0');

        let index = 0;

        const elementIdentifierBits = binary.slice(index, index + 5); index += 5;
        const elementLengthBits = binary.slice(index, index + 6); index += 6;
        const ageValueBits = binary.slice(index, index + 7); index += 7;

        const identifier = ElementType5ElementIdentifier.fromValue(parseInt(elementIdentifierBits, 2));
        if (identifier.identifierName !== "MAXIMUM-INFORMATION-AGE") {
            throw new Error('Invalid Type 5 Element Identifier (must be MAXIMUM-INFORMATION-AGE)');
        }

        const elementLength = parseInt(elementLengthBits, 2);
        if (elementLength !== 7) {
            throw new Error(`Invalid element length for MAXIMUM-INFORMATION-AGE (expected 7, got ${elementLength})`);
        }

        const ageValue = parseInt(ageValueBits, 2);

        return new ElementType5MaximumInformationAge(ageValue);
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
        return maxInformationAgeDef;
    }
}

module.exports = ElementType5MaximumInformationAge;
