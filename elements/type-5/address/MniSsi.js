const ElementScaffold = require('../../scaffold');
const { binaryToBigInt } = require("../../../utils");

class ElementMniSsi extends ElementScaffold {
    constructor({ ssi, countryCode, networkCode }) {
        if (typeof ssi !== 'number' || ssi < 0 || ssi > 0xFFFFFF) {
            throw new Error('SSI must be a 24-bit number (0–16777215)');
        }
        if (typeof countryCode !== 'number' || countryCode < 0 || countryCode > 0x3FF) {
            throw new Error('Country Code must be a 10-bit number (0–1023)');
        }
        if (typeof networkCode !== 'number' || networkCode < 0 || networkCode > 0x3FFF) {
            throw new Error('Network Code must be a 14-bit number (0–16383)');
        }

        super(1, 48); // 24 + 10 + 14 bits

        this.ssi = ssi;
        this.countryCode = countryCode;
        this.networkCode = networkCode;

        const ssiBinary = ssi.toString(2).padStart(24, '0');
        const countryBinary = countryCode.toString(2).padStart(10, '0');
        const networkBinary = networkCode.toString(2).padStart(14, '0');

        this.binary = ssiBinary + countryBinary + networkBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(48, '0');

        let index = 0;

        const ssiBits = binary.slice(index, index + 24); index += 24;
        const countryBits = binary.slice(index, index + 10); index += 10;
        const networkBits = binary.slice(index, index + 14); index += 14;

        const ssi = parseInt(ssiBits, 2);
        const countryCode = parseInt(countryBits, 2);
        const networkCode = parseInt(networkBits, 2);

        return new ElementMniSsi({ ssi, countryCode, networkCode });
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

module.exports = ElementMniSsi;
