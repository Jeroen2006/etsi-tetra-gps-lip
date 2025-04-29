const ElementScaffold = require('../../scaffold');

const { binaryToBigInt } = require('../../../utils');

class ElementTriggerStatusValue extends ElementScaffold {
    constructor(statusValue) {
        super(1, 16); 

        //check if statusValue is a valid status value (0-65536)
        if(statusValue > 65535 || statusValue < 0) throw new Error('Invalid Result Code value. Must be between 0 and 65535');

        this.statusValue = statusValue;

        const statusValueBits = this.statusValue.toString(2).padStart(16, '0');
        var bitString = statusValueBits;

        this.value = binaryToBigInt(bitString);
    }

    static fromValue(value) {
        if (value.length !== 16) throw new Error('Invalid length for status value');

        const statusValueBits = value.slice(0, 16);
        const statusValue = parseInt(statusValueBits, 2);

        return new ElementTriggerStatusValue(statusValue);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementTriggerStatusValue;
