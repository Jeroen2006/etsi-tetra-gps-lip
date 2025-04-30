const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const { binaryToBigInt } = require('../../utils');

const defReturnValue = {
    "HORIZONTAL-VELOCITY-REQUIRED": 0,
    "HORIZONTAL-VELOCITY-AND-UNCERTAINTY-REQUIRED": 1,
}

const defRequestedRequired = {
    "NONE": 0,
    "REQUESTED": 1,
    "REQUIRED": 2,
    "REQUESTED-AND-REQUIRED": 3,
}

const defHorizontalVelocityAccuracy = {
    "<1,5KM/U": 0,
    "<3KM/U": 1,
    "<6KM/U": 2,
    "<12KM/U": 3,
    "<24KM/U": 4,
    "<48KM/U": 5,
    "<96KM/U": 6,
    "BEST-EFFORT": 7,
}

class ElementType5HorizontalVelocityAndHorizontalVelocityAccuracy extends ElementScaffold {
    constructor({ returnValue, requestedRequired, horizontalVelocityAccuracyRequested, horizontalVelocityAccuracyRequired }) {
        super(5, 0)
        this.elementIdentifier = new ElementType5ElementIdentifier("HORIZONTAL-VELOCITY-AND-ACCURACY");
        
        //check if returnValue is valid
        if(!Object.keys(defReturnValue).includes(returnValue)) throw new Error("Invalid returnValue");
        this.returnValue = returnValue;
        this.returnValueValue = defReturnValue[returnValue];

        //check if requestedRequired is valid
        if(!Object.keys(defRequestedRequired).includes(requestedRequired)) throw new Error("Invalid requestedRequired");
        this.requestedRequired = requestedRequired;
        this.requestedRequiredValue = defRequestedRequired[requestedRequired];

        if(requestedRequired == "REQUESTED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            if(!Object.keys(defHorizontalVelocityAccuracy).includes(horizontalVelocityAccuracyRequested)) throw new Error("Invalid horizontalVelocityAccuracyRequested");
            this.horizontalVelocityAccuracyRequested = horizontalVelocityAccuracyRequested;
            this.horizontalVelocityAccuracyRequestedValue = defHorizontalVelocityAccuracy[horizontalVelocityAccuracyRequested];
        } 

        if(requestedRequired == "REQUIRED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            if(!Object.keys(defHorizontalVelocityAccuracy).includes(horizontalVelocityAccuracyRequired)) throw new Error("Invalid horizontalVelocityAccuracyRequired");
            this.horizontalVelocityAccuracyRequired = horizontalVelocityAccuracyRequired;
            this.horizontalVelocityAccuracyRequiredValue = defHorizontalVelocityAccuracy[horizontalVelocityAccuracyRequired];
        }

        var contentBitstring = this.returnValueValue.toString(2).padStart(1, '0')
        contentBitstring += this.requestedRequiredValue.toString(2).padStart(2, '0')
        if(requestedRequired == "REQUESTED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            contentBitstring += this.horizontalVelocityAccuracyRequestedValue.toString(2).padStart(3, '0')
        }
        if(requestedRequired == "REQUIRED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            contentBitstring += this.horizontalVelocityAccuracyRequiredValue.toString(2).padStart(3, '0')
        }

        this.elementLength = new ElementType5ElementLength(contentBitstring.length);
        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();

        const bitString = elementIdentifierBits + elementLengthBits + contentBitstring;
        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        console.log("fromValue", value)
        const returnValueBits = value.slice(0, 1);
        const requestedRequiredBits = value.slice(1, 3);
        
        const returnValueValue = parseInt(returnValueBits, 2);
        const requestedRequiredValue = parseInt(requestedRequiredBits, 2);

        const returnValue = Object.keys(defReturnValue).find(key => defReturnValue[key] === returnValueValue);
        const requestedRequired = Object.keys(defRequestedRequired).find(key => defRequestedRequired[key] === requestedRequiredValue);

        var horizontalVelocityAccuracyRequested = null;
        var horizontalVelocityAccuracyRequired = null;

        if(requestedRequired == "REQUESTED") {
            const horizontalVelocityAccuracyRequestedBits = value.slice(3, 6);
            const horizontalVelocityAccuracyRequestedValue = parseInt(horizontalVelocityAccuracyRequestedBits, 2);
            horizontalVelocityAccuracyRequested = Object.keys(defHorizontalVelocityAccuracy).find(key => defHorizontalVelocityAccuracy[key] === horizontalVelocityAccuracyRequestedValue);
        } else if(requestedRequired == "REQUIRED") {
            const horizontalVelocityAccuracyRequiredBits = value.slice(3, 6);
            const horizontalVelocityAccuracyRequiredValue = parseInt(horizontalVelocityAccuracyRequiredBits, 2);
            horizontalVelocityAccuracyRequired = Object.keys(defHorizontalVelocityAccuracy).find(key => defHorizontalVelocityAccuracy[key] === horizontalVelocityAccuracyRequiredValue);
        } else if(requestedRequired == "REQUESTED-AND-REQUIRED") {
            const horizontalVelocityAccuracyRequestedBits = value.slice(3, 6);
            const horizontalVelocityAccuracyRequestedValue = parseInt(horizontalVelocityAccuracyRequestedBits, 2);
            horizontalVelocityAccuracyRequested = Object.keys(defHorizontalVelocityAccuracy).find(key => defHorizontalVelocityAccuracy[key] === horizontalVelocityAccuracyRequestedValue);

            const horizontalVelocityAccuracyRequiredBits = value.slice(6, 9);
            const horizontalVelocityAccuracyRequiredValue = parseInt(horizontalVelocityAccuracyRequiredBits, 2);
            horizontalVelocityAccuracyRequired = Object.keys(defHorizontalVelocityAccuracy).find(key => defHorizontalVelocityAccuracy[key] === horizontalVelocityAccuracyRequiredValue);
        }

        //console.log("returnValue", returnValue, "requestedRequired", requestedRequired, "horizontalVelocityAccuracyRequested", horizontalVelocityAccuracyRequested, "horizontalVelocityAccuracyRequired", horizontalVelocityAccuracyRequired)

        return new ElementType5HorizontalVelocityAndHorizontalVelocityAccuracy({
            returnValue,
            requestedRequired,
            horizontalVelocityAccuracyRequested,
            horizontalVelocityAccuracyRequired
        });
    }

    static getDefinition() {
        return defHorizontalVelocityAccuracy;
    }
}

module.exports = ElementType5HorizontalVelocityAndHorizontalVelocityAccuracy;
