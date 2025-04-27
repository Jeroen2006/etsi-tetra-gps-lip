const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const { binaryToBigInt } = require("../../utils");

// Result Code Definitions
const resultCodeDef = {
    0: 'Success',
    1: 'System failure',
    2: 'Unspecified error',
    3: 'Unauthorized application',
    4: 'Unknown subscriber',
    5: 'Absent subscriber',
    6: 'Congestion in provider',
    7: 'Congestion in mobile network',
    8: 'Unsupported version',
    9: 'Insufficient resource',
    10: 'Syntax error',
    11: 'Protocol element not supported',
    12: 'Service not supported',
    13: 'Protocol element value not supported',
    14: 'Type of information not currently available',
    15: 'Required accuracy not achieved',
    16: 'Reserved',
    17: 'Reporting will stop',
    18: 'Time expired',
    19: 'Disallowed by local regulations',
    20: 'Reserved',
    21: 'No such request',
    22: 'User disabled location information report sending',
    23: 'Parameter values modified',
    24: 'Accepted',
    25: 'Accepted, but some triggers/accuracies modified or unsupported',
    26: 'Triggers not supported',
    27: 'Report complete',
    28: 'Backlog trigger set empty',
    81: 'Position method failure',
    200: 'Insufficient number of positioning entities',
    201: 'Bad positioning entity geometry',
    255: 'Reserved'
};

class ElementType5ResultCode extends ElementScaffold {
    constructor(code) {
        const elementIdentifier = new ElementType5ElementIdentifier("RESULT-CODE");

        if (typeof code !== 'number' || code < 0 || code > 255) {
            throw new Error('Result code must be between 0 and 255.');
        }

        super(1, 19); // 5 bits ID + 6 bits length + 8 bits payload

        this.elementIdentifier = elementIdentifier;
        this.code = code;
        this.description = resultCodeDef[code] || 'Unknown or Reserved';

        this.length = 19;

        const elementIdentifierBinary = this.elementIdentifier.value.toString(2).padStart(5, '0');
        const elementLengthBinary = (this.length - 11).toString(2).padStart(6, '0');
        const codeBinary = code.toString(2).padStart(8, '0');

        this.binary = elementIdentifierBinary + elementLengthBinary + codeBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(19, '0');

        let index = 0;

        const elementIdentifierBits = binary.slice(index, index + 5); index += 5;
        const elementLengthBits = binary.slice(index, index + 6); index += 6;
        const codeBits = binary.slice(index, index + 8); index += 8;

        const { elementIdentifier } = ElementType5ElementIdentifier.fromValue(parseInt(elementIdentifierBits, 2));

        if (elementIdentifier !== "RESULT-CODE") {
            throw new Error('Invalid Type 5 Element Identifier (must be RESULT-CODE)');
        }

        const elementLength = parseInt(elementLengthBits, 2);
        if (elementLength !== 8) {
            throw new Error(`Invalid element length for RESULT-CODE (expected 8, got ${elementLength})`);
        }

        const code = parseInt(codeBits, 2);

        return new ElementType5ResultCode(code);
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
        return resultCodeDef;
    }
}

module.exports = ElementType5ResultCode;
