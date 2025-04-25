const ElementPduType = require("../elements/PduType");
const ElementTimeElapsed = require("../elements/TimeElapsed");
const ElementLongitude = require("../elements/Longitude");
const ElementLatitude = require("../elements/Latitude");
const ElementPositionError = require("../elements/PositionError");
const ElementHorizontalVelocity = require("../elements/HorizontalVelocity");
const ElementDirectionOfTravel = require("../elements/DirectionOfTravel");
const ElementTypeOfAdditionalData = require("../elements/TypeOfAdditionalData");
const ElementReasonForSending = require("../elements/ReasonForSending");

const { hexToBinaryString, binaryToHex } = require("../utils");

class PduShortLocationReport {
    constructor({   
        timeElapsed = "<5s", 
        longitude = 0, 
        latitude = 0, 
        positionError = "<2m", 
        horizontalVelocity, 
        directionOfTravel = "N", 
        TypeOfAdditionalData = "REASON-FOR-SENDING", 
        reasonForSending = "RESPONSE-TO-IMMEDIATE-REQUEST" 
    } = {}) {
        this.pduType = new ElementPduType("SHORT-LOCATION-REPORT");
        this.timeElapsed = new ElementTimeElapsed(timeElapsed);
        this.longitude = new ElementLongitude(longitude);  
        this.latitude = new ElementLatitude(latitude);
        this.positionError = new ElementPositionError(positionError);
        this.horizontalVelocity = new ElementHorizontalVelocity(horizontalVelocity);
        this.directionOfTravel = new ElementDirectionOfTravel(directionOfTravel);
        this.typeOfAdditionalData = new ElementTypeOfAdditionalData(TypeOfAdditionalData);
        this.reasonForSending = new ElementReasonForSending(reasonForSending);
    }

    static fromData(data) {
        var binaryString = hexToBinaryString(data);

        const pduTypeValue = binaryString.slice(0, 2);
        const { pduType } = ElementPduType.fromValue(pduTypeValue);

        const timeElapsedValue = binaryString.slice(2, 4);
        const { timeElapsed } = ElementTimeElapsed.fromValue(timeElapsedValue);

        const longitudeValue = binaryString.slice(4, 29);
        const { longitude } = ElementLongitude.fromValue(longitudeValue);

        const latitudeValue = binaryString.slice(29, 53);
        const { latitude } = ElementLatitude.fromValue(latitudeValue);

        const positionErrorValue = binaryString.slice(53, 56);
        const { positionError } = ElementPositionError.fromValue(positionErrorValue);

        const horizontalVelocityValue = binaryString.slice(56, 63);
        const { horizontalVelocity } = ElementHorizontalVelocity.fromValue(horizontalVelocityValue);

        const directionOfTravelValue = binaryString.slice(63, 67);
        const { directionOfTravel } = ElementDirectionOfTravel.fromValue(directionOfTravelValue);

        const typeOfAdditionalDataValue = binaryString.slice(67, 68);
        const { TypeOfAdditionalData } = ElementTypeOfAdditionalData.fromValue(typeOfAdditionalDataValue);

        const reasonForSendingValue = binaryString.slice(68, 76);
        const { reasonForSending } = ElementReasonForSending.fromValue(reasonForSendingValue);

        return new PduShortLocationReport({
            pduType,
            timeElapsed,
            longitude,
            latitude,
            positionError,
            horizontalVelocity,
            directionOfTravel,
            TypeOfAdditionalData,
            reasonForSending
        });
    }

    toData(){
        const pduType = this.pduType.toBinary();
        const timeElapsed = this.timeElapsed.toBinary();
        const longitude = this.longitude.toBinary();
        const latitude = this.latitude.toBinary();
        const positionError = this.positionError.toBinary();
        const horizontalVelocity = this.horizontalVelocity.toBinary();
        const directionOfTravel = this.directionOfTravel.toBinary();
        const typeOfAdditionalData = this.typeOfAdditionalData.toBinary();
        const reasonForSending = this.reasonForSending.toBinary();

        const binaryString = pduType + timeElapsed + longitude + latitude + positionError + horizontalVelocity + directionOfTravel + typeOfAdditionalData + reasonForSending;

        const hexString = binaryToHex(binaryString);

        return hexString;
    }
}
module.exports = PduShortLocationReport;