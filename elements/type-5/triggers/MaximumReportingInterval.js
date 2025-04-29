const ElementScaffold = require('../../scaffold');
const { binaryToBigInt, secondsToString } = require('../../../utils');

const def = {}

for(let i = 0; i <= 19; i++) {
    var seconds = (i + 1) * 30 ;
    def[i] = secondsToString(seconds);
}
for(let i = 20; i <= 39; i++) {
    var seconds = ((i - 19) * 60) + 600;
    def[i] = secondsToString(seconds);
}
for(let i = 40; i <= 93; i++) {
    var seconds = ((i - 39) * 600) + 1800;
    def[i] = secondsToString(seconds);
}

for(let i = 94; i <= 127; i++) {
    var seconds = ((i - 93) * 1800) + 34200;
    def[i] = secondsToString(seconds);
}

class ElementMaximumReportingInterval extends ElementScaffold {
    constructor(maximumReportingInterval) {
        super(1, 7); 

        if(!Object.values(def).includes(maximumReportingInterval)) throw new Error('Invalid Maximum Reporting Interval value');

        this.maximumReportingIntervalValue = parseInt(Object.keys(def).find(key => def[key] === maximumReportingInterval))
        this.maximumReportingInterval = maximumReportingInterval;
        
        const maximumReportingIntervalBits = this.maximumReportingIntervalValue.toString(2).padStart(7, '0');

        this.value = binaryToBigInt(maximumReportingIntervalBits);
    }

    static fromValue(value) {
        if (value.length !== 7) throw new Error('Invalid length for Maximum Reporting Interval');

        const maximumReportingIntervalBits = value.slice(0, 7);
        const maximumReportingInterval = binaryToBigInt(maximumReportingIntervalBits);

        return new ElementMaximumReportingInterval(def[maximumReportingInterval]);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementMaximumReportingInterval;
