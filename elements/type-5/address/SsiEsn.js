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

class ElementSsiEsn extends ElementScaffold {
    constructor({ ssi, esn }) {
        if (typeof ssi !== 'number' || ssi < 0 || ssi > 0xFFFFFF) {
            throw new Error('SSI must be a 24-bit number (0–16777215)');
        }

        super(1, 48); // 24 + 10 + 14 bits

        this.addressOrIdentificationType = "SSI-EXTERNAL-SUBSCRIBER-NUMBER";
        this.esn = esn;
        this.ssi = ssi;

        const ssiBinary = ssi.toString(2).padStart(24, '0');
        var esnBinary = "";

        for (var i = 0; i < esn.length; i++) {
            const digitNum = Object.keys(digits).find(key => digits[key] === esn[i]);
            if (digitNum === undefined) throw new Error('Invalid ESN value.');
            esnBinary += parseInt(digitNum).toString(2).padStart(4, '0');
        }

        const binary = ssiBinary + esnBinary;
        this.value = binaryToBigInt(binary);
        this.length = binary.length;
    }

    static fromValue(binary) {
        let index = 0;

        const ssiBits = binary.slice(index, index + 24); index += 24;

        var esnBits = binary.slice(index);
        if (esnBits.length % 4 !== 0) throw new Error('Invalid length for ESN value.');
        esnBits = esnBits.match(/.{1,4}/g);
        const esnDigits = esnBits.map(bit => {
            const digitNum = binaryToBigInt(bit);
            return digits[digitNum];
        });

        const esn = esnDigits.join('');
        const ssi = parseInt(ssiBits, 2);

        return new ElementSsiEsn({ ssi, esn });
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

module.exports = ElementSsiEsn;
