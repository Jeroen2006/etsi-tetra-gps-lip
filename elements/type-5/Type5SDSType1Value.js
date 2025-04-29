const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const { binaryToBigInt } = require('../../utils');

class ElementType5SDSType1Value extends ElementScaffold {
    constructor(sdsType1Value) {
        super(1, 16); 

        //check if sdsType1Value is a valid status value (0-65536)
        if(sdsType1Value > 65535 || sdsType1Value < 0) throw new Error('Invalid Result Code value. Must be between 0 and 65535');

        this.elementIdentifier = new ElementType5ElementIdentifier('STATUS-VALUE');
        this.elementLength = new ElementType5ElementLength(16);
        this.sdsType1Value = sdsType1Value;

        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const sdsType1ValueBits = this.sdsType1Value.toString(2).padStart(16, '0');
        var bitString = elementIdentifierBits + elementLengthBits + sdsType1ValueBits;

        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        if (value.length !== 16) throw new Error('Invalid length for status value');

        const sdsType1ValueBits = value.slice(0, 16);
        const sdsType1Value = parseInt(sdsType1ValueBits, 2);

        return new ElementType5SDSType1Value(sdsType1Value);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementType5SDSType1Value;
