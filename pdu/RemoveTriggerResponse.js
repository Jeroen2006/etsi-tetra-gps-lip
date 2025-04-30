const ElementPduType = require("../elements/PduType");
const ElementPduTypeExtension = require("../elements/PduTypeExtension");
const ElementResultCode = require("../elements/ResultCode");

const { hexToBinaryString, binaryToHex } = require("../utils");
const { parseType5Elements } = require("../type5parser");

class PduRemoveTriggerResponse {
    constructor({
        resultCode = "Success",
        type5Elements = []
    } = {}) {
        this.pduType = new ElementPduType("LOCATION-PROTOCOL-PDU-WITH-EXTENSION");
        this.pduTypeExtension = new ElementPduTypeExtension("REMOVE-TRIGGER-REQUEST-RESPONSE");

        this.requestResponse = "1" //response
        this.resultCode = new ElementResultCode(resultCode);

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

        if(pduTypeExtension != "REMOVE-TRIGGER-REQUEST-RESPONSE"){
            throw new Error(`Invalid PDU Type Extension: ${pduTypeExtension}`);
        }

        const requestResponseValue = binaryString.slice(6, 7);
        const resultCodeValue = binaryString.slice(7, 15);

        const requestResponse = requestResponseValue == "1" ? true : false;
        const { resultCode } = ElementResultCode.fromValue(resultCodeValue);

        const type5Elements = parseType5Elements(binaryString.slice(15));

        return new PduRemoveTriggerResponse({
            requestResponse,
            resultCode,
            type5Elements
        });
    }

    toData(){
        const pduType = this.pduType.toBinary();
        const pduTypeExtension = this.pduTypeExtension.toBinary();
        const requestResponse = this.requestResponse;
        const resultCode = this.resultCode.toBinary();

        const type5Elements = this.type5Elements.map(element => element.toBinary()).join("");
        const binaryString = pduType + pduTypeExtension + requestResponse + resultCode + type5Elements;
        const hexString = binaryToHex(binaryString);

        return hexString;
    }
}
module.exports = PduRemoveTriggerResponse;