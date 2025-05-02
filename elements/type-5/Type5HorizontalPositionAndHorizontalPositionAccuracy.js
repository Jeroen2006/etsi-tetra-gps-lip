const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const { metersToString, binaryToBigInt } = require('../../utils');

const A = 2;
const x = 0.2;
const B = 5;
const C = -4;

const defHorizontalPositionAccuracy = {
    63: "Best effort",
};

for (let i = 0; i < 63; i++) {
    const meters = Math.round(A * Math.pow(1 + x, i + B) + C);
    defHorizontalPositionAccuracy[i] = `<${metersToString(meters)}`
}

const defReturnValue = {
    "HORIZONTAL-POSITION-REQUIRED": 0,
    "HORIZONTAL-POSITION-AND-UNCERTAINTY-REQUIRED": 1,
}

const defPreferredShape = {
    "CIRCLE-SHAPE-PREFERRED": 0,
    "ELLIPSE-OR-OTHER-SHAPE-ALLOWED": 1,
}

const defRequestedRequired = {
    "NONE": 0,
    "REQUESTED": 1,
    "REQUIRED": 2,
    "REQUESTED-AND-REQUIRED": 3,
}

class ElementType5HorizontalPositionAndHorizontalPositionAccuracy extends ElementScaffold {
    constructor({ returnValue, preferredShape, requestedRequired, horizontalPositionAccuracyRequested, horizontalPositionAccuracyRequired }) {
        super(5, 0)
        this.elementIdentifier = new ElementType5ElementIdentifier("HORIZONTAL-POSITION-AND-ACCURACY");
        
        //check if returnValue is valid
        if(!Object.keys(defReturnValue).includes(returnValue)) throw new Error("Invalid returnValue");
        this.returnValue = returnValue;
        this.returnValueValue = defReturnValue[returnValue];

        //check if preferredShape is valid
        if(!Object.keys(defPreferredShape).includes(preferredShape)) throw new Error("Invalid preferredShape");
        this.preferredShape = preferredShape;
        this.preferredShapeValue = defPreferredShape[preferredShape];

        //check if requestedRequired is valid
        if(!Object.keys(defRequestedRequired).includes(requestedRequired)) throw new Error("Invalid requestedRequired");
        this.requestedRequired = requestedRequired;
        this.requestedRequiredValue = defRequestedRequired[requestedRequired];

        if(requestedRequired == "REQUESTED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            if(!Object.values(defHorizontalPositionAccuracy).includes(horizontalPositionAccuracyRequested)) throw new Error("Invalid horizontalPositionAccuracyRequested");
            this.horizontalPositionAccuracyRequested = horizontalPositionAccuracyRequested;
            this.horizontalPositionAccuracyRequestedValue = Object.keys(defHorizontalPositionAccuracy).find(key => defHorizontalPositionAccuracy[key] === horizontalPositionAccuracyRequested);
        } 

        if(requestedRequired == "REQUIRED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            if(!Object.values(defHorizontalPositionAccuracy).includes(horizontalPositionAccuracyRequired)) throw new Error("Invalid horizontalPositionAccuracyRequired");
            this.horizontalPositionAccuracyRequired = horizontalPositionAccuracyRequired;
            this.horizontalPositionAccuracyRequiredValue = Object.keys(defHorizontalPositionAccuracy).find(key => defHorizontalPositionAccuracy[key] === horizontalPositionAccuracyRequired);
        }

        var contentBitstring = this.returnValueValue.toString(2).padStart(1, '0')
        contentBitstring += this.preferredShapeValue.toString(2).padStart(1, '0')
        contentBitstring += this.requestedRequiredValue.toString(2).padStart(2, '0')
        if(requestedRequired == "REQUESTED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            contentBitstring += parseInt(this.horizontalPositionAccuracyRequestedValue).toString(2).padStart(6, '0')
        }
        if(requestedRequired == "REQUIRED" || requestedRequired == "REQUESTED-AND-REQUIRED") {
            contentBitstring += parseInt(this.horizontalPositionAccuracyRequiredValue).toString(2).padStart(6, '0')
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
        const preferredShapeBits = value.slice(1, 2);
        const requestedRequiredBits = value.slice(2, 4);
        
        const returnValueValue = parseInt(returnValueBits, 2);
        const preferredShapeValue = parseInt(preferredShapeBits, 2);
        const requestedRequiredValue = parseInt(requestedRequiredBits, 2);

        const returnValue = Object.keys(defReturnValue).find(key => defReturnValue[key] === returnValueValue);
        const preferredShape = Object.keys(defPreferredShape).find(key => defPreferredShape[key] === preferredShapeValue);
        const requestedRequired = Object.keys(defRequestedRequired).find(key => defRequestedRequired[key] === requestedRequiredValue);

        var horizontalPositionAccuracyRequested = null;
        var horizontalPositionAccuracyRequired = null;

        if(requestedRequired == "REQUESTED") {
            const horizontalPositionAccuracyRequestedBits = value.slice(4, 10);
            const horizontalPositionAccuracyRequestedValue = parseInt(horizontalPositionAccuracyRequestedBits, 2);
            horizontalPositionAccuracyRequested = defHorizontalPositionAccuracy[horizontalPositionAccuracyRequestedValue];
        } else if(requestedRequired == "REQUIRED") {
            const horizontalPositionAccuracyRequiredBits = value.slice(4, 10);
            const horizontalPositionAccuracyRequiredValue = parseInt(horizontalPositionAccuracyRequiredBits, 2);
            horizontalPositionAccuracyRequired = defHorizontalPositionAccuracy[horizontalPositionAccuracyRequiredValue];
        } else if(requestedRequired == "REQUESTED-AND-REQUIRED") {
            const horizontalPositionAccuracyRequestedBits = value.slice(4, 10);
            const horizontalPositionAccuracyRequestedValue = parseInt(horizontalPositionAccuracyRequestedBits, 2);
            horizontalPositionAccuracyRequested = defHorizontalPositionAccuracy[horizontalPositionAccuracyRequestedValue];

            const horizontalPositionAccuracyRequiredBits = value.slice(10, 16);
            const horizontalPositionAccuracyRequiredValue = parseInt(horizontalPositionAccuracyRequiredBits, 2);
            horizontalPositionAccuracyRequired = defHorizontalPositionAccuracy[horizontalPositionAccuracyRequiredValue];
        }

        console.log("returnValue", returnValueValue, "requestedRequired", requestedRequired, "horizontalPositionAccuracyRequested", horizontalPositionAccuracyRequested, "horizontalPositionAccuracyRequired", horizontalPositionAccuracyRequired)

        return new ElementType5HorizontalPositionAndHorizontalPositionAccuracy({
            returnValue,
            preferredShape,
            requestedRequired,
            horizontalPositionAccuracyRequested,
            horizontalPositionAccuracyRequired
        });
    }

    static getDefinition() {
        return defHorizontalPositionAccuracy;
    }
}

module.exports = ElementType5HorizontalPositionAndHorizontalPositionAccuracy;
