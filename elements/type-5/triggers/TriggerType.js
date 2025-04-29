const ElementScaffold = require('../../scaffold');
const { binaryToBigInt } = require('../../../utils');

const def = {
    0: "POWERED-ON",
    1: "POWERED-OFF",
    2: "EMERGENCY",
    3: "PUSH-TO-TALK",
    4: "STATUS",
    5: "TRANSMIT-INHIBIT-ON",
    6: "TRANSMIT-INHIBIT-OFF",
    7: "ENTERED-TMO",
    8: "ENTERED-DMO",
    9: "ENTERED-SERVICE",
    10: "LOSS-OF-SERVICE",
    11: "CHANGE-SERVING-CELL",
    12: "LOW-BATTERY",
    13: "CARKIT-CONNECTED",
    14: "CARKIT-DISCONNECTED",
    16: "ARRIVED-AT-DESTINATION",
    17: "ARRIVED-AT-POINT",
    18: "APPROACHING-POINT",
    19: "SDS-TYPE-1",
    20: "USER-APPLICATION",
    21: "LOST-ABILITY-TO-DETERMINE-LOCATION",
    22: "REGAINED-ABILITY-TO-DETERMINE-LOCATION",
    23: "LEAVING-POINT",
    24: "AMBIENCE-LISTENING",
    28: "CALL-SETUP-TYPE-2",
    29: "GPS-ON",
    30: "GPS-OFF",
    129: "MAXIMUM-REPORTING-INTERVAL",
    130: "MAXIMUM-REPORTING-DISTANCE",
};

class ElementTriggerType extends ElementScaffold {
    constructor(triggerType) {
        super(1, 8); 

        if(!Object.values(def).includes(triggerType)) throw new Error('Invalid trigger type value.');
        this.triggerTypeValue = parseInt(Object.keys(def).find(key => def[key] === triggerType))
        this.triggerType = triggerType;

        const triggerTypeBits = this.triggerTypeValue.toString(2).padStart(8, '0');
        this.value = binaryToBigInt(triggerTypeBits);
        this.length = triggerTypeBits.length;
    }

    static fromValue(value) {
        if (value.length !== 8) throw new Error('Invalid length for trigger type value.');

        const triggerTypeBits = value.slice(0, 8);
        const requestPriority = binaryToBigInt(triggerTypeBits);

        return new ElementTriggerType(def[requestPriority]);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementTriggerType;
