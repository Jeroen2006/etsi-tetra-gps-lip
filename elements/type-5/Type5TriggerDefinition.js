const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const ElementTriggerType = require('./triggers/TriggerType');
const ElementMaximumReportingInterval = require('./triggers/MaximumReportingInterval');
const ElementMaximumReportingDistance = require('./triggers/MaximumReportingDistance');
const ElementMinimumDetectionInterval = require('./triggers/MinimumDetectionInterval');
const ElementTriggerLocationPoint = require('./triggers/LocationPoint');
const ElementTriggerLocationCircle = require('./triggers/LocationCircle');
const ElementTriggerStatusValue = require('./triggers/StatusValue');
const ElementTriggerSDSType1Value = require('./triggers/SDSType1Value');

const { binaryToBigInt } = require('../../utils');

class ElementType5TriggerDefinition extends ElementScaffold {
    constructor(triggerType, isRecurring, { maximumReportingInterval, maximumReportingDistance, minimumDetectionInterval, locationPoint, locationCircle, statusValue, sdsType1Value }) {
        super(5, 0); // Type 5, Trigger Definition
        this.elementIdentifier = new ElementType5ElementIdentifier("TRIGGER-DEFINITION");
        this.elementLength = new ElementType5ElementLength(0); // Placeholder, will be updated later
        
        this.triggerType = new ElementTriggerType(triggerType);
        this.oneshotRecurring = isRecurring ? '1' : '0'; // 1 for recurring, 0 for one-shot

        if(triggerType == "MAXIMUM-REPORTING-INTERVAL" && !maximumReportingInterval) throw new Error('Maximum Reporting Interval is required for this trigger type.');
        if(triggerType == "MAXIMUM-REPORTING-DISTANCE" && !maximumReportingDistance) throw new Error('Maximum Reporting Distance is required for this trigger type.');
        if(triggerType == "LOST-ABILITY-TO-DETERMINE-LOCATION" && !minimumDetectionInterval) throw new Error('Minimum Detection Interval is required for this trigger type.');
        if(triggerType == "REGAINED-ABILITY-TO-DETERMINE-LOCATION" && !minimumDetectionInterval) throw new Error('Minimum Detection Interval is required for this trigger type.');
        if(triggerType == "ARRIVED-AT-POINT" && !locationPoint) throw new Error('Location Point is required for this trigger type.');
        if(triggerType == "APPROACHING-POINT" && !locationCircle) throw new Error('Location Circle is required for this trigger type.');
        if(triggerType == "LEAVING-POINT" && !locationCircle) throw new Error('Location Circle is required for this trigger type.');
        if(triggerType == "STATUS" && !statusValue) throw new Error('Status Value is required for this trigger type.');
        if(triggerType == "SDS-TYPE-1" && !sdsType1Value) throw new Error('SDS Type 1 Value is required for this trigger type.');
        
        if(maximumReportingInterval && !(maximumReportingInterval instanceof ElementMaximumReportingInterval)) throw new Error('Invalid Maximum Reporting Interval object.');
        if(maximumReportingDistance && !(maximumReportingDistance instanceof ElementMaximumReportingDistance)) throw new Error('Invalid Maximum Reporting Distance object.');
        if(minimumDetectionInterval && !(minimumDetectionInterval instanceof ElementMinimumDetectionInterval)) throw new Error('Invalid Minimum Detection Interval object.');
        if(locationPoint && !(locationPoint instanceof ElementTriggerLocationPoint)) throw new Error('Invalid Location Point object.');
        if(locationCircle && !(locationCircle instanceof ElementTriggerLocationCircle)) throw new Error('Invalid Location Circle object.');
        if(statusValue && !(statusValue instanceof ElementTriggerStatusValue)) throw new Error('Invalid Status Value object.');
        if(sdsType1Value && !(sdsType1Value instanceof ElementTriggerSDSType1Value)) throw new Error('Invalid SDS Type 1 Value object.');

        if(maximumReportingInterval) this.maximumReportingInterval = maximumReportingInterval;
        if(maximumReportingDistance) this.maximumReportingDistance = maximumReportingDistance;
        if(minimumDetectionInterval) this.minimumDetectionInterval = minimumDetectionInterval;
        if(locationPoint) this.locationPoint = locationPoint;
        if(locationCircle) this.locationCircle = locationCircle;
        if(statusValue) this.statusValue = statusValue;
        if(sdsType1Value) this.sdsType1Value = sdsType1Value;

        var triggerInfoBits = this.triggerType.toBinary();
        triggerInfoBits += this.oneshotRecurring; // 1 bit for recurring/oneshot

        if(triggerType == "MAXIMUM-REPORTING-INTERVAL") triggerInfoBits += this.maximumReportingInterval.toBinary();
        if(triggerType == "MAXIMUM-REPORTING-DISTANCE") triggerInfoBits += this.maximumReportingDistance.toBinary();
        if(triggerType == "LOST-ABILITY-TO-DETERMINE-LOCATION" || triggerType == "REGAINED-ABILITY-TO-DETERMINE-LOCATION") triggerInfoBits += this.minimumDetectionInterval.toBinary();
        if(triggerType == "ARRIVED-AT-POINT") triggerInfoBits += this.locationPoint.toBinary();
        if(triggerType == "APPROACHING-POINT" || triggerType == "LEAVING-POINT") triggerInfoBits += this.locationCircle.toBinary();
        if(triggerType == "STATUS") triggerInfoBits += this.statusValue.toBinary();
        if(triggerType == "SDS-TYPE-1") triggerInfoBits += this.sdsType1Value.toBinary();

        this.elementLength = new ElementType5ElementLength(triggerInfoBits.length); // Update the element length based on the actual length of the trigger info bits


        var bitString = this.elementIdentifier.toBinary() + this.elementLength.toBinary() + triggerInfoBits;
        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        const trigerTypeBits = value.slice(0, 8);
        const { triggerType } = ElementTriggerType.fromValue(trigerTypeBits);

        const isRecurring = value.slice(8, 9) == "1" ? true : false;

        var maximumReportingInterval;
        var maximumReportingDistance;
        var minimumDetectionInterval;
        var locationPoint;
        var locationCircle;
        var statusValue;
        var sdsType1Value
        
        if(triggerType == "MAXIMUM-REPORTING-INTERVAL"){
            const MaximumReportingIntervalBits = value.slice(9, 16);
            maximumReportingInterval = ElementMaximumReportingInterval.fromValue(MaximumReportingIntervalBits);
        }

        if(triggerType == "MAXIMUM-REPORTING-DISTANCE"){
            const MaximumReportingDistanceBits = value.slice(9, 16);
            maximumReportingDistance = ElementMaximumReportingDistance.fromValue(MaximumReportingDistanceBits);
        }

        if(triggerType == "LOST-ABILITY-TO-DETERMINE-LOCATION" || triggerType == "REGAINED-ABILITY-TO-DETERMINE-LOCATION"){
            const MinimumDetectionIntervalBits = value.slice(9, 16);
            minimumDetectionInterval = ElementMinimumDetectionInterval.fromValue(MinimumDetectionIntervalBits);
        }

        if(triggerType == "ARRIVED-AT-POINT"){
            const TriggerLocationPointBits = value.slice(9, (9 + 49));
            locationPoint = ElementTriggerLocationPoint.fromValue(TriggerLocationPointBits);
        }

        if(triggerType == "APPROACHING-POINT" || triggerType == "LEAVING-POINT"){
            const TriggerLocationCircleBits = value.slice(9, (9 + 55));
            locationCircle = ElementTriggerLocationCircle.fromValue(TriggerLocationCircleBits);
        }

        if(triggerType == "STATUS"){
            const TriggerStatusValueBits = value.slice(9, 25);
            statusValue = ElementTriggerStatusValue.fromValue(TriggerStatusValueBits);
        }

        if(triggerType == "SDS-TYPE-1"){
            const TriggerSDSType1ValueBits = value.slice(9, 25);
            sdsType1Value = ElementTriggerSDSType1Value.fromValue(TriggerSDSType1ValueBits);
        }

        return new ElementType5TriggerDefinition(triggerType, isRecurring, { maximumReportingInterval, maximumReportingDistance, minimumDetectionInterval, locationPoint, locationCircle, statusValue, sdsType1Value });

    }

}

module.exports = ElementType5TriggerDefinition;
