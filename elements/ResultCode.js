const ElementScaffold = require('./scaffold');

const { binaryToBigInt } = require('../utils');

const def = {
    0: 'Success',
    1: 'System failure',
    2: 'Unspecified error',
    3: 'Unauthorized application',
    4: 'Unknown subscriber',
    5: 'Absent subscriber',
    6: 'Congestion in provider',
    7: 'Congestion in mobile network',
    8: 'Unsupported version',
    9: 'Insufficient resource',
    10: 'Syntax error',
    11: 'Protocol element not supported',
    12: 'Service not supported',
    13: 'Protocol element value not supported',
    14: 'Type of information not currently available',
    15: 'Required accuracy not achieved',
    16: 'Reserved',
    17: 'Reporting will stop',
    18: 'Time expired',
    19: 'Disallowed by local regulations',
    20: 'Reserved',
    21: 'No such request',
    22: 'User disabled location information report sending',
    23: 'Parameter values modified',
    24: 'Accepted',
    25: 'Accepted, but some triggers/accuracies modified or unsupported',
    26: 'Triggers not supported',
    27: 'Report complete',
    28: 'Backlog trigger set empty',
    81: 'Position method failure',
    200: 'Insufficient number of positioning entities',
    201: 'Bad positioning entity geometry',
    255: 'Reserved'
};

class ElementResultCode extends ElementScaffold {
    constructor(resultCode) {
        super(1, 8); 

        if(!Object.values(def).includes(resultCode)) throw new Error('Invalid Result Code value');
        this.resultCodeValue = parseInt(Object.keys(def).find(key => def[key] === resultCode))

        this.resultCode = resultCode;
        
        const resultCodeBits = this.resultCodeValue.toString(2).padStart(8, '0');
        var bitString = resultCodeBits;

        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        if (value.length !== 8) throw new Error('Invalid length for Result Code');

        const resultCodeBits = value.slice(0, 8);
        const resultCode = binaryToBigInt(resultCodeBits);

        return new ElementResultCode(def[resultCode]);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementResultCode;
