const ElementPduType = require("../elements/PduType");
const ElementPduTypeExtension = require("../elements/PduTypeExtension");
const ElementReportType = require("../elements/ReportType");
const ElementLocationReportingEnableFlags = require("../elements/LocationReportingEnableFlags");

const { hexToBinaryString, binaryToHex } = require("../utils");
const { parseType5Elements } = require("../type5parser");

class PduLocationReportingEnableDisableRequest {
    constructor({
        acknowledgementRequest = false,
        globalEnable = false,
        backlogRecording = false,
        type5Elements = []
    } = {}) {
        this.pduType = new ElementPduType("LOCATION-PROTOCOL-PDU-WITH-EXTENSION");
        this.pduTypeExtension = new ElementPduTypeExtension("LOCATION-REPORTING-ENABLE-DISABLE-REQUEST-RESPONSE");

        this.requestResponse = "0" //request
        this.acknowledgementRequestValue = acknowledgementRequest ? "1" : "0";
        this.locationReportingEnableFlags = new ElementLocationReportingEnableFlags({ globalEnable, backlogRecording });

        this.type5Elements = type5Elements;
    }

    static fromData(data) {
        var binaryString = hexToBinaryString(data);

        const pduTypeValue = binaryString.slice(0, 2);
        const { pduType } = ElementPduType.fromValue(pduTypeValue);

        const pduTypeExtensionValue = binaryString.slice(2, 6);
        const { pduTypeExtension } = ElementPduTypeExtension.fromValue(pduTypeExtensionValue);

        //check if pduType and pduTypeExtension are valid
        if(pduType != "LOCATION-PROTOCOL-PDU-WITH-EXTENSION"){
            throw new Error(`Invalid PDU Type: ${pduType}`);
        }

        if(pduTypeExtension != "LOCATION-REPORTING-ENABLE-DISABLE-REQUEST-RESPONSE"){
            throw new Error(`Invalid PDU Type Extension: ${pduTypeExtension}`);
        }

        const requestResponseValue = binaryString.slice(6, 7);
        const acknowledgementRequestValue = binaryString.slice(7, 8);
        const locationReportingEnableFlagsValue = binaryString.slice(8, 16);
        

        const requestResponse = requestResponseValue == "1" ? true : false;
        const acknowledgementRequest = acknowledgementRequestValue == "1" ? true : false;
        const { globalEnable, backlogRecording } = ElementLocationReportingEnableFlags.fromValue(locationReportingEnableFlagsValue);

        const type5Elements = parseType5Elements(binaryString.slice(16));

        return new PduLocationReportingEnableDisableRequest({
            acknowledgementRequest,
            globalEnable,
            backlogRecording,
            type5Elements
        });
    }

    toData(){
        const pduType = this.pduType.toBinary();
        const pduTypeExtension = this.pduTypeExtension.toBinary();
        const requestResponse = this.requestResponse;
        const acknowledgementRequest = this.acknowledgementRequestValue;
        const locationReportingEnableFlags = this.locationReportingEnableFlags.toBinary();

        const type5Elements = this.type5Elements.map(element => element.toBinary()).join("");
        const binaryString = pduType + pduTypeExtension + requestResponse + acknowledgementRequest + locationReportingEnableFlags + type5Elements;
        const hexString = binaryToHex(binaryString);

        return hexString;
    }
}
module.exports = PduLocationReportingEnableDisableRequest;