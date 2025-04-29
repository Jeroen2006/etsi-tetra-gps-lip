const ElementPduType = require("../elements/PduType");
const ElementPduTypeExtension = require("../elements/PduTypeExtension");
const ElementReportType = require("../elements/ReportType");
const ElementMinimumReportingInterval = require("../elements/MinimumReportingInterval");

const { hexToBinaryString, binaryToHex } = require("../utils");
const { parseType5Elements } = require("../type5parser");

class PduBasicLocationParametersRequest {
    constructor({
        acknowledgementRequest = false,
        minimumReportingInterval = "10s",
        reportType = "SHORT-LOCATION-REPORT",
        type5Elements = []
    } = {}) {
        this.pduType = new ElementPduType("LOCATION-PROTOCOL-PDU-WITH-EXTENSION");
        this.pduTypeExtension = new ElementPduTypeExtension("BASIC-LOCATION-PARAMETERS-REQUEST-RESPONSE");

        this.requestResponse = "0" //request
        this.acknowledgementRequestValue = acknowledgementRequest ? "1" : "0";
        this.minimumReportingInterval = new ElementMinimumReportingInterval(minimumReportingInterval);
        this.reportType = new ElementReportType(reportType);

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

        if(pduTypeExtension != "BASIC-LOCATION-PARAMETERS-REQUEST-RESPONSE"){
            throw new Error(`Invalid PDU Type Extension: ${pduTypeExtension}`);
        }

        const requestResponseValue = binaryString.slice(6, 7);
        const acknowledgementRequestValue = binaryString.slice(7, 8);
        const minimumReportingIntervalValue = binaryString.slice(8, 15);
        const reportTypeValue = binaryString.slice(15, 17);

        const requestResponse = requestResponseValue == "1" ? true : false;
        const acknowledgementRequest = acknowledgementRequestValue == "1" ? true : false;
        const { minimumReportingInterval } = ElementMinimumReportingInterval.fromValue(minimumReportingIntervalValue);
        const { reportType } = ElementReportType.fromValue(reportTypeValue);

        const type5Elements = parseType5Elements(binaryString.slice(17));

        return new PduBasicLocationParametersRequest({
            requestResponse,
            acknowledgementRequest,
            minimumReportingInterval,
            reportType,
            type5Elements
        });
    }

    toData(){
        const pduType = this.pduType.toBinary();
        const pduTypeExtension = this.pduTypeExtension.toBinary();
        const requestResponse = this.requestResponse;
        const acknowledgementRequest = this.acknowledgementRequestValue;
        const minimumReportingInterval = this.minimumReportingInterval.toBinary();
        const reportType = this.reportType.toBinary();

        const type5Elements = this.type5Elements.map(element => element.toBinary()).join("");
        const binaryString = pduType + pduTypeExtension + requestResponse + acknowledgementRequest + minimumReportingInterval + reportType + type5Elements;
        const hexString = binaryToHex(binaryString);

        return hexString;
    }
}
module.exports = PduBasicLocationParametersRequest;