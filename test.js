const { ElementType5LocationInformationDestination, ElementSSI } = require("./exports");

// ->>>>>> http://pdu.argos.ws/LIP_PDU_Generator/LIP_PDU_Generator.htm 

// const PduImmediateLocationReportRequest = require("./pdu/ImmediateLocationReportRequest");
// const targetSsi = new ElementSSI(9999);
// const locationInformationDestination = new ElementType5LocationInformationDestination(targetSsi);
// const immediateLocationReportRequest = new PduImmediateLocationReportRequest({
//     reportType: "LONG-WITH-TIME-OF-POSITION",
//     type5Elements: [locationInformationDestination]
// });

// const reversePdu = PduImmediateLocationReportRequest.fromData(immediateLocationReportRequest.toData());

//console.log('locationInformationDestination', locationInformationDestination.toBinary())
// console.log(immediateLocationReportRequest.toData())
// console.log(reversePdu.type5Elements)





// const PduShortLocationReport = require("./pdu/ShortLocationReport");
// const shortReport = PduShortLocationReport.fromData("002F7DC24FA7B103E810")
// console.log(shortReport, shortReport.toData())

// const PduLongLocationReport = require("./pdu/LongLocationReport");
// const testdata = "4EEBD55100BDF5E93E9E41900200";
// const longReport = PduLongLocationReport.fromData(testdata.split(" ").join(""));
// console.log(longReport.toData(), testdata.split(" ").join(""))
// console.log(longReport)

// const PduLocationReportAcknowledgement = require("./pdu/LocationReportAcknowledgement");
// const testdata = "50 00";
// const locationReportAcknowledgement = PduLocationReportAcknowledgement.fromData(testdata.split(" ").join(""));
// console.log(locationReportAcknowledgement.toData(), testdata.split(" ").join(""))

// const PduBasicLocationParametersRequest = require("./pdu/BasicLocationParametersRequest");
// const testdata = "55 00 00 ";
// const basicLocationParametersRequest = PduBasicLocationParametersRequest.fromData(testdata.split(" ").join(""));
//console.log(basicLocationParametersRequest)

// const PduBasicLocationParametersResponse = require("./pdu/BasicLocationParametersResponse");
// const testdata = "56 1B 00 02 8E 84 01 E4 A2 75 00 92 4D 08 03 C9 44 EA 01 24 E3 C9 40 E0 9C B3 DB 89 90 5A F3 A1 4A 93 DD ";
// const basicLocationParametersRequest = PduBasicLocationParametersResponse.fromData(testdata.split(" ").join(""));
// console.log(basicLocationParametersRequest)

// 
// const PduImmediateLocationReportRequest = require("./pdu/ImmediateLocationReportRequest");
// const testdata = "45 47 42 00 F2 51 3A 80 49 ";
// const immediateLocationReportRequest = PduImmediateLocationReportRequest.fromData(testdata.split(" ").join(""));
// console.log(immediateLocationReportRequest.toData(), testdata.split(" ").join(""))
// console.log(immediateLocationReportRequest.type5Elements)
