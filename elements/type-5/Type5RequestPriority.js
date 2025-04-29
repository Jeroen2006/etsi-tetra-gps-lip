const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const { binaryToBigInt } = require('../../utils');

const def = {
    0: 'LOW',
    1: 'NORMAL',
    2: 'HIGH',
    3: 'HIGHEST'
};

class ElementType5RequestPriority extends ElementScaffold {
    constructor(requestPriority) {
        super(1, 2); 

        if(!Object.values(def).includes(requestPriority)) throw new Error('Invalid Default Request Priority value. Must be one of: LOW, NORMAL, HIGH, HIGHEST');
        this.requestPriorityValue = parseInt(Object.keys(def).find(key => def[key] === requestPriority))

        this.elementIdentifier = new ElementType5ElementIdentifier("REQUEST-PRIORITY");
        this.elementLength = new ElementType5ElementLength(2);
        this.requestPriority = requestPriority;
        

        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const requestPriorityBits = this.requestPriorityValue.toString(2).padStart(2, '0');
        var bitString = elementIdentifierBits + elementLengthBits + requestPriorityBits;

        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        if (value.length !== 2) throw new Error('Invalid length for request priority value');

        const requestPriorityBits = value.slice(0, 2);
        const requestPriority = binaryToBigInt(requestPriorityBits);

        return new ElementType5RequestPriority(def[requestPriority]);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementType5RequestPriority;
