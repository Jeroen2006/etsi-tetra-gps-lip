const { ElementType5LocationInformationDestination, ElementSSI } = require("./exports");
const { convertToDataElements } = require("./utils");
// ->>>>>> http://pdu.argos.ws/LIP_PDU_Generator/LIP_PDU_Generator.htm 

// const PduImmediateLocationReportRequest = require("./pdu/ImmediateLocationReportRequest");
// const targetSsi = new ElementSSI(9999);
// const locationInformationDestination = new ElementType5LocationInformationDestination(targetSsi);
// const immediateLocationReportRequest = new PduImmediateLocationReportRequest({
//     reportType: "LONG-WITH-TIME-OF-POSITION",
//     type5Elements: [locationInformationDestination]
// });

// const reversePdu = PduImmediateLocationReportRequest.fromData(immediateLocationReportRequest.toData());
// console.log(reversePdu.toData(), immediateLocationReportRequest.toData())
// console.log(immediateLocationReportRequest.toData())
// console.log(reversePdu.type5Elements)

// const ElementMaximumReportingInterval = require("./elements/type-5/triggers/MaximumReportingInterval");
// const ElementMaximumReportingDistance = require("./elements/type-5/triggers/MaximumReportingDistance");
// const ElementMinimumDetectionInterval = require("./elements/type-5/triggers/MinimumDetectionInterval");

// const PduAddModifyTriggerResponse = require("./pdu/AddModifyTriggersResponse");
// const testdata = "5A 30 45 C1 00 F2 51 38 E7 50 38 07 2C F6 E2 64 16 BC E8 52 64 84 00 "
// const addModifyTriggerResponse = PduAddModifyTriggerResponse.fromData(testdata.split(" ").join(""));
// console.log(convertToDataElements(addModifyTriggerResponse))
// console.log(addModifyTriggerResponse.toData(), testdata.split(" ").join(""))

// const PduRemoveTriggerRequest = require("./pdu/RemoveTriggerRequest");
// const testdata = "5D 88 01 68 03 C9 44 EA 01 27 2E 84 8D 15 9E 24 28 08 ";
// const removeTriggerRequest = PduRemoveTriggerRequest.fromData(testdata.split(" ").join(""));
// console.log(removeTriggerRequest.type5Elements)
// console.log(removeTriggerRequest.toData(), testdata.split(" ").join(""))

// const PduRemoveTriggerResponse = require("./pdu/RemoveTriggerResponse");
// const testdata = "5E 31 10 02 D0 07 92 89 D4 02 4E 5D 09 1A 2B 3C 48 53 A8 88 91 80 35 68 07 B4 ";
// const removeTriggerResponse = PduRemoveTriggerResponse.fromData(testdata.split(" ").join(""));
// console.log(removeTriggerResponse.toData(), testdata.split(" ").join(""))
// console.log(removeTriggerResponse.type5Elements)

// const PduLocationReportingEnableDisableRequest = require("./pdu/LocationReportingEnableDisableRequest");
// const testdata = "69 80 8B 82 01 E4 A2 90 90 ";
// const locationReportingEnableDisableRequest = PduLocationReportingEnableDisableRequest.fromData(testdata.split(" ").join(""));
// console.log(locationReportingEnableDisableRequest)
// console.log(locationReportingEnableDisableRequest.toData(), testdata.split(" ").join(""))

// const PduLocationReportingEnableDisableResponse = require("./pdu/LocationReportingEnableDisableResponse");
// const testdata = "6B 01 1D 08 03 C9 44 EA 01 24 ";
// const locationReportingEnableDisableResponse = PduLocationReportingEnableDisableResponse.fromData(testdata.split(" ").join(""));
// console.log(locationReportingEnableDisableResponse)
// console.log(locationReportingEnableDisableResponse.toData(), testdata.split(" ").join(""))

// const PduReportTriggersRequest = require("./pdu/ReportTriggersRequest");
// const testdata = "61 1D 08 03 C9 44 EA 01 24 ";
// const reportTriggersRequest = PduReportTriggersRequest.fromData(testdata.split(" ").join(""));
// console.log(reportTriggersRequest)
// console.log(reportTriggersRequest.toData(), testdata.split(" ").join(""))

// const PduReportTriggersResponse = require("./pdu/ReportTriggersResponse");
// const testdata = "62 01 01 45 C1 00 27 0F 9F 42 21 23 00 6A D0 0F 68 ";
// const reportTriggersResponse = PduReportTriggersResponse.fromData(testdata.split(" ").join(""));
// console.log(convertToDataElements(reportTriggersResponse))
// console.log(reportTriggersResponse.toData(), testdata.split(" ").join(""))

// const PduReportBasicLocationParametersRequest = require("./pdu/ReportBasicLocationParametersRequest");
// const testdata = "65 1D 08 03 C9 44 EA 01 24 ";
// const reportBasicLocationParametersRequest = PduReportBasicLocationParametersRequest.fromData(testdata.split(" ").join(""));
// console.log(reportBasicLocationParametersRequest)
// console.log(reportBasicLocationParametersRequest.toData(), testdata.split(" ").join(""))

const PduReportBasicLocationParametersResponse = require("./pdu/ReportBasicLocationParametersResponse");
const testdata = "66 01 00 00 38 F2 50 38 20 ";
const reportBasicLocationParametersResponse = PduReportBasicLocationParametersResponse.fromData(testdata.split(" ").join(""));
console.log(convertToDataElements(reportBasicLocationParametersResponse))
console.log(reportBasicLocationParametersResponse.toData(), testdata.split(" ").join(""))

// const PduAddModifyTriggerRequest = require("./pdu/AddModifyTriggersRequest");
// const testdata = "59 A3 A1 00 79 28 9D 40 24 CD 08 2E 30 ";
// const addModifyTriggerRequest = PduAddModifyTriggerRequest.fromData(testdata.split(" ").join(""));
// //console.log(addModifyTriggerRequest)
// console.log(addModifyTriggerRequest.toData(), testdata.split(" ").join(""))

// const PduShortLocationReport = require("./pdu/ShortLocationReport");
// const shortReport = PduShortLocationReport.fromData("002F7DC24FA7B103E810")
// console.log(shortReport, shortReport.toData())

// const PduLongLocationReport = require("./pdu/LongLocationReport");
// const testdata = "4E 7B 71 32 04 8C 01 AB 40 3D A4 9C 00 25 AC 08 02 20 05 A0 0F 25 13 A8 04 9C BA 12 34 56 78 90 ";
// const longReport = PduLongLocationReport.fromData(testdata.split(" ").join(""));
// console.log(longReport.toData(), testdata.split(" ").join(""))
// console.log(longReport.type5Elements)

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
