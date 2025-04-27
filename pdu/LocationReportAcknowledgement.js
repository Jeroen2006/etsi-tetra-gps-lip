const ElementPduType = require("../elements/PduType");
const ElementPduTypeExtension = require("../elements/PduTypeExtension");

const { hexToBinaryString, binaryToHex } = require("../utils");

class PduLocationReportAcknowledgement {
    constructor() {
        this.pduType = new ElementPduType("LOCATION-PROTOCOL-PDU-WITH-EXTENSION");
        this.pduTypeExtension = new ElementPduTypeExtension("LOCATION-REPORT-ACKNOWLEDGEMENT");
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

        if(pduTypeExtension != "LOCATION-REPORT-ACKNOWLEDGEMENT"){
            throw new Error(`Invalid PDU Type Extension: ${pduTypeExtension}`);
        }

        return new PduLocationReportAcknowledgement({});
    }

    toData(){
        const pduType = this.pduType.toBinary();
        const pduTypeExtension = this.pduTypeExtension.toBinary();

        var binaryString = pduType + pduTypeExtension + "00000000"; // 8 bits of padding
        const hexString = binaryToHex(binaryString);

        console.log(binaryString);

        return hexString;
    }
}
module.exports = PduLocationReportAcknowledgement;