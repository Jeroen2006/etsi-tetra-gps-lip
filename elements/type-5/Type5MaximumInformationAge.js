const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');


const { binaryToBigInt, secondsToString } = require('../../utils');

const def = {
    127: "BEST-EFFORT"
}

for(let i = 0; i <= 29; i++) {
    var seconds = i + 1;
    def[i] = secondsToString(seconds);
}
for(let i = 30; i <= 59; i++) {
    var seconds = (i - 29) * 5 + 30;
    def[i] = secondsToString(seconds);
}
for(let i = 60; i <= 73; i++) {
    var seconds = (i - 59) * 30 + 180;
    def[i] = secondsToString(seconds);
}
for(let i = 74; i <= 126; i++) {
    var seconds = (i - 63) * 60;
    def[i] = secondsToString(seconds);
}

class ElementType5MaximumInformationAge extends ElementScaffold {
    constructor(maximumInformationAge) {
        super(1, 7); 

        if(!Object.values(def).includes(maximumInformationAge)) throw new Error('Invalid Maximum Information Age value');
        this.maximumInformationAgeValue = parseInt(Object.keys(def).find(key => def[key] === maximumInformationAge))

        this.elementIdentifier = new ElementType5ElementIdentifier('MAXIMUM-INFORMATION-AGE');
        this.elementLength = new ElementType5ElementLength(7);
        this.maximumInformationAge = maximumInformationAge;
        

        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const maximumInformationAgeBits = this.maximumInformationAgeValue.toString(2).padStart(7, '0');
        var bitString = elementIdentifierBits + elementLengthBits + maximumInformationAgeBits;

        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        if (value.length !== 7) throw new Error('Invalid length for Maximum Information Age');

        const maximumInformationAgeBits = value.slice(0, 7);
        const maximumInformationAge = binaryToBigInt(maximumInformationAgeBits);

        return new ElementType5MaximumInformationAge(def[maximumInformationAge]);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementType5MaximumInformationAge;
