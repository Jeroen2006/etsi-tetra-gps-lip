const ElementPduType = require("../elements/PduType");
const ElementPduTypeExtension = require("../elements/PduTypeExtension");
const ElementReportType = require("../elements/ReportType");

const { hexToBinaryString, binaryToHex } = require("../utils");
const { parseType5Elements } = require("../type5parser");

class PduImmediateLocationReportRequest {
    constructor({
        reportType = "LONG-WITHOUT-TIME",
        type5Elements = []
    }) {
        this.pduType = new ElementPduType("LOCATION-PROTOCOL-PDU-WITH-EXTENSION");
        this.pduTypeExtension = new ElementPduTypeExtension("IMMEDIATE-LOCATION-REPORT-REQUEST");
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

        if(pduTypeExtension != "IMMEDIATE-LOCATION-REPORT-REQUEST"){
            throw new Error(`Invalid PDU Type Extension: ${pduTypeExtension}`);
        }

        const requestResponse = binaryString.slice(6, 7); //request
        const reportTypeValue = binaryString.slice(7, 9);
        const { reportType } = ElementReportType.fromValue(reportTypeValue);
        const type5Elements = parseType5Elements(binaryString.slice(9));

        return new PduImmediateLocationReportRequest({
            reportType,
            type5Elements
        });
    }

    toData(){
        const pduType = this.pduType.toBinary();
        const pduTypeExtension = this.pduTypeExtension.toBinary();
        const requestResponse = "0" //request
        const reportType = this.reportType.toBinary();
        const type5Elements = this.type5Elements.map(element => element.toBinary()).join("");

        const binaryString = pduType + pduTypeExtension + requestResponse + reportType + type5Elements;
        const hexString = binaryToHex(binaryString);

        return hexString;
    }
}
module.exports = PduImmediateLocationReportRequest;