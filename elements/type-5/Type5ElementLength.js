const ElementScaffold = require('../scaffold');
const { binaryToBigInt } = require('../../utils');

class ElementType5ElementLength extends ElementScaffold {
    constructor(elementLength) {
        if(elementLength < 64) super(1, 6); 
        if(elementLength >= 64) super(1, 13); 

        if (elementLength > 63 && elementLength % 8 !== 0) {
            throw new Error("Element length must be divisible by 8.");
        }

        var bitString = "";
        if (elementLength <= 63) {
            bitString = elementLength.toString(2).padStart(6, '0');
        } else {
            var elementLengthExtension = Math.ceil((elementLength / 8)) - 7;
            bitString = "000000" + elementLengthExtension.toString(2).padStart(7, '0');
            console.log(bitString)
        }
        this.elementLength = elementLength;
        this.value = binaryToBigInt(bitString);
        this.bitLength = bitString.length;
    }

    static fromValue(value) {
        var bitString = "";
        if (typeof value === 'string') bitString = value;
        else if (typeof value === 'number') bitString = value.toString(2);

        console.log(bitString)

        var elementLength = 0;
        const elementLengthBits = bitString.slice(0, 6);

        if(elementLengthBits == "000000"){
            const elementLengthExtensionBits = bitString.slice(6, 13);
            elementLength = (parseInt(elementLengthExtensionBits, 2) * 8) + 56;
        } else {
            elementLength = parseInt(elementLengthBits, 2);
        }

        return new ElementType5ElementLength(elementLength);
    }
}

module.exports = ElementType5ElementLength;
