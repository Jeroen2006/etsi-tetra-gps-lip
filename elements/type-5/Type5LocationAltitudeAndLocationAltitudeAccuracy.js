const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const { binaryToBigInt } = require('../../utils');

const defReturnValue = {
    "LOCATION-ALTITUDE-REQUIRED": 0,
    "LOCATION-ALTITUDE-AND-UNCERTAINTY-REQUIRED": 1,
}

const defRequestedRequired = {
    "NONE": 0,
    "REQUESTED": 1,
    "REQUIRED": 2,
    "REQUESTED-AND-REQUIRED": 3,
}

const defLocationAltitudeAccuracy = {
    "<1M": 0,
    "<2M": 1,
    "<5M": 2,
    "<15M": 3,
    "<50M": 4,
    "<150M": 5,
    "<300M": 6,
    "BEST-EFFORT": 7,
}

class ElementType5LocationAltitudeAndLocationAltitudeAccuracy extends ElementScaffold {
    constructor({ returnValue, requestedRequired, locationAltitudeAccuracyRequested, locationAltitudeAccuracyRequired }) {
        super(5, 0)
        this.elementIdentifier = new ElementType5ElementIdentifier("LOCATION-ALTITUDE-AND-ACCURACY");
        
        //check if returnValue is valid
        if(!Object.keys(defReturnValue).includes(returnValue)) throw new Error("Invalid returnValue");
        this.returnValue = returnValue;
        this.returnValueValue = defReturnValue[returnValue];

        //check if requestedRequired is valid
        if(!Object.keys(defRequestedRequired).includes(requestedRequired)) throw new Error("Invalid requestedRequired");
        this.requestedRequired = requestedRequired;
        this.requestedRequiredValue = defRequestedRequired[requestedRequired];

        if(requestedRequired == "REQUESTED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            if(!Object.keys(defLocationAltitudeAccuracy).includes(locationAltitudeAccuracyRequested)) throw new Error("Invalid locationAltitudeAccuracyRequested");
            this.locationAltitudeAccuracyRequested = locationAltitudeAccuracyRequested;
            this.locationAltitudeAccuracyRequestedValue = defLocationAltitudeAccuracy[locationAltitudeAccuracyRequested];
        } 

        if(requestedRequired == "REQUIRED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            if(!Object.keys(defLocationAltitudeAccuracy).includes(locationAltitudeAccuracyRequired)) throw new Error("Invalid locationAltitudeAccuracyRequired");
            this.locationAltitudeAccuracyRequired = locationAltitudeAccuracyRequired;
            this.locationAltitudeAccuracyRequiredValue = defLocationAltitudeAccuracy[locationAltitudeAccuracyRequired];
        }

        var contentBitstring = this.returnValueValue.toString(2).padStart(1, '0') + "0" //0 for WGS84 type
        contentBitstring += this.requestedRequiredValue.toString(2).padStart(2, '0')
        if(requestedRequired == "REQUESTED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            contentBitstring += this.locationAltitudeAccuracyRequestedValue.toString(2).padStart(3, '0')
        }
        if(requestedRequired == "REQUIRED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            contentBitstring += this.locationAltitudeAccuracyRequiredValue.toString(2).padStart(3, '0')
        }

        this.elementLength = new ElementType5ElementLength(contentBitstring.length);
        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();

        const bitString = elementIdentifierBits + elementLengthBits + contentBitstring;
        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        const returnValueBits = value.slice(0, 1);
        const requestedRequiredBits = value.slice(2, 4);
        
        const returnValueValue = parseInt(returnValueBits, 2);
        const requestedRequiredValue = parseInt(requestedRequiredBits, 2);

        const returnValue = Object.keys(defReturnValue).find(key => defReturnValue[key] === returnValueValue);
        const requestedRequired = Object.keys(defRequestedRequired).find(key => defRequestedRequired[key] === requestedRequiredValue);

        var locationAltitudeAccuracyRequested = null;
        var locationAltitudeAccuracyRequired = null;

        if(requestedRequired == "REQUESTED") {
            const locationAltitudeAccuracyRequestedBits = value.slice(4, 7);
            const locationAltitudeAccuracyRequestedValue = parseInt(locationAltitudeAccuracyRequestedBits, 2);
            locationAltitudeAccuracyRequested = Object.keys(defLocationAltitudeAccuracy).find(key => defLocationAltitudeAccuracy[key] === locationAltitudeAccuracyRequestedValue);
        } else if(requestedRequired == "REQUIRED") {
            const locationAltitudeAccuracyRequiredBits = value.slice(4, 7);
            const locationAltitudeAccuracyRequiredValue = parseInt(locationAltitudeAccuracyRequiredBits, 2);
            locationAltitudeAccuracyRequired = Object.keys(defLocationAltitudeAccuracy).find(key => defLocationAltitudeAccuracy[key] === locationAltitudeAccuracyRequiredValue);
        } else if(requestedRequired == "REQUESTED-AND-REQUIRED") {
            const locationAltitudeAccuracyRequestedBits = value.slice(4, 7);
            const locationAltitudeAccuracyRequestedValue = parseInt(locationAltitudeAccuracyRequestedBits, 2);
            locationAltitudeAccuracyRequested = Object.keys(defLocationAltitudeAccuracy).find(key => defLocationAltitudeAccuracy[key] === locationAltitudeAccuracyRequestedValue);

            const locationAltitudeAccuracyRequiredBits = value.slice(7, 10);
            const locationAltitudeAccuracyRequiredValue = parseInt(locationAltitudeAccuracyRequiredBits, 2);
            locationAltitudeAccuracyRequired = Object.keys(defLocationAltitudeAccuracy).find(key => defLocationAltitudeAccuracy[key] === locationAltitudeAccuracyRequiredValue);
        }

        return new ElementType5LocationAltitudeAndLocationAltitudeAccuracy({
            returnValue,
            requestedRequired,
            locationAltitudeAccuracyRequested,
            locationAltitudeAccuracyRequired
        });
    }

    static getDefinition() {
        return defLocationAltitudeAccuracy;
    }
}

module.exports = ElementType5LocationAltitudeAndLocationAltitudeAccuracy;
