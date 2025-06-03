const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const ElementTemporaryMinimumReportingDistance = require('./TemporaryControl/TemporaryMinimumReportingDistance');

const { binaryToBigInt } = require('../../utils');

const def = {
    "TEMPORARY-MINIMUM-REPORTING-DISTANCE": 0,
}

class ElementType5TemporaryControlParameterDefinition extends ElementScaffold {
    constructor(temporaryControlParameterValue) {
        super(1, 16); 

        if(temporaryControlParameterValue instanceof ElementTemporaryMinimumReportingDistance) {
            this.temporaryControlParameterType = 'TEMPORARY-MINIMUM-REPORTING-DISTANCE';
            this.temporaryControlParameterValue = temporaryControlParameterValue;
            this.temporaryMinimumReportingDistance = temporaryControlParameterValue;
            this.elementLength = new ElementType5ElementLength(10);
        } else {
            throw new Error('Invalid temporary control parameter value');
        }

        this.elementIdentifier = new ElementType5ElementIdentifier("TEMPORARY-CONTROL-PARAMETER-DEFINITION");

        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const temporaryControlParameterTypeBits = def[this.temporaryControlParameterType].toString(2).padStart(3, '0');
        const temporaryControlParameterValueBits = this.temporaryMinimumReportingDistance.toBinary();
        var bitString = elementIdentifierBits + elementLengthBits + temporaryControlParameterTypeBits + temporaryControlParameterValueBits;

        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        const temporaryControlParameterTypeBits = value.slice(0, 3);
        const temporaryControlParameterTypeValue = parseInt(temporaryControlParameterTypeBits, 2);
        const temporaryControlParameterType = Object.keys(def).find(key => def[key] === temporaryControlParameterTypeValue);
        if (!temporaryControlParameterType) {
            throw new Error('Invalid temporary control parameter type value');
        }

        var temporaryControlParameterValue;
        if(temporaryControlParameterType == "TEMPORARY-MINIMUM-REPORTING-DISTANCE") {
            const temporaryControlParameterValueBits = value.slice(3, 10); //length of 7 bits
            temporaryControlParameterValue = ElementTemporaryMinimumReportingDistance.fromValue(temporaryControlParameterValueBits);
        }

        return new ElementType5TemporaryControlParameterDefinition(temporaryControlParameterValue);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementType5TemporaryControlParameterDefinition;
