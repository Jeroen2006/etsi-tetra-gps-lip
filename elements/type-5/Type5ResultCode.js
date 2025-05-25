const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const { binaryToBigInt } = require('../../utils');

const def = {
    0: 'SUCCESS',
    1: 'SYSTEM-FAILURE',
    2: 'UNSPECIFIED-ERROR',
    3: 'UNAUTHORIZED-APPLICATION',
    4: 'UNKNOWN-SUBSCRIBER',
    5: 'ABSENT-SUBSCRIBER',
    6: 'CONGESTION-IN-PROVIDER',
    7: 'CONGESTION-IN-MOBILE-NETWORK',
    8: 'UNSUPPORTED-VERSION',
    9: 'INSUFFICIENT-RESOURCE',
    10: 'SYNTAX-ERROR',
    11: 'PROTOCOL-ELEMENT-NOT-SUPPORTED',
    12: 'SERVICE-NOT-SUPPORTED',
    13: 'PROTOCOL-ELEMENT-VALUE-NOT-SUPPORTED',
    14: 'TYPE-OF-INFORMATION-NOT-CURRENTLY-AVAILABLE',
    15: 'REQUIRED-ACCURACY-NOT-ACHIEVED',
    16: 'RESERVED',
    17: 'REPORTING-WILL-STOP',
    18: 'TIME-EXPIRED',
    19: 'DISALLOWED-BY-LOCAL-REGULATIONS',
    20: 'RESERVED',
    21: 'NO-SUCH-REQUEST',
    22: 'USER-DISABLED-LOCATION-INFORMATION-REPORT-SENDING', 
    23: 'PARAMETER-VALUES-MODIFIED', 
    24: 'ACCEPTED',
    25: 'ACCEPTED-BUT-SOME-TRIGGERS-ACCURACIES-MODIFIED-OR-UNSUPPORTED', 
    26: 'TRIGGERS-NOT-SUPPORTED',
    27: 'REPORT-COMPLETE',
    28: 'BACKLOG-TRIGGER-SET-EMPTY', 
    81: 'POSITION-METHOD-FAILURE',
    200: 'INSUFFICIENT-NUMBER-OF-POSITIONING-ENTITIES',
    201: 'BAD-POSITIONING-ENTITY-GEOMETRY',
    255: 'RESERVED'
};

class ElementType5ResultCode extends ElementScaffold {
    constructor(resultCode) {
        super(1, 8); 

        if(!Object.values(def).includes(resultCode)) throw new Error('Invalid Result Code value');
        this.resultCodeValue = parseInt(Object.keys(def).find(key => def[key] === resultCode))

        this.elementIdentifier = new ElementType5ElementIdentifier('RESULT-CODE');
        this.elementLength = new ElementType5ElementLength(8);
        this.resultCode = resultCode;
        

        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const resultCodeBits = this.resultCodeValue.toString(2).padStart(8, '0');
        var bitString = elementIdentifierBits + elementLengthBits + resultCodeBits;

        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        if (value.length !== 8) throw new Error('Invalid length for Result Code');

        const resultCodeBits = value.slice(0, 8);
        const resultCode = binaryToBigInt(resultCodeBits);

        return new ElementType5ResultCode(def[resultCode]);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementType5ResultCode;
