// ->>>>>> http://pdu.argos.ws/LIP_PDU_Generator/LIP_PDU_Generator.htm (has issues but whatever)


// const PduShortLocationReport = require("./pdu/ShortLocationReport");
// const shortReport = PduShortLocationReport.fromData("0123006AD00F6886E000")
// console.log(shortReport.toData())

// const PduLongLocationReport = require("./pdu/LongLocationReport");
// const testdata = "4E 7B 71 32 44 8C 01 AB 40 3D A0 00 40 00 24 00 43 E9 52 8C 08 00 06 20 A1 84 08 C7 42 00 F2 51 3A 80 49 ";
// const longReport = PduLongLocationReport.fromData(testdata.split(" ").join(""));
// console.log(longReport.toData(), testdata.split(" ").join(""))
//console.log(longReport)


// const PduLocationReportAcknowledgement = require("./pdu/LocationReportAcknowledgement");
// const testdata = "50 00";
// const locationReportAcknowledgement = PduLocationReportAcknowledgement.fromData(testdata.split(" ").join(""));
// console.log(locationReportAcknowledgement.toData(), testdata.split(" ").join(""))

// const PduBasicLocationParametersRequest = require("./pdu/BasicLocationParametersRequest");
// const testdata = "55 00 00 ";
// const basicLocationParametersRequest = PduBasicLocationParametersRequest.fromData(testdata.split(" ").join(""));
//console.log(basicLocationParametersRequest)

const PduBasicLocationParametersResponse = require("./pdu/BasicLocationParametersResponse");
const testdata = "56 1B 00 02 8E 84 01 E4 A2 75 00 92 4D 08 03 C9 44 EA 01 24 E3 C9 40 E0 9C B3 DB 89 90 5A F3 A1 4A 93 DD ";
const basicLocationParametersRequest = PduBasicLocationParametersResponse.fromData(testdata.split(" ").join(""));
console.log(basicLocationParametersRequest)