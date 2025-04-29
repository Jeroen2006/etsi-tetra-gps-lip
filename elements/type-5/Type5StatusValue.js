const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const { binaryToBigInt } = require('../../utils');

class ElementType5StatusValue extends ElementScaffold {
    constructor(statusValue) {
        super(1, 16); 

        //check if statusValue is a valid status value (0-65536)
        if(statusValue > 65535 || statusValue < 0) throw new Error('Invalid Result Code value. Must be between 0 and 65535');

        this.elementIdentifier = new ElementType5ElementIdentifier('STATUS-VALUE');
        this.elementLength = new ElementType5ElementLength(16);
        this.statusValue = statusValue;

        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const statusValueBits = this.statusValue.toString(2).padStart(16, '0');
        var bitString = elementIdentifierBits + elementLengthBits + statusValueBits;

        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        if (value.length !== 16) throw new Error('Invalid length for status value');

        const statusValueBits = value.slice(0, 16);
        const statusValue = parseInt(statusValueBits, 2);

        return new ElementType5StatusValue(statusValue);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementType5StatusValue;
