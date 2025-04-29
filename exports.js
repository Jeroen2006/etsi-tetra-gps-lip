//will be updated when all the work is done

const PduShortLocationReport = require("./pdu/ShortLocationReport");
const PduLongLocationReport = require("./pdu/LongLocationReport");
const PduLocationReportAcknowledgement = require("./pdu/LocationReportAcknowledgement");
const PduBasicLocationParametersRequest = require("./pdu/BasicLocationParametersRequest");
const PduBasicLocationParametersResponse = require("./pdu/BasicLocationParametersResponse");
const PduImmediateLocationReportRequest = require("./pdu/ImmediateLocationReportRequest");

const ElementLatitude = require("./elements/Latitude");
const ElementLongitude = require("./elements/Longitude");
const ElementDirectionOfTravel = require("./elements/DirectionOfTravel");
const ElementHorizontalVelocity = require("./elements/HorizontalVelocity");
const ElementLocationReportingEnableFlags = require("./elements/LocationReportingEnableFlags");
const ElementMinimumReportingInterval = require("./elements/MinimumReportingInterval");
const ElementPduType = require("./elements/PduType");
const ElementPduTypeExtension = require("./elements/PduTypeExtension");
const ElementPositionError = require("./elements/PositionError");
const ElementReasonForSending = require("./elements/ReasonForSending");
const ElementReportType = require("./elements/ReportType");
const ElementResultCode = require("./elements/ResultCode");
const ElementTimeElapsed = require("./elements/TimeElapsed");
const ElementTypeOfAdditionalData= require("./elements/TypeOfAdditionalData");

const ElementAngle = require("./elements/location-data/Angle");
const ElementConfidenceLevel = require("./elements/location-data/ConfidenceLevel");
const ElementHalfMajorAxis = require("./elements/location-data/HalfOfMajorAxis");
const ElementHalfMinorAxis = require("./elements/location-data/HalfOfMinorAxis");
const ElementHorizontalPositionUncertainty = require("./elements/location-data/HorizontalPositionUncertainty");
const ElementInnerRadius = require("./elements/location-data/InnerRadius");
const ElementLocationAltitude = require("./elements/location-data/LocationAltitude");
const ElementLocationAltitudealtitudeUncertainty = require("./elements/location-data/LocationAltitudeUncertainty");
const ElementLocationArc = require("./elements/location-data/LocationArc");
const ElementLocationCircle = require("./elements/location-data/LocationCircle");
const ElementLocationCircleWithAltitude = require("./elements/location-data/LocationCircleWithAltitude");
const ElementLocationCircleWithAltitudeAndUncertainty = require("./elements/location-data/LocationCircleWithAltitudeAndUncertainty");
const ElementLocationEllipse = require("./elements/location-data/LocationEllipse");
const ElementLocationEllipseWithAltitude = require("./elements/location-data/LocationEllipseWithAltitude");
const ElementLocationEllipseWithAltitudeAndUncertainty = require("./elements/location-data/LocationEllipseWithAltitudeAndUncertainty");
const ElementLocationPoint = require("./elements/location-data/LocationPoint");
const ElementLocationPointAndPositionError = require("./elements/location-data/LocationPointAndPositionError");
const ElementLocationPointWithAltitude = require("./elements/location-data/LocationPointWithAltitude");
const ElementLocationShape = require("./elements/location-data/LocationShape");
const ElementOuterRadius = require("./elements/location-data/OuterRadius");
const ElementStartAngle = require("./elements/location-data/StartAngle");
const ElementStopAngle = require("./elements/location-data/StopAngle");

//const ElementTimeElapsed = require("./elements/time-data/TimeElapsed");
const ElementTimeOfPosition = require("./elements/time-data/TimeOfPosition");
const ElementTimeType = require("./elements/time-data/TimeType");

const ElementHorizontalAndVerticalVelocity = require("./elements/velocity-data/HorizontalAndVerticalVelocity");
const ElementHorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty = require("./elements/velocity-data/HorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty");
const ElementHorizontalAndVerticalVelocityWithUncertainty = require("./elements/velocity-data/HorizontalAndVerticalVelocityWithUncertainty");
//const ElementHorizontalVelocity = require("./elements/velocity-data/HorizontalVelocity");
const ElementHorizontalVelocityWithDirectionOfTravelExtended = require("./elements/velocity-data/HorizontalVelocityWithDirectionOfTravelExtended");
const ElementHorizontalVelocityWithDirectionOfTravelExtendedAndUncertainty = require("./elements/velocity-data/HorizontalVelocityWithDirectionOfTravelExtendedAndUncertainty");
const ElementHorizontalVelocityWithUncertainty = require("./elements/velocity-data/HorizontalVelocityWithUncertainty");

const ElementType5DefaultEnableDisableLifetime = require("./elements/type-5/Type5DefaultEnableDisableLifetime");
const ElementType5ElementIdentifier = require("./elements/type-5/Type5ElementIdentifier");
const ElementType5ElementLength = require("./elements/type-5/Type5ElementLength");
const ElementType5LocationInformationDestination = require("./elements/type-5/Type5LocationInformationDestination");
const ElementType5MaximumInformationAge = require("./elements/type-5/Type5MaximumInformationAge");
const ElementType5MaximumResponseTime = require("./elements/type-5/Type5MaximumResponseTime");
const ElementType5RequestPriority = require("./elements/type-5/Type5RequestPriority");
const ElementType5ResultCode = require("./elements/type-5/Type5ResultCode");
const ElementType5StartTime = require("./elements/type-5/Type5StartTime");
const ElementType5StatusValue = require("./elements/type-5/Type5StatusValue");
const ElementType5StopTime = require("./elements/type-5/Type5StopTime");
const ElementType5TerminalOrLocationIdentification = require("./elements/type-5/Type5TerminalOrLocationIdentification");
const ElementType5SDSType1Value = require("./elements/type-5/Type5SDSType1Value");
const ElementType5LocationMessageReference = require("./elements/type-5/Type5LocationMessageReference");

const ElementAddressOrIdentificationType = require("./elements/type-5/address/AddressOrIdentificationType");
const NoAddress = require("./elements/type-5/address/NoAddress");
const ElementSSI = require("./elements/type-5/address/Ssi");
const ElementMniSsi = require("./elements/type-5/address/MniSsi");

module.exports = {
    PduShortLocationReport,
    PduLongLocationReport,
    PduLocationReportAcknowledgement,
    PduBasicLocationParametersRequest,
    PduBasicLocationParametersResponse,
    PduImmediateLocationReportRequest,

    ElementLatitude,
    ElementLongitude,
    ElementDirectionOfTravel,
    ElementHorizontalVelocity,
    ElementLocationReportingEnableFlags,
    ElementMinimumReportingInterval,
    ElementPduType,
    ElementPduTypeExtension,
    ElementPositionError,
    ElementReasonForSending,
    ElementReportType,
    ElementResultCode,
    ElementTimeElapsed,
    ElementTypeOfAdditionalData,

    ElementAngle,
    ElementConfidenceLevel,
    ElementHalfMajorAxis,
    ElementHalfMinorAxis,
    ElementHorizontalPositionUncertainty,
    ElementInnerRadius,
    ElementLocationAltitude,
    ElementLocationAltitudealtitudeUncertainty,
    ElementLocationArc,
    ElementLocationCircle,
    ElementLocationCircleWithAltitude,
    ElementLocationCircleWithAltitudeAndUncertainty,
    ElementLocationEllipse,
    ElementLocationEllipseWithAltitude,
    ElementLocationEllipseWithAltitudeAndUncertainty,
    ElementLocationPoint,
    ElementLocationPointAndPositionError,
    ElementLocationPointWithAltitude,
    ElementLocationShape,
    ElementOuterRadius,
    ElementStartAngle,
    ElementStopAngle,

    ElementTimeOfPosition,
    ElementTimeType,
    
    ElementHorizontalAndVerticalVelocity,
    ElementHorizontalAndVerticalVelocityWithDirectionOfTravelExtendedAndUncertainty,
    ElementHorizontalAndVerticalVelocityWithUncertainty,
    ElementHorizontalVelocityWithDirectionOfTravelExtended,
    ElementHorizontalVelocityWithDirectionOfTravelExtendedAndUncertainty,
    ElementHorizontalVelocityWithUncertainty,

    ElementType5DefaultEnableDisableLifetime,
    ElementType5ElementIdentifier,
    ElementType5ElementLength,
    ElementType5LocationInformationDestination,
    ElementType5MaximumInformationAge,
    ElementType5MaximumResponseTime,
    ElementType5RequestPriority,
    ElementType5ResultCode,
    ElementType5StartTime,
    ElementType5StatusValue,
    ElementType5StopTime,
    ElementType5TerminalOrLocationIdentification,
    ElementType5SDSType1Value,
    ElementType5LocationMessageReference,

    ElementAddressOrIdentificationType,
    NoAddress,
    ElementSSI,
    ElementMniSsi,
}