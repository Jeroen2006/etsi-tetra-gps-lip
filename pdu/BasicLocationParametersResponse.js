const ElementPduType = require("../elements/PduType");
const ElementPduTypeExtension = require("../elements/PduTypeExtension");
const ElementReportType = require("../elements/ReportType");
const ElementMinimumReportingInterval = require("../elements/MinimumReportingInterval");
const ElementResultCode = require("../elements/ResultCode");
const ElementLocationReportingEnableFlags = require("../elements/LocationReportingEnableFlags");

const { hexToBinaryString, binaryToHex } = require("../utils");
const { parseType5Elements } = require("../type5parser");

class PduBasicLocationParametersResponse {
    constructor({
        resultCode = "Success",
        globalEnable = false,
        backlogRecording = false,
        minimumReportingInterval = "10s",
        reportType = "SHORT-LOCATION-REPORT",
        type5Elements = [],
    } = {}) {
        this.pduType = new ElementPduType("LOCATION-PROTOCOL-PDU-WITH-EXTENSION");
        this.pduTypeExtension = new ElementPduTypeExtension("BASIC-LOCATION-PARAMETERS-REQUEST-RESPONSE");

        this.requestResponse = "1" //response
        this.resultCode = new ElementResultCode(resultCode);
        this.locationReportingEnableFlags = new ElementLocationReportingEnableFlags({ globalEnable, backlogRecording });
        this.minimumReportingInterval = new ElementMinimumReportingInterval(minimumReportingInterval);
        this.reportType = new ElementReportType(reportType);

        this.type5Elements = type5Elements
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

        if(pduTypeExtension != "BASIC-LOCATION-PARAMETERS-REQUEST-RESPONSE"){
            throw new Error(`Invalid PDU Type Extension: ${pduTypeExtension}`);
        }

        const requestResponse = binaryString.slice(6, 7);

        const resultCodeBits = binaryString.slice(7, 15);
        const { resultCode } = ElementResultCode.fromValue(resultCodeBits);

        const LocationReportingEnableFlagsBits = binaryString.slice(15, 23);
        const { globalEnable, backlogRecording } = ElementLocationReportingEnableFlags.fromValue(LocationReportingEnableFlagsBits);

        const minimumReportingIntervalBits = binaryString.slice(23, 30);
        const { minimumReportingInterval } = ElementMinimumReportingInterval.fromValue(minimumReportingIntervalBits);

        const reportTypeBits = binaryString.slice(30, 32);
        const { reportType } = ElementReportType.fromValue(reportTypeBits);

        const type5ElementsBits = binaryString.slice(32);
        const type5Elements = parseType5Elements(type5ElementsBits);
        
        return new PduBasicLocationParametersResponse({
            pduType,
            pduTypeExtension,
            requestResponse,
            resultCode,
            globalEnable,
            backlogRecording,
            minimumReportingInterval,
            reportType,
            type5Elements
        });
    }

    toData(){
        const pduType = this.pduType.toBinary();
        const pduTypeExtension = this.pduTypeExtension.toBinary();
        const requestResponse = this.requestResponse;
        const resultCode = this.resultCode.toBinary();
        const locationReportingEnableFlags = this.locationReportingEnableFlags.toBinary();
        const minimumReportingInterval = this.minimumReportingInterval.toBinary();
        const reportType = this.reportType.toBinary();

        const type5Elements = this.type5Elements.map(element => element.toBinary()).join("");
        const binaryString = pduType + pduTypeExtension + requestResponse + resultCode + locationReportingEnableFlags + minimumReportingInterval + reportType + type5Elements;
        const hexString = binaryToHex(binaryString);

        return hexString;
    }
}
module.exports = PduBasicLocationParametersResponse;