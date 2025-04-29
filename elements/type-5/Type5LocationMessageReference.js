const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const { binaryToBigInt } = require('../../utils');

class ElementType5LocationMessageReference extends ElementScaffold {
    constructor(locationMessageReference) {
        super(1, 8); 

        //check if locationMessageReference is a valid status value (0-255)
        if(locationMessageReference > 255 || locationMessageReference < 0) throw new Error('Invalid Result Code value. Must be between 0 and 255');

        this.elementIdentifier = new ElementType5ElementIdentifier("LOCATION-MESSAGE-REFERENCE");
        this.elementLength = new ElementType5ElementLength(8);
        this.locationMessageReference = locationMessageReference;

        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const locationMessageReferenceBits = this.locationMessageReference.toString(2).padStart(8, '0');
        var bitString = elementIdentifierBits + elementLengthBits + locationMessageReferenceBits;

        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        if (value.length !== 8) throw new Error('Invalid length for status value');

        const locationMessageReferenceBits = value.slice(0, 8);
        const locationMessageReference = parseInt(locationMessageReferenceBits, 2);

        return new ElementType5LocationMessageReference(locationMessageReference);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementType5LocationMessageReference;
