const ElementScaffold = require('../../scaffold');
const { binaryToBigInt } = require("../../../utils");

const digits = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "*",
    11: "#",
    12: "+",
}

class ElementMniSsiEsn extends ElementScaffold {
    constructor({ ssi, countryCode, networkCode, esn }) {
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

        this.addressOrIdentificationType = "SSI-MNI-EXTERNAL-SUBSCRIBER-NUMBER";
        this.esn = esn;
        this.ssi = ssi;
        this.countryCode = countryCode;
        this.networkCode = networkCode;

        const ssiBinary = ssi.toString(2).padStart(24, '0');
        const countryBinary = countryCode.toString(2).padStart(10, '0');
        const networkBinary = networkCode.toString(2).padStart(14, '0');
        var esnBinary = "";

        for (var i = 0; i < esn.length; i++) {
            const digitNum = Object.keys(digits).find(key => digits[key] === esn[i]);
            if (digitNum === undefined) throw new Error('Invalid ESN value.');
            esnBinary += parseInt(digitNum).toString(2).padStart(4, '0');
        }

        const binary = ssiBinary + countryBinary + networkBinary + esnBinary;
        this.value = binaryToBigInt(binary);
        this.length = binary.length;
    }

    static fromValue(binary) {

        let index = 0;

        const ssiBits = binary.slice(index, index + 24); index += 24;
        const countryBits = binary.slice(index, index + 10); index += 10;
        const networkBits = binary.slice(index, index + 14); index += 14;

        var esnBits = binary.slice(index);
        if (esnBits.length % 4 !== 0) throw new Error('Invalid length for ESN value.');
        esnBits = esnBits.match(/.{1,4}/g);
        const esnDigits = esnBits.map(bit => {
            const digitNum = binaryToBigInt(bit);
            return digits[digitNum];
        });
        const esn = esnDigits.join('');

        const ssi = parseInt(ssiBits, 2);
        const countryCode = parseInt(countryBits, 2);
        const networkCode = parseInt(networkBits, 2);

        return new ElementMniSsiEsn({ ssi, countryCode, networkCode, esn });
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

module.exports = ElementMniSsiEsn;
