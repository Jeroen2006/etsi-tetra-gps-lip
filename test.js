// const { ElementType5LocationInformationDestination, ElementSSI } = require("./exports");
// const { convertToDataElements } = require("./utils");
// ->>>>>> http://pdu.argos.ws/LIP_PDU_Generator/LIP_PDU_Generator.htm 

const ElementType5TemporaryControlParameterDefinition = require("./elements/type-5/Type5TemporaryControlParameterDefinition");
const PduReportingTempControlRequest = require("./pdu/ReportingTempControlRequest");
const testdata = "6D 8B 14 32 00 ";
const reportingTempControlRequest = PduReportingTempControlRequest.fromData(testdata.split(" ").join(""));

console.log(reportingTempControlRequest)
console.log(reportingTempControlRequest.toData(), testdata.split(" ").join(""));


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
// const testdata = "62 1A 00 4C 90 00 09 62 0C 9E A9 4A B5 80 ";
// const reportTriggersResponse = PduReportTriggersResponse.fromData(testdata.split(" ").join(""));
// console.log(convertToDataElements(reportTriggersResponse))
// console.log(reportTriggersResponse.toData(), testdata.split(" ").join(""))

// const PduReportBasicLocationParametersRequest = require("./pdu/ReportBasicLocationParametersRequest");
// const testdata = "65 1D 08 03 C9 44 EA 01 24 ";
// const reportBasicLocationParametersRequest = PduReportBasicLocationParametersRequest.fromData(testdata.split(" ").join(""));
// console.log(reportBasicLocationParametersRequest)
// console.log(reportBasicLocationParametersRequest.toData(), testdata.split(" ").join(""))

// const PduReportBasicLocationParametersResponse = require("./pdu/ReportBasicLocationParametersResponse");
// const testdata = "66 01 00 00 38 F2 50 38 20 ";
// const reportBasicLocationParametersResponse = PduReportBasicLocationParametersResponse.fromData(testdata.split(" ").join(""));
// console.log(convertToDataElements(reportBasicLocationParametersResponse))
// console.log(reportBasicLocationParametersResponse.toData(), testdata.split(" ").join(""))

// const PduAddModifyTriggerRequest = require("./pdu/AddModifyTriggersRequest");
// const testdata = "59 A6 00 01 20 91 80 35 68 07 B4 40 ";
// const addModifyTriggerRequest = PduAddModifyTriggerRequest.fromData(testdata.split(" ").join(""));
// //console.log(addModifyTriggerRequest)
// console.log(addModifyTriggerRequest.toData(), testdata.split(" ").join(""))

// const PduShortLocationReport = require("./pdu/ShortLocationReport");
// const shortReport = PduShortLocationReport.fromData("002F7DC24FA7B103E810")
// console.log(shortReport, shortReport.toData())

// const PduLongLocationReport = require("./pdu/LongLocationReport");
// const testdata = "44 09 0F 11 E0 ";
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
// const testdata = "44 09 0F 10 60 ";
// const immediateLocationReportRequest = PduImmediateLocationReportRequest.fromData(testdata.split(" ").join(""));
// console.log(immediateLocationReportRequest.toData(), testdata.split(" ").join(""))
// console.log(immediateLocationReportRequest.type5Elements)



// const PduAddModifyTriggerRequest = require("./pdu/AddModifyTriggersRequest");
// const ElementType5TriggerDefinition = require("./elements/type-5/Type5TriggerDefinition");
// // const ElementMaximumReportingInterval = require("./elements/type-5/triggers/MaximumReportingInterval");

// // const maxReportingInterval = new ElementMaximumReportingInterval("30s");
// // const maxIntervalTriggerDefinition = new ElementType5TriggerDefinition("MAXIMUM-REPORTING-INTERVAL", true, { maximumReportingInterval: maxReportingInterval });

// const ElementTriggerLocationCircle = require("./elements/type-5/triggers/LocationCircle");

// const baseCircle = new ElementTriggerLocationCircle({
//     latitude: 63.286543,
//     longitude: 25.57632,
//     horizontalPositionUncertainty: "<11m"
// });

// const approachingBaseTrigger = new ElementType5TriggerDefinition("APPROACHING-POINT", false, { locationCircle: baseCircle });

// const addModifyTriggerRequest = new PduAddModifyTriggerRequest({
//     acknowledgementRequest: true,
//     reportType: "LONG-WITH-TIME-OF-POSITION",
//     type5Elements: [approachingBaseTrigger]
// });

// const reverseElement = PduAddModifyTriggerRequest.fromData(addModifyTriggerRequest.toData());
// // const reverseElement = PduAddModifyTriggerRequest.fromData("59A60001209180356807B460");
// // console.log("59A60001209180356807B460" == reverseElement.toData())


// console.log(addModifyTriggerRequest.toData() == reverseElement.toData());
// console.log()

// const PduImmediateLocationReportRequest = require("./pdu/ImmediateLocationReportRequest");
// const ElementType5MaximumResponseTime = require("./elements/type-5/Type5MaximumResponseTime");

// const maxResponseTime = new ElementType5MaximumResponseTime("4s");
// const immediateLocationReportRequest = new PduImmediateLocationReportRequest({
//     reportType: "LONG-WITH-TIME-OF-POSITION",
//     type5Elements: [maxResponseTime]
// });

// console.log(immediateLocationReportRequest.toData());

//4C5000000000000000017F80000C2144 //long report yes need fix thnaks


// const PduBasicLocationParametersRequest = require("./pdu/BasicLocationParametersRequest");
// const ElementSSI = require("./elements/type-5/address/Ssi");
// const ElementType5LocationInformationDestination = require("./elements/type-5/Type5LocationInformationDestination");
// const ElementType5DirectionOfTravelAndDirectionOfTravelAccuracy = require("./elements/type-5/Type5DirectionOfTravelAndDirectionOfTravelAccuracy");
// const ElementType5HorizontalPositionAndHorizontalPositionAccuracy = require("./elements/type-5/Type5HorizontalPositionAndHorizontalPositionAccuracy");
// const ElementType5HorizontalVelocityAndHorizontalVelocityAccuracy = require("./elements/type-5/Type5HorizontalVelocityAndHorizontalVelocityAccuracy");
// const ElementType5LocationAltitudeAndLocationAltitudeAccuracy = require("./elements/type-5/Type5LocationAltitudeAndLocationAltitudeAccuracy");

// const directionOfTravel = new ElementType5DirectionOfTravelAndDirectionOfTravelAccuracy({
//     returnValue: "DIRECTION-OF-TRAVEL-REQUIRED",
//     requestedRequired: "REQUIRED",
//     directionOfTravelAccuracyRequired: "BEST-EFFORT"
// });

// const horizontalPosition = new ElementType5HorizontalPositionAndHorizontalPositionAccuracy({
//     returnValue: "HORIZONTAL-POSITION-AND-UNCERTAINTY-REQUIRED",
//     preferredShape: "CIRCLE-SHAPE-PREFERRED",
//     requestedRequired: "REQUIRED",
//     horizontalPositionAccuracyRequired: "BEST-EFFORT"
// });

// const horizontalVelocity = new ElementType5HorizontalVelocityAndHorizontalVelocityAccuracy({
//     returnValue: "HORIZONTAL-VELOCITY-REQUIRED",
//     requestedRequired: "REQUESTED-AND-REQUIRED",
//     horizontalVelocityAccuracyRequested: "<1,5KM/U",
//     horizontalVelocityAccuracyRequired: "<6KM/U"
// });

// const locationAltitude = new ElementType5LocationAltitudeAndLocationAltitudeAccuracy({
//     returnValue: "LOCATION-ALTITUDE-REQUIRED",
//     requestedRequired: "REQUIRED",
//     locationAltitudeAccuracyRequired: "BEST-EFFORT"
// });

// const targetSsi = new ElementSSI(9999);
// const locationInformationDestination = new ElementType5LocationInformationDestination(targetSsi);

// const basicLocationParametersRequest = new PduBasicLocationParametersRequest({
//     reportType: "LONG-WITH-TIME-OF-POSITION",
//     minimumReportingInterval: "10s",
//     acknowledgementRequest: false,
//     type5Elements: [directionOfTravel, horizontalPosition, horizontalVelocity, locationInformationDestination, locationAltitude]
// });

// console.log(basicLocationParametersRequest.toData());

// const PduAddModifyTriggerRequest = require("./pdu/AddModifyTriggersRequest");
// const ElementType5TriggerDefinition = require("./elements/type-5/Type5TriggerDefinition");
// const ElementMaximumReportingInterval = require("./elements/type-5/triggers/MaximumReportingInterval");

// const maxReportingInterval = new ElementMaximumReportingInterval("30s");
// const maxIntervalTriggerDefinition = new ElementType5TriggerDefinition("MAXIMUM-REPORTING-INTERVAL", true, { maximumReportingInterval: maxReportingInterval });
// const addModifyTriggerRequest = new PduAddModifyTriggerRequest({
//     acknowledgementRequest: false,
//     reportType: "LONG-WITH-TIME-OF-POSITION",
//     type5Elements: [maxIntervalTriggerDefinition]
// });
// console.log(addModifyTriggerRequest.toData());

// console.log(ElementMaximumReportingInterval.getDefinition())

// const ElementMaximumReportingDistance = require("./elements/type-5/triggers/MaximumReportingDistance");
// console.log(ElementMaximumReportingDistance.getDefinition())