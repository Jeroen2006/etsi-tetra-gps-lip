const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const { binaryToBigInt } = require("../../utils");

class ElementType5LocationMessageReference extends ElementScaffold {
    constructor(reference) {
        const elementIdentifier = new ElementType5ElementIdentifier("LOCATION-MESSAGE-REFERENCE");

        if (typeof reference !== 'number' || reference < 0 || reference > 255) {
            throw new Error('Location Message Reference must be a number between 0 and 255.');
        }

        super(1, 19); // 5 bits (Type5) + 8 bits (Payload)

        this.elementIdentifier = elementIdentifier;
        this.reference = reference;

        const elementIdentifierBinary = this.elementIdentifier.value.toString(2).padStart(5, '0');
        const referenceBinary = this.reference.toString(2).padStart(8, '0');

        this.length = 19; // 5 bits (Type5) + 6 bits (Length) + 8 bits (Payload) = 19 bits

        this.binary = elementIdentifierBinary + (this.length - 11).toString(2).padStart(6, '0') + referenceBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(19, '0');

        let index = 0;

        const elementIdentifierBits = binary.slice(index, index + 5); index += 5;
        const elementLengthBits = binary.slice(index, index + 6); index += 6;
        const referenceBits = binary.slice(index, index + 8); index += 8;

        const { elementIdentifier } = ElementType5ElementIdentifier.fromValue(parseInt(elementIdentifierBits, 2));

        if (elementIdentifier !== "LOCATION-MESSAGE-REFERENCE") {
            throw new Error('Invalid Type 5 Element Identifier (must be LOCATION-MESSAGE-REFERENCE)');
        }

        const elementLength = parseInt(elementLengthBits, 2);
        const reference = parseInt(referenceBits, 2);

        return new ElementType5LocationMessageReference(reference);
    }

    static isValid(value) {
        try {
            this.fromValue(value);
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = ElementType5LocationMessageReference;
