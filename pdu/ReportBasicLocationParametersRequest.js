const ElementPduType = require("../elements/PduType");
const ElementPduTypeExtension = require("../elements/PduTypeExtension");

const { hexToBinaryString, binaryToHex } = require("../utils");
const { parseType5Elements } = require("../type5parser");

class PduReportBasicLocationParametersRequest {
    constructor({
        type5Elements = []
    } = {}) {
        this.pduType = new ElementPduType("LOCATION-PROTOCOL-PDU-WITH-EXTENSION");
        this.pduTypeExtension = new ElementPduTypeExtension("REPORT-BASIC-LOCATION-PARAMETERS-REQUEST-RESPONSE");

        this.requestResponse = "0" //request
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

        if(pduTypeExtension != "REPORT-BASIC-LOCATION-PARAMETERS-REQUEST-RESPONSE"){
            throw new Error(`Invalid PDU Type Extension: ${pduTypeExtension}`);
        }

        const requestResponseValue = binaryString.slice(6, 7);
        const requestResponse = requestResponseValue == "1" ? true : false;

        const type5Elements = parseType5Elements(binaryString.slice(7));

        return new PduReportBasicLocationParametersRequest({
            requestResponse,
            type5Elements
        });
    }

    toData(){
        const pduType = this.pduType.toBinary();
        const pduTypeExtension = this.pduTypeExtension.toBinary();
        const requestResponse = this.requestResponse;

        const type5Elements = this.type5Elements.map(element => element.toBinary()).join("");
        const binaryString = pduType + pduTypeExtension + requestResponse + type5Elements;
        const hexString = binaryToHex(binaryString);

        return hexString;
    }
}
module.exports = PduReportBasicLocationParametersRequest;