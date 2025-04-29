const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');


const { binaryToBigInt, secondsToString } = require('../../utils');

const def = {
    0: "IMMEDIATE",
}

for(let i = 1; i <= 127; i++) {
    var seconds = i * 2;
    def[i] = secondsToString(seconds);
}

class ElementType5MaximumResponseTime extends ElementScaffold {
    constructor(maximumResponseTime) {
        super(1, 7); 

        if(!Object.values(def).includes(maximumResponseTime)) throw new Error('Invalid Maximum Response Time value');
        this.maximumResponseTimeValue = parseInt(Object.keys(def).find(key => def[key] === maximumResponseTime))

        this.elementIdentifier = new ElementType5ElementIdentifier("MAXIMUM-RESPONSE-TIME");
        this.elementLength = new ElementType5ElementLength(7);
        this.maximumResponseTime = maximumResponseTime;
        

        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const maximumResponseTimeBits = this.maximumResponseTimeValue.toString(2).padStart(7, '0');
        var bitString = elementIdentifierBits + elementLengthBits + maximumResponseTimeBits;

        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        if (value.length !== 7) throw new Error('Invalid length for Maximum Response Time');

        const maximumResponseTimeBits = value.slice(0, 7);
        const maximumResponseTime = binaryToBigInt(maximumResponseTimeBits);

        return new ElementType5MaximumResponseTime(def[maximumResponseTime]);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementType5MaximumResponseTime;
