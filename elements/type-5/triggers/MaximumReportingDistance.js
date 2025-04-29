const ElementScaffold = require('../../scaffold');
const { binaryToBigInt, metersToString } = require('../../../utils');

const def = {}

for(let i = 0; i <= 99; i++) {
    var meters = (i + 1) * 100 ;
    def[i] = metersToString(meters);
}
for(let i = 100; i <= 127; i++) {
    var meters = ((i - 99) * 500) + 10000;
    def[i] = metersToString(meters);
}

class ElementMaximumReportingDistance extends ElementScaffold {
    constructor(maximumReportingDistance) {
        super(1, 7); 

        if(!Object.values(def).includes(maximumReportingDistance)) throw new Error('Invalid Maximum Reporting Distance value');

        this.maximumReportingDistanceValue = parseInt(Object.keys(def).find(key => def[key] === maximumReportingDistance))
        this.maximumReportingDistance = maximumReportingDistance;
        
        const maximumReportingDistanceBits = this.maximumReportingDistanceValue.toString(2).padStart(7, '0');

        this.value = binaryToBigInt(maximumReportingDistanceBits);
    }

    static fromValue(value) {
        if (value.length !== 7) throw new Error('Invalid length for Maximum Reporting Distance');

        const maximumReportingDistanceBits = value.slice(0, 7);
        const maximumReportingDistance = binaryToBigInt(maximumReportingDistanceBits);

        return new ElementMaximumReportingDistance(def[maximumReportingDistance]);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementMaximumReportingDistance;
