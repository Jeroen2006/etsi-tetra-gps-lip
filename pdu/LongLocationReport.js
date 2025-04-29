const ElementPduType = require("../elements/PduType");
const ElementPduTypeExtension = require("../elements/PduTypeExtension");

const ElementTimeType = require("../elements/time-data/TimeType");
const ElementTimeOfPosition = require("../elements/time-data/TimeOfPosition");
const ElementTimeElapsed = require("../elements/time-data/TimeElapsed");
const ElementTypeOfAdditionalData = require("../elements/TypeOfAdditionalData");
const ElementReasonForSending = require("../elements/ReasonForSending");

const ElementLocationShape = require("../elements/location-data/LocationShape");
const ElementLocationEllipseWithAltitudeAndUncertainty = require("../elements/location-data/LocationEllipseWithAltitudeAndUncertainty");
const ElementLocationEllipseWithAltitude = require("../elements/location-data/LocationEllipseWithAltitude");
const ElementLocationEllipse = require("../elements/location-data/LocationEllipse");
const ElementLocationPoint = require("../elements/location-data/LocationPoint");
const ElementLocationPointWithAltitude = require("../elements/location-data/LocationPointWithAltitude");
const ElementLocationPointAndPositionError = require("../elements/location-data/LocationPointAndPositionError");
const ElementLocationCircle = require("../elements/location-data/LocationCircle");
const ElementLocationCircleWithAltitude = require("../elements/location-data/LocationCircleWithAltitude");
const ElementLocationCircleWithAltitudeAndUncertainty = require("../elements/location-data/LocationCircleWithAltitudeAndUncertainty");
const ElementLocationArc = require("../elements/location-data/LocationArc");

const ElementVelocityType = require("../elements/velocity-data/VelocityType");
const ElementHorizontalVelocity = require("../elements/velocity-data/HorizontalVelocity");
const ElementHorizontalVelocityWithUncertainty = require("../elements/velocity-data/HorizontalVelocityWithUncertainty");
const ElementHorizontalAndVerticalVelocity = require("../elements/velocity-data/HorizontalAndVerticalVelocity");
const ElementHorizontalAndVerticalVelocityWithUncertainty = require("../elements/velocity-data/HorizontalAndVerticalVelocityWithUncertainty");
const ElementHorizontalVelocityWithDirectionOfTravelExtended = require("../elements/velocity-data/HorizontalVelocityWithDirectionOfTravelExtended");
const ElementHorizontalVelocityWithDirectionOfTravelExtendedAndUncertainty = require("../elements/velocity-data/HorizontalVelocityWithDirectionOfTravelExtendedAndUncertainty");
const ElementHorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty = require("../elements/velocity-data/HorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty");

const { hexToBinaryString, binaryToHex } = require("../utils");
const { parseType5Elements } = require("../type5parser");

class PduLongLocationReport {
    constructor({   
        timeData = null, // This will be an instance of ElementTimeOfPosition or ElementTimeElapsed
        locationData = null, // This will be an instance of ElementLocationEllipseWithAltitudeAndUncertainty, ElementLocationEllipseWithAltitude, ElementLocationEllipse, ElementLocationPoint, ElementLocationPointWithAltitude, ElementLocationPointAndPositionError, ElementLocationCircle, ElementLocationCircleWithAltitude, ElementLocationCircleWithAltitudeAndUncertainty, or ElementLocationArc
        velocityData = null, // This will be an instance of ElementHorizontalVelocity, ElementHorizontalVelocityWithUncertainty, ElementHorizontalAndVerticalVelocity, ElementHorizontalAndVerticalVelocityWithUncertainty, ElementHorizontalVelocityWithDirectionOfTravelExtended, ElementHorizontalVelocityWithDirectionOfTravelExtendedAndUncertainty, or ElementHorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty
        acknowledgementRequest = false, // This will be an instance of boolean
        reasonForSending = "RESPONSE-TO-IMMEDIATE-REQUEST",
        type5Elements = [],
    } = {}) {
        this.pduType = new ElementPduType("LOCATION-PROTOCOL-PDU-WITH-EXTENSION");
        this.pduTypeExtension = new ElementPduTypeExtension("LONG-LOCATION-REPORT");
        
        if(timeData != null && timeData != undefined && timeData != ""){
            if (timeData instanceof ElementTimeOfPosition || timeData instanceof ElementTimeElapsed) {
                this.timeData = timeData;
            } else {
                throw new Error("Invalid timeData type. Must be an instance of ElementTimeOfPosition or ElementTimeElapsed.");
            }
        }

        if(locationData != null && locationData != undefined && locationData != ""){
            if (locationData instanceof ElementLocationEllipseWithAltitudeAndUncertainty ||
                locationData instanceof ElementLocationEllipseWithAltitude ||
                locationData instanceof ElementLocationEllipse ||
                locationData instanceof ElementLocationPoint ||
                locationData instanceof ElementLocationPointWithAltitude ||
                locationData instanceof ElementLocationPointAndPositionError ||
                locationData instanceof ElementLocationCircle ||
                locationData instanceof ElementLocationCircleWithAltitude ||
                locationData instanceof ElementLocationCircleWithAltitudeAndUncertainty ||
                locationData instanceof ElementLocationArc) {
                this.locationData = locationData;
            } else {
                throw new Error("Invalid locationData type. Must be an instance of ElementLocationEllipseWithAltitudeAndUncertainty, ElementLocationEllipseWithAltitude, ElementLocationEllipse, ElementLocationPoint, ElementLocationPointWithAltitude, ElementLocationPointAndPositionError, ElementLocationCircle, ElementLocationCircleWithAltitude, ElementLocationCircleWithAltitudeAndUncertainty, or ElementLocationArc.");
            }
        }

        if(velocityData != null && velocityData != undefined && velocityData != ""){
            if (velocityData instanceof ElementHorizontalVelocity ||
                velocityData instanceof ElementHorizontalVelocityWithUncertainty ||
                velocityData instanceof ElementHorizontalAndVerticalVelocity ||
                velocityData instanceof ElementHorizontalAndVerticalVelocityWithUncertainty ||
                velocityData instanceof ElementHorizontalVelocityWithDirectionOfTravelExtended ||
                velocityData instanceof ElementHorizontalVelocityWithDirectionOfTravelExtendedAndUncertainty ||
                velocityData instanceof ElementHorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty) {
                this.velocityData = velocityData;
            } else {
                throw new Error("Invalid velocityData type. Must be an instance of ElementHorizontalVelocity, ElementHorizontalVelocityWithUncertainty, ElementHorizontalAndVerticalVelocity, ElementHorizontalAndVerticalVelocityWithUncertainty, ElementHorizontalVelocityWithDirectionOfTravelExtended, ElementHorizontalVelocityWithDirectionOfTravelExtendedAndUncertainty, or ElementHorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty.");
            }
        }

        this.acknowledgementRequest = acknowledgementRequest;

        if(!ElementReasonForSending.isValidReason(reasonForSending)) throw new Error("Invalid reason for sending. Must be a valid value.");
        this.reasonForSending = new ElementReasonForSending(reasonForSending);

        this.type5Elements = type5Elements;
    }

    friendly(){
        var timeData = null;
        if(this.timeData instanceof ElementTimeOfPosition){
            timeData = {
                type: "TIME-OF-POSITION",
                day: this.timeData.day,
                hour: this.timeData.hour,
                minute: this.timeData.minute,
                second: this.timeData.second
            }
        } else if (this.timeData instanceof ElementTimeElapsed){
            timeData = {
                type: "TIME-ELAPSED",
                timeElapsed: this.timeData.timeElapsed
            }
        }

        return {
            time: timeData
        }
    }

    static fromData(data) {
        var binaryString = hexToBinaryString(data);
        var bitCounter = 8

        const pduTypeValue = binaryString.slice(0, 2);
        const { pduType } = ElementPduType.fromValue(pduTypeValue);

        const pduTypeExtensionValue = binaryString.slice(2, 6);
        const { pduTypeExtension } = ElementPduTypeExtension.fromValue(pduTypeExtensionValue);

        var timeData;
        const timeTypeValue = binaryString.slice(6, 8);
        const { timeType } = ElementTimeType.fromValue(timeTypeValue);

        if(timeType === "TIME-OF-POSITION"){
            const timeDataValue = binaryString.slice(bitCounter, bitCounter + 22);
            timeData = ElementTimeOfPosition.fromValue(timeDataValue);
            bitCounter += 22;
        } else if (timeType === "TIME-ELAPSED"){
            const timeDataValue = binaryString.slice(bitCounter, bitCounter + 2);
            timeData = ElementTimeElapsed.fromValue(timeDataValue);
            bitCounter += 2;
        }

        var locationData;
        const locationShapeValue = binaryString.slice(bitCounter, bitCounter + 4);
        const { locationShape } = ElementLocationShape.fromValue(locationShapeValue);

        if(locationShape === "NO-SHAPE"){      
            bitCounter += 4;  
        } else if(locationShape === "LOCATION-ELLIPSE-WITH-ALTITUDE-AND-UNCERTAINTY"){
            const locationDataValue = binaryString.slice(bitCounter, bitCounter + 91);
            locationData = ElementLocationEllipseWithAltitudeAndUncertainty.fromValue(locationDataValue);
            bitCounter += 91;
        } else if (locationShape === "LOCATION-ELLIPSE-WITH-ALTITUDE"){
            const locationDataValue = binaryString.slice(bitCounter, bitCounter + 88);
            locationData = ElementLocationEllipseWithAltitude.fromValue(locationDataValue);
            bitCounter += 88;
        } else if (locationShape === "LOCATION-ELLIPSE"){
            const locationDataValue = binaryString.slice(bitCounter, bitCounter + 76);
            locationData = ElementLocationEllipse.fromValue(locationDataValue);
            bitCounter += 76;
        } else if (locationShape === "LOCATION-POINT"){
            const locationDataValue = binaryString.slice(bitCounter, bitCounter + 53);
            locationData = ElementLocationPoint.fromValue(locationDataValue);
            bitCounter += 53;
        } else if (locationShape === "LOCATION-POINT-WITH-ALTITUDE"){
            const locationDataValue = binaryString.slice(bitCounter, bitCounter + 65);
            locationData = ElementLocationPointWithAltitude.fromValue(locationDataValue);
            bitCounter += 65;
        } else if (locationShape === "LOCATION-POINT-AND-POSITION-ERROR"){
            const locationDataValue = binaryString.slice(bitCounter, bitCounter + 56);
            locationData = ElementLocationPointAndPositionError.fromValue(locationDataValue);
            bitCounter += 56;
        } else if (locationShape === "LOCATION-CIRCLE"){
            const locationDataValue = binaryString.slice(bitCounter, bitCounter + 59);
            locationData = ElementLocationCircle.fromValue(locationDataValue);
            bitCounter += 59;
        } else if (locationShape === "LOCATION-CIRCLE-WITH-ALTITUDE"){
            const locationDataValue = binaryString.slice(bitCounter, bitCounter + 71);
            locationData = ElementLocationCircleWithAltitude.fromValue(locationDataValue);
            bitCounter += 71;
        } else if (locationShape === "LOCATION-CIRCLE-WITH-ALTITUDE-AND-UNCERTAINTY"){
            const locationDataValue = binaryString.slice(bitCounter, bitCounter + 74);
            locationData = ElementLocationCircleWithAltitudeAndUncertainty.fromValue(locationDataValue);
            bitCounter += 74;
        } else if (locationShape === "LOCATION-ARC"){
            const locationDataValue = binaryString.slice(bitCounter, bitCounter + 104);
            locationData = ElementLocationArc.fromValue(locationDataValue);
            bitCounter += 104;
        } else {
            throw new Error(`Unknown location shape: ${locationShape}`);
        } 

        var velocityData;
        const velocityTypeValue = binaryString.slice(bitCounter, bitCounter + 3);
        const { velocityType } = ElementVelocityType.fromValue(velocityTypeValue);
        if(velocityType === "NO-VELOCITY-INFORMATION"){
            bitCounter += 3;
        } else if (velocityType === "HORIZONTAL-VELOCITY"){
            const velocityDataValue = binaryString.slice(bitCounter, bitCounter + 10);
            velocityData = ElementHorizontalVelocity.fromValue(velocityDataValue);
            bitCounter += 10;
        } else if (velocityType === "HORIZONTAL-VELOCITY-WITH-UNCERTAINTY"){
            const velocityDataValue = binaryString.slice(bitCounter, bitCounter + 13);
            velocityData = ElementHorizontalVelocityWithUncertainty.fromValue(velocityDataValue);
            bitCounter += 13;
        } else if (velocityType === "HORIZONTAL-AND-VERTICAL-VELOCITY"){
            const velocityDataValue = binaryString.slice(bitCounter, bitCounter + 18);
            velocityData = ElementHorizontalAndVerticalVelocity.fromValue(velocityDataValue);
            bitCounter += 18;
        } else if (velocityType === "HORIZONTAL-AND-VERTICAL-VELOCITY-WITH-UNCERTAINTY"){
            const velocityDataValue = binaryString.slice(bitCounter, bitCounter + 24);
            velocityData = ElementHorizontalAndVerticalVelocityWithUncertainty.fromValue(velocityDataValue);
            bitCounter += 24;
        } else if (velocityType === "HORIZONTAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED"){
            const velocityDataValue = binaryString.slice(bitCounter, bitCounter + 18);
            velocityData = ElementHorizontalVelocityWithDirectionOfTravelExtended.fromValue(velocityDataValue);
            bitCounter += 18;
        } else if (velocityType === "HORIZONTAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED-AND-UNCERTAINTY"){
            const velocityDataValue = binaryString.slice(bitCounter, bitCounter + 24);
            velocityData = ElementHorizontalVelocityWithDirectionOfTravelExtendedAndUncertainty.fromValue(velocityDataValue);
            bitCounter += 24;
        } else if (velocityType === "HORIZONTAL-AND-VERTICAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED-AND-UNCERTAINTY"){
            const velocityDataValue = binaryString.slice(bitCounter, bitCounter + 35);
            velocityData = ElementHorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty.fromValue(velocityDataValue);
            bitCounter += 35;
        } else {
            throw new Error(`Unknown velocity type: ${velocityType}`);
        }

        const acknowledgementRequestValue = binaryString.slice(bitCounter, bitCounter + 1);
        const acknowledgementRequest = acknowledgementRequestValue === "1" ? true : false;
        bitCounter += 1;

        const typeOfAdditionalDataValue = binaryString.slice(bitCounter, bitCounter + 1);
        const { TypeOfAdditionalData } = ElementTypeOfAdditionalData.fromValue(typeOfAdditionalDataValue);
        if(TypeOfAdditionalData != "REASON-FOR-SENDING") throw new Error("Invalid TypeOfAdditionalData. Must be REASON-FOR-SENDING.");
        bitCounter += 1;

        const reasonForSendingValue = binaryString.slice(bitCounter, bitCounter + 8);
        const { reasonForSending } = ElementReasonForSending.fromValue(reasonForSendingValue);
        bitCounter += 8;

        const type5Elements = parseType5Elements(binaryString.slice(bitCounter));

        return new PduLongLocationReport({
            timeData,
            locationData,
            velocityData,
            acknowledgementRequest,
            reasonForSending,
            type5Elements
        });
    }

    toData(){
        var binaryString =  this.pduType.toBinary();
        binaryString += this.pduTypeExtension.toBinary();

        if(this.timeData != null) binaryString += this.timeData.toBinary();
        if(this.timeData == null) binaryString += "00" // No time information
        
        if(this.locationData != null) binaryString += this.locationData.toBinary();
        if(this.locationData == null) binaryString += "0000" // No location information

        if(this.velocityData != null) binaryString += this.velocityData.toBinary();
        if(this.velocityData == null) binaryString += "000" // No velocity information

        binaryString += this.acknowledgementRequest ? "1" : "0";
        binaryString += new ElementTypeOfAdditionalData("REASON-FOR-SENDING").toBinary();
        binaryString += this.reasonForSending.toBinary();

        for(const type5Element of this.type5Elements){
            binaryString += type5Element.toBinary();
        }

        console.log(binaryString)
        
        const hexString = binaryToHex(binaryString);

        return hexString;
    }
}
module.exports = PduLongLocationReport;