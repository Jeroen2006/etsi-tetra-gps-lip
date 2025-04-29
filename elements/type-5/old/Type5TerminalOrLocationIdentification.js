const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementSSI = require('./address/Ssi');
const ElementMniSsi = require('./address/MniSsi');
const { binaryToBigInt } = require("../../utils");

const identificationTypeDef = {
    0: "NO-ADDRESS",
    1: "SSI",
    2: "MNI-SSI"
};

class ElementType5TerminalOrLocationIdentification extends ElementScaffold {
    constructor({ type, payload }) {
        const elementIdentifier = new ElementType5ElementIdentifier("TERMINAL-OR-LOCATION-IDENTIFICATION");

        if (![1, 2].includes(type)) {
            throw new Error('Only SSI (1) and MNI-SSI (2) are supported.');
        }

        let innerElement;
        if (type === 1) {
            innerElement = new ElementSSI(payload);
        } else if (type === 2) {
            innerElement = new ElementMniSsi(payload);
        }

        const payloadBinary = innerElement.binary;
        const addressTypeBinary = type.toString(2).padStart(4, '0');

        super(1, 5 + 6 + 4 + payloadBinary.length); // 5 bits ID + 6 bits length + 4 bits address type + payload

        this.elementIdentifier = elementIdentifier;
        this.type = type;
        this.typeName = identificationTypeDef[type];
        this.innerElement = innerElement;
        this.length = 15 + payloadBinary.length; // in bits

        this.binary = 
            this.elementIdentifier.value.toString(2).padStart(5, '0') +
            (this.length - 11).toString(2).padStart(6, '0') +
            addressTypeBinary +
            payloadBinary;

        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2);
        const totalLength = binary.length;

        let index = 0;

        const identifierBits = binary.slice(index, index + 5); index += 5;
        const lengthBits = binary.slice(index, index + 6); index += 6;
        const addressTypeBits = binary.slice(index, index + 4); index += 4;

        const { elementIdentifier } = ElementType5ElementIdentifier.fromValue(parseInt(identifierBits, 2));
        if (elementIdentifier !== "TERMINAL-OR-LOCATION-IDENTIFICATION") {
            throw new Error('Invalid Type 5 Element Identifier (must be TERMINAL-OR-LOCATION-IDENTIFICATION)');
        }

        const addressType = parseInt(addressTypeBits, 2);
        if (![1, 2].includes(addressType)) {
            throw new Error('Only SSI (1) and MNI-SSI (2) are supported in this class.');
        }

        const payloadBits = binary.slice(index);

        let payload;
        if (addressType === 1) {
            payload = ElementSSI.fromValue(payloadBits).ssi;
        } else if (addressType === 2) {
            payload = ElementMniSsi.fromValue(payloadBits);
        }

        return new ElementType5TerminalOrLocationIdentification({
            type: addressType,
            payload: payload
        });
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
        return identificationTypeDef;
    }
}

module.exports = ElementType5TerminalOrLocationIdentification;
