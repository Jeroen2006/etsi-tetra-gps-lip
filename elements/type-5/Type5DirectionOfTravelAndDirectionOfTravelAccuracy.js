const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const { binaryToBigInt } = require('../../utils');

const defReturnValue = {
    "DIRECTION-OF-TRAVEL-REQUIRED": 0,
    "DIRECTION-OF-TRAVEL-AND-UNCERTAINTY-REQUIRED": 1,
}

const defRequestedRequired = {
    "NONE": 0,
    "REQUESTED": 1,
    "REQUIRED": 2,
    "REQUESTED-AND-REQUIRED": 3,
}

const defDirectionOfTravelAccuracy = {
    "<1,5DEG": 0,
    "<3DEG": 1,
    "<6DEG": 2,
    "<12DEG": 3,
    "<24DEG": 4,
    "<48DEG": 5,
    "<96DEG": 6,
    "BEST-EFFORT": 7,
}

class ElementType5DirectionOfTravelAndDirectionOfTravelAccuracy extends ElementScaffold {
    constructor({ returnValue, requestedRequired, directionOfTravelAccuracyRequested, directionOfTravelAccuracyRequired }) {
        super(5, 0)
        this.elementIdentifier = new ElementType5ElementIdentifier("DIRECTION-OF-TRAVEL-AND-ACCURACY");
        
        //check if returnValue is valid
        if(!Object.keys(defReturnValue).includes(returnValue)) throw new Error("Invalid returnValue");
        this.returnValue = returnValue;
        this.returnValueValue = defReturnValue[returnValue];

        //check if requestedRequired is valid
        if(!Object.keys(defRequestedRequired).includes(requestedRequired)) throw new Error("Invalid requestedRequired");
        this.requestedRequired = requestedRequired;
        this.requestedRequiredValue = defRequestedRequired[requestedRequired];

        if(requestedRequired == "REQUESTED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            if(!Object.keys(defDirectionOfTravelAccuracy).includes(directionOfTravelAccuracyRequested)) throw new Error("Invalid directionOfTravelAccuracyRequested");
            this.directionOfTravelAccuracyRequested = directionOfTravelAccuracyRequested;
            this.directionOfTravelAccuracyRequestedValue = defDirectionOfTravelAccuracy[directionOfTravelAccuracyRequested];
        } 

        if(requestedRequired == "REQUIRED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            if(!Object.keys(defDirectionOfTravelAccuracy).includes(directionOfTravelAccuracyRequired)) throw new Error("Invalid directionOfTravelAccuracyRequired");
            this.directionOfTravelAccuracyRequired = directionOfTravelAccuracyRequired;
            this.directionOfTravelAccuracyRequiredValue = defDirectionOfTravelAccuracy[directionOfTravelAccuracyRequired];
        }

        var contentBitstring = this.returnValueValue.toString(2).padStart(1, '0')
        contentBitstring += this.requestedRequiredValue.toString(2).padStart(2, '0')
        if(requestedRequired == "REQUESTED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            contentBitstring += this.directionOfTravelAccuracyRequestedValue.toString(2).padStart(3, '0')
        }
        if(requestedRequired == "REQUIRED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            contentBitstring += this.directionOfTravelAccuracyRequiredValue.toString(2).padStart(3, '0')
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
        const requestedRequiredBits = value.slice(1, 3);
        
        const returnValueValue = parseInt(returnValueBits, 2);
        const requestedRequiredValue = parseInt(requestedRequiredBits, 2);

        const returnValue = Object.keys(defReturnValue).find(key => defReturnValue[key] === returnValueValue);
        const requestedRequired = Object.keys(defRequestedRequired).find(key => defRequestedRequired[key] === requestedRequiredValue);

        var directionOfTravelAccuracyRequested = null;
        var directionOfTravelAccuracyRequired = null;

        if(requestedRequired == "REQUESTED") {
            const directionOfTravelAccuracyRequestedBits = value.slice(3, 6);
            const directionOfTravelAccuracyRequestedValue = parseInt(directionOfTravelAccuracyRequestedBits, 2);
            directionOfTravelAccuracyRequested = Object.keys(defDirectionOfTravelAccuracy).find(key => defDirectionOfTravelAccuracy[key] === directionOfTravelAccuracyRequestedValue);
        } else if(requestedRequired == "REQUIRED") {
            const directionOfTravelAccuracyRequiredBits = value.slice(3, 6);
            const directionOfTravelAccuracyRequiredValue = parseInt(directionOfTravelAccuracyRequiredBits, 2);
            directionOfTravelAccuracyRequired = Object.keys(defDirectionOfTravelAccuracy).find(key => defDirectionOfTravelAccuracy[key] === directionOfTravelAccuracyRequiredValue);
        } else if(requestedRequired == "REQUESTED-AND-REQUIRED") {
            const directionOfTravelAccuracyRequestedBits = value.slice(3, 6);
            const directionOfTravelAccuracyRequestedValue = parseInt(directionOfTravelAccuracyRequestedBits, 2);
            directionOfTravelAccuracyRequested = Object.keys(defDirectionOfTravelAccuracy).find(key => defDirectionOfTravelAccuracy[key] === directionOfTravelAccuracyRequestedValue);

            const directionOfTravelAccuracyRequiredBits = value.slice(6, 9);
            const directionOfTravelAccuracyRequiredValue = parseInt(directionOfTravelAccuracyRequiredBits, 2);
            directionOfTravelAccuracyRequired = Object.keys(defDirectionOfTravelAccuracy).find(key => defDirectionOfTravelAccuracy[key] === directionOfTravelAccuracyRequiredValue);
        }
        return new ElementType5DirectionOfTravelAndDirectionOfTravelAccuracy({
            returnValue,
            requestedRequired,
            directionOfTravelAccuracyRequested,
            directionOfTravelAccuracyRequired
        });
    }

    static getDefinition() {
        return defDirectionOfTravelAccuracy;
    }
}

module.exports = ElementType5DirectionOfTravelAndDirectionOfTravelAccuracy;
