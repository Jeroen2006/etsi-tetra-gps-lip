const ElementScaffold = require('../../scaffold');
const { binaryToBigInt } = require("../../../utils");

class ElementSSI extends ElementScaffold {
    constructor(ssi) {
        if (typeof ssi !== 'number' || ssi < 0 || ssi > 0xFFFFFF) {
            throw new Error('SSI must be a number between 0 and 16777215 (24 bits).');
        }

        super(1, 24); // 24 bits

        this.addressOrIdentificationType = "SSI";
        this.ssi = ssi;
        this.value = ssi
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const ssi = Number(value);
        if (ssi < 0 || ssi > 0xFFFFFF) {
            throw new Error('Invalid SSI value (must be 0–16777215)');
        }

        return new ElementSSI(ssi);
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

module.exports = ElementSSI;
