const ElementPduType = require("../elements/PduType");
const ElementPduTypeExtension = require("../elements/PduTypeExtension");
const ElementReportType = require("../elements/ReportType");
const ElementLocationReportingEnableFlags = require("../elements/LocationReportingEnableFlags");

const { hexToBinaryString, binaryToHex } = require("../utils");
const { parseType5Elements } = require("../type5parser");

class PduLocationReportingEnableDisableResponse {
    constructor({
        globalEnable = false,
        backlogRecording = false,
        type5Elements = []
    } = {}) {
        this.pduType = new ElementPduType("LOCATION-PROTOCOL-PDU-WITH-EXTENSION");
        this.pduTypeExtension = new ElementPduTypeExtension("LOCATION-REPORTING-ENABLE-DISABLE-REQUEST-RESPONSE");

        this.requestResponse = "1" //response
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
        const locationReportingEnableFlagsValue = binaryString.slice(7, 15);
        

        const requestResponse = requestResponseValue == "1" ? true : false;
        const { globalEnable, backlogRecording } = ElementLocationReportingEnableFlags.fromValue(locationReportingEnableFlagsValue);

        const type5Elements = parseType5Elements(binaryString.slice(15));

        return new PduLocationReportingEnableDisableResponse({
            globalEnable,
            backlogRecording,
            type5Elements
        });
    }

    toData(){
        const pduType = this.pduType.toBinary();
        const pduTypeExtension = this.pduTypeExtension.toBinary();
        const requestResponse = this.requestResponse;
        const locationReportingEnableFlags = this.locationReportingEnableFlags.toBinary();

        const type5Elements = this.type5Elements.map(element => element.toBinary()).join("");
        const binaryString = pduType + pduTypeExtension + requestResponse + locationReportingEnableFlags + type5Elements;
        const hexString = binaryToHex(binaryString);

        return hexString;
    }
}
module.exports = PduLocationReportingEnableDisableResponse;