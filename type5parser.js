const ElementType5ElementIdentifier = require('./elements/type-5/Type5ElementIdentifier');
const ElementType5ElementLength = require('./elements/type-5/Type5ElementLength');

const ElementType5MaximumInformationAge = require('./elements/type-5/Type5MaximumInformationAge');
const ElementType5MaximumResponseTime = require('./elements/type-5/Type5MaximumResponseTime');
const ElementType5ResultCode = require('./elements/type-5/Type5ResultCode');
const ElementType5DefaultEnableDisableLifetime = require('./elements/type-5/Type5DefaultEnableDisableLifetime');
const ElementType5RequestPriority = require('./elements/type-5/Type5RequestPriority');
const ElementType5StartTime = require('./elements/type-5/Type5StartTime');
const ElementType5StopTime = require('./elements/type-5/Type5StopTime');
const ElementType5StatusValue = require('./elements/type-5/Type5StatusValue');
const ElementType5TerminalOrLocationIdentification = require('./elements/type-5/Type5TerminalOrLocationIdentification');
const ElementType5LocationInformationDestination = require('./elements/type-5/Type5LocationInformationDestination');
const ElementType5LocationMessageReference = require('./elements/type-5/Type5LocationMessageReference');
const ElementType5SDSType1Value = require('./elements/type-5/Type5SDSType1Value');
const ElementType5TriggerDefinition = require('./elements/type-5/Type5TriggerDefinition');
const ElementType5TriggerRemoval = require('./elements/type-5/Type5TriggerRemoval');
const ElementType5DirectionOfTravelAndDirectionOfTravelAccuracy = require('./elements/type-5/Type5DirectionOfTravelAndDirectionOfTravelAccuracy');
const ElementType5LocationAltitudeAndLocationAltitudeAccuracy = require('./elements/type-5/Type5LocationAltitudeAndLocationAltitudeAccuracy');
const ElementType5HorizontalVelocityAndHorizontalVelocityAccuracy = require('./elements/type-5/Type5HorizontalVelocityAndHorizontalVelocityAccuracy');
const ElementType5HorizontalPositionAndHorizontalPositionAccuracy = require('./elements/type-5/Type5HorizontalPositionAndHorizontalPositionAccuracy');

function parseType5Elements(data){
    const elements = [];

    //if data is all zeros (length can variate), return empty array

    while(data.length > 0){
        const bits = data.split("");
        const allZeros = bits.every(bit => bit === "0");
        if (allZeros) return elements;

        const elementIdentifierBits = data.slice(0, 5);
        const { elementIdentifier } = ElementType5ElementIdentifier.fromValue(elementIdentifierBits);

        const elementLengthBits = data.slice(5, 18);
        const { elementLength } = ElementType5ElementLength.fromValue(elementLengthBits);

        var elementBits;
        if (elementLength > 63) elementBits = data.slice(18, 18 + elementLength);
        if (elementLength <= 63) elementBits = data.slice(11, 11 + elementLength);

        if(elementBits.length < elementLength) {
            console.error(`Element length mismatch: expected ${elementLength}, got ${elementBits.length}`);
            break;
        }

        var element;
        switch(elementIdentifier) {
            case "MAXIMUM-INFORMATION-AGE":
                element = ElementType5MaximumInformationAge.fromValue(elementBits);
                break;
            case "MAXIMUM-RESPONSE-TIME":
                element = ElementType5MaximumResponseTime.fromValue(elementBits);
                break;
            case "RESULT-CODE":
                element = ElementType5ResultCode.fromValue(elementBits);
                break;
            case "DEFAULT-ENABLE-DISABLE-LIFETIME":
                element = ElementType5DefaultEnableDisableLifetime.fromValue(elementBits);
                break;
            case "REQUEST-PRIORITY":
                element = ElementType5RequestPriority.fromValue(elementBits);
                break;
            case "START-TIME":
                element = ElementType5StartTime.fromValue(elementBits);
                break;
            case "STOP-TIME":
                element = ElementType5StopTime.fromValue(elementBits);
                break;
            case "STATUS-VALUE":
                element = ElementType5StatusValue.fromValue(elementBits);
                break;
            case "TERMINAL-OR-LOCATION-IDENTIFICATION":
                element = ElementType5TerminalOrLocationIdentification.fromValue(elementBits);
                break;
            case "LOCATION-INFORMATION-DESTINATION":
                element = ElementType5LocationInformationDestination.fromValue(elementBits);
                break;
            case "LOCATION-MESSAGE-REFERENCE":
                element = ElementType5LocationMessageReference.fromValue(elementBits);
                break;
            case "SDS-TYPE-1-VALUE":
                element = ElementType5SDSType1Value.fromValue(elementBits);
                break;
            case "TRIGGER-DEFINITION":
                element = ElementType5TriggerDefinition.fromValue(elementBits);
                break;  
            case "TRIGGER-REMOVAL":
                element = ElementType5TriggerRemoval.fromValue(elementBits);
                break;
            case "DIRECTION-OF-TRAVEL-AND-ACCURACY":
                element = ElementType5DirectionOfTravelAndDirectionOfTravelAccuracy.fromValue(elementBits);
                break;
            case "LOCATION-ALTITUDE-AND-ACCURACY":
                element = ElementType5LocationAltitudeAndLocationAltitudeAccuracy.fromValue(elementBits);
                break;
            case "HORIZONTAL-VELOCITY-AND-ACCURACY":
                element = ElementType5HorizontalVelocityAndHorizontalVelocityAccuracy.fromValue(elementBits);
                break;
            case "HORIZONTAL-POSITION-AND-ACCURACY":
                element = ElementType5HorizontalPositionAndHorizontalPositionAccuracy.fromValue(elementBits);
                break;
            case "EXTENDED-TYPE-5-ELEMENT":
                // Handle extended type 5 elements here
                throw new Error("Extended Type 5 Elements are not supported yet.");
            default:
                element = undefined;
                console.error(`Unsupported element identifier: ${elementIdentifier}`);
                break;
        }

        var elementLengthBitsLength = 6
        if (elementLength > 63) elementLengthBitsLength = 13;

        data = data.slice(5 + elementLengthBitsLength + elementLength);
        if(element) {
            elements.push(element);
        }
    }

    return elements;
}

module.exports = {
    parseType5Elements
}