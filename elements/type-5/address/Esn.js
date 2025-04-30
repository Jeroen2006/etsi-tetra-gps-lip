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

class ElementEsn extends ElementScaffold {
    constructor(esn) {
        super(1, 4);

        this.esn = esn;

        var bitString = "";
        for (var i = 0; i < esn.length; i++) {
            const digitNum = Object.keys(digits).find(key => digits[key] === esn[i]);
            if (digitNum === undefined) throw new Error('Invalid ESN value.');

            const digitBits = parseInt(digitNum).toString(2).padStart(4, '0');
            bitString += digitBits;
        }

        this.addressOrIdentificationType = "EXTERNAL-SUBSCRIBER-NUMBER";
        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) { 
        if (value.length % 4 !== 0) throw new Error('Invalid length for ESN value.');

        const esnBits = value.match(/.{1,4}/g);
        const esnDigits = esnBits.map(bit => {
            const digitNum = binaryToBigInt(bit);
            return digits[digitNum];
        });

        const esn = esnDigits.join('');
        return new ElementEsn(esn);
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

module.exports = ElementEsn;
