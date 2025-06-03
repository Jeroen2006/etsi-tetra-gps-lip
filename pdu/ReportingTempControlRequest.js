const ElementPduType = require("../elements/PduType");
const ElementPduTypeExtension = require("../elements/PduTypeExtension");
const ElementTemporaryControlValidity = require("../elements/TemporaryControlValidity");

const { hexToBinaryString, binaryToHex } = require("../utils");
const { parseType5Elements } = require("../type5parser");

class PduReportingTempControlRequest {
    constructor({
        acknowledgementRequest = false,
        temporaryControlValidity = "10m",
        type5Elements = []
    } = {}) {
        this.pduType = new ElementPduType("LOCATION-PROTOCOL-PDU-WITH-EXTENSION");
        this.pduTypeExtension = new ElementPduTypeExtension("LOCATION-REPORTING-TEMPORARY-CONTROL-REQUEST-RESPONSE");

        this.requestResponse = "0" //request
        this.acknowledgementRequestValue = acknowledgementRequest ? "1" : "0";
        this.temporaryControlValidity = new ElementTemporaryControlValidity(temporaryControlValidity);

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

        if(pduTypeExtension != "LOCATION-REPORTING-TEMPORARY-CONTROL-REQUEST-RESPONSE"){
            throw new Error(`Invalid PDU Type Extension: ${pduTypeExtension}`);
        }

        const requestResponseBits = binaryString.slice(6, 7);

        const acknowledgementRequestBits = binaryString.slice(7, 8);
        const acknowledgementRequest = acknowledgementRequestBits === "1";

        const temporaryControlValidityBits = binaryString.slice(8, 12);
        const { temporaryControlValidity } = ElementTemporaryControlValidity.fromValue(temporaryControlValidityBits);

        const type5Elements = parseType5Elements(binaryString.slice(12));

        return new PduReportingTempControlRequest({
            acknowledgementRequest,
            temporaryControlValidity,
            type5Elements
        });
    }

    toData(){
        const pduType = this.pduType.toBinary();
        const pduTypeExtension = this.pduTypeExtension.toBinary();

        const requestResponse = this.acknowledgementRequestValue;
        const acknowledgementRequest = this.acknowledgementRequestValue;
        const temporaryControlValidity = this.temporaryControlValidity.toBinary();

        const type5Elements = this.type5Elements.map(element => element.toBinary()).join("");
        const binaryString = pduType + pduTypeExtension + requestResponse + acknowledgementRequest + temporaryControlValidity + type5Elements;
        const hexString = binaryToHex(binaryString);

        return hexString;
    }
}
module.exports = PduReportingTempControlRequest;