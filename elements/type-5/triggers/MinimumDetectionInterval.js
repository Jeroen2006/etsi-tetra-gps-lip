const ElementScaffold = require('../../scaffold');
const { binaryToBigInt, secondsToString } = require('../../../utils');

const def = {}

for(let i = 0; i <= 30; i++) {
    var seconds = i * 10 ;
    def[i] = secondsToString(seconds);
}
for(let i = 31; i <= 60; i++) {
    var seconds = (i - 30) * 30 + 300;
    def[i] = secondsToString(seconds);
}
for(let i = 61; i <= 127; i++) {
    var seconds = (i - 60) * 60 + (20 * 60);
    def[i] = secondsToString(seconds);
}

class ElementMinimumDetectionInterval extends ElementScaffold {
    constructor(minimumDetectionInterval) {
        super(1, 7); 

        if(!Object.values(def).includes(minimumDetectionInterval)) throw new Error('Invalid Minimum Detection Interval value');

        this.minimumDetectionIntervalValue = parseInt(Object.keys(def).find(key => def[key] === minimumDetectionInterval))
        this.minimumDetectionInterval = minimumDetectionInterval;
        
        const minimumDetectionIntervalBits = this.minimumDetectionIntervalValue.toString(2).padStart(7, '0');

        this.value = binaryToBigInt(minimumDetectionIntervalBits);
    }

    static fromValue(value) {
        if (value.length !== 7) throw new Error('Invalid length for Minimum Detection Interval');

        const minimumDetectionIntervalBits = value.slice(0, 7);
        const minimumDetectionInterval = binaryToBigInt(minimumDetectionIntervalBits);

        return new ElementMinimumDetectionInterval(def[minimumDetectionInterval]);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementMinimumDetectionInterval;
