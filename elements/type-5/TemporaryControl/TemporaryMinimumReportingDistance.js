const ElementScaffold = require('../../scaffold');
const { binaryToBigInt, metersToString } = require('../../../utils');

const def = {

};

for(let i = 0; i <= 99; i++) {
    var meters = (i + 1) * 10 ;
    def[i] = metersToString(meters, 2);
}

for(let i = 100; i <= 127; i++) {
    var meters = ((i - 99) * 50 ) + 1000;
    def[i] = metersToString(meters, 2);
}

class ElementTemporaryMinimumReportingDistance extends ElementScaffold {
    constructor(temporaryMinimumReportingDistance) {
        super(1, 7); 

        if(!Object.values(def).includes(temporaryMinimumReportingDistance)) throw new Error('Invalid temporary minimum reporting distance value');
        this.temporaryMinimumReportingDistanceValue = parseInt(Object.keys(def).find(key => def[key] === temporaryMinimumReportingDistance))
        this.temporaryMinimumReportingDistance = temporaryMinimumReportingDistance;

        const temporaryMinimumReportingDistanceBits = this.temporaryMinimumReportingDistanceValue.toString(2).padStart(4, '0');
        this.value = binaryToBigInt(temporaryMinimumReportingDistanceBits);
        this.length = temporaryMinimumReportingDistanceBits.length;
    }

    static fromValue(value) {
        if (value.length !== 7) throw new Error('Invalid length for ElementTemporaryMinimumReportingDistance value');

        const temporaryMinimumReportingDistanceBits = value.slice(0, 7);
        const temporaryMinimumReportingDistanceValue = parseInt(temporaryMinimumReportingDistanceBits, 2);
        if (!Object.keys(def).includes(temporaryMinimumReportingDistanceValue.toString())) {
            throw new Error('Invalid temporary minimum reporting distance value');
        }
        const temporaryMinimumReportingDistance = def[temporaryMinimumReportingDistanceValue];
        if (!temporaryMinimumReportingDistance) throw new Error('Temporary minimum reporting distance not found in definition');

        return new ElementTemporaryMinimumReportingDistance(temporaryMinimumReportingDistance);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementTemporaryMinimumReportingDistance;
