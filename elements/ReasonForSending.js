const ElementScaffold = require('./scaffold');

const def = {
    "SUBSCRIBER-UNIT-POWERED-ON": 0,
    "SUBSCRIBER-UNIT-POWERED-OFF": 1,
    "EMERGENCY-CONDITION-DETECTED": 2,
    "PUSH-TO-TALK-CONDITION-DETECTED": 3,
    "STATUS": 4,
    "TRANSMIT-INHIBIT-ON": 5,
    "TRANSMIT-INHIBIT-OFF": 6,
    "SYSTEM-ACCESS-TMO-ON": 7,
    "DMO-ON": 8,
    "ENTER-SERVICE": 9,
    "SERVICE-LOSS": 10,
    "CELL-RESELECTION": 11,
    "LOW-BATTERY": 12,
    "CONNECTED-TO-CAR-KIT": 13,
    "DISCONNECTED-FROM-CAR-KIT": 14,
    "TRANSFER-INITIALIZATION-REQUEST": 15,
    "ARRIVAL-AT-DESTINATION": 16,
    "ARRIVAL-AT-DEFINED-LOCATION": 17,
    "APPROACHING-DEFINED-LOCATION": 18,
    "SDS-TYPE-1-ENTERED": 19,
    "USER-APPLICATION-INITIATED": 20,
    "LOST-ABILITY-TO-DETERMINE-LOCATION": 21,
    "REGAINED-ABILITY-TO-DETERMINE-LOCATION": 22,
    "LEAVING-POINT": 23,
    "AMBIENCE-LISTENING-CALL-DETECTED": 24,
    "START-TEMPORARY-REPORTING": 25,
    "RETURN-TO-NORMAL-REPORTING": 26,
    "CALL-SETUP-TYPE-1-DETECTED": 27,
    "CALL-SETUP-TYPE-2-DETECTED": 28,
    "POSITIONING-DEVICE-IN-MS-ON": 29,
    "POSITIONING-DEVICE-IN-MS-OFF": 30,
    "RESPONSE-TO-IMMEDIATE-REQUEST": 32,
    "MAX-REPORTING-INTERVAL-EXCEEDED": 129,
    "MAX-REPORTING-DISTANCE-LIMIT-TRAVELLED": 130
};

class ElementReasonForSending extends ElementScaffold {
    constructor(reasonForSending) {
        super(1, 8); // 8 bits for reason for sending

        if (reasonForSending in def) {
            this.reasonForSending = reasonForSending;
            this.value = def[reasonForSending];
        } else {
            throw new Error(`Invalid reason for sending: ${reasonForSending}`);
        }
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementReasonForSending(key);
            }
        }
        throw new Error(`Invalid reason value: ${value}`);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);
        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementReasonForSending;
