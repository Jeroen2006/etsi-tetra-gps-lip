const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const { binaryToBigInt } = require("../../utils");

// Lookup table with clean names
const requestPriorityDef = {
    0: 'LOW',
    1: 'NORMAL',
    2: 'HIGH',
    3: 'HIGHEST'
};

class ElementType5RequestPriority extends ElementScaffold {
    constructor(priority) {
        const elementIdentifier = new ElementType5ElementIdentifier("REQUEST-PRIORITY");

        if (typeof priority !== 'number' || !(priority in requestPriorityDef)) {
            throw new Error('Invalid Request Priority. Must be 0 (LOW), 1 (NORMAL), 2 (HIGH), or 3 (HIGHEST).');
        }

        super(1, 13); // 5 bits ID + 6 bits length + 2 bits payload

        this.elementIdentifier = elementIdentifier;
        this.priority = priority;
        this.name = requestPriorityDef[priority];
        this.length = 13; // 5 bits (Type5) + 6 bits (Length) + 2 bits (Payload) = 13 bits

        const elementIdentifierBinary = this.elementIdentifier.value.toString(2).padStart(5, '0');
        const elementLengthBinary = (this.length - 11).toString(2).padStart(6, '0');
        const priorityBinary = priority.toString(2).padStart(2, '0');

        this.binary = elementIdentifierBinary + elementLengthBinary + priorityBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(13, '0');

        let index = 0;

        const elementIdentifierBits = binary.slice(index, index + 5); index += 5;
        const elementLengthBits = binary.slice(index, index + 6); index += 6;
        const priorityBits = binary.slice(index, index + 2); index += 2;

        const identifier = ElementType5ElementIdentifier.fromValue(parseInt(elementIdentifierBits, 2));

        if (identifier.identifierName !== "REQUEST-PRIORITY") {
            throw new Error('Invalid Type 5 Element Identifier (must be REQUEST-PRIORITY)');
        }

        const elementLength = parseInt(elementLengthBits, 2);
        if (elementLength !== 2) {
            throw new Error(`Invalid element length for REQUEST-PRIORITY (expected 2, got ${elementLength})`);
        }

        const priority = parseInt(priorityBits, 2);

        return new ElementType5RequestPriority(priority);
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
        return requestPriorityDef;
    }
}

module.exports = ElementType5RequestPriority;
