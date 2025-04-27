const ElementScaffold = require('./scaffold');

const def = {
    "RESERVED-0": 0,
    "IMMEDIATE-LOCATION-REPORT-REQUEST": 1,
    "RESERVED-2": 2,
    "LONG-LOCATION-REPORT": 3,
    "LOCATION-REPORT-ACKNOWLEDGEMENT": 4,
    "BASIC-LOCATION-PARAMETERS-REQUEST-RESPONSE": 5,
    "ADD-MODIFY-TRIGGER-REQUEST-RESPONSE": 6,
    "REMOVE-TRIGGER-REQUEST-RESPONSE": 7,
    "REPORT-TRIGGER-REQUEST-RESPONSE": 8,
    "REPORT-BASIC-LOCATION-PARAMETERS-REQUEST-RESPONSE": 9,
    "LOCATION-REPORTING-ENABLE-DISABLE-REQUEST-RESPONSE": 10,
    "LOCATION-REPORTING-TEMPORARY-CONTROL-REQUEST-RESPONSE": 11,
    "BACKLOG-REQUEST-RESPONSE": 12,
    "RESERVED-13": 13,
    "RESERVED-14": 14,
    "RESERVED-15": 15
};

class ElementPduTypeExtension extends ElementScaffold {
    constructor(pduTypeExtension) {
        super(1, 4); // 4 bits for PDU type extension

        if (pduTypeExtension in def) {
            this.pduTypeExtension = pduTypeExtension;
            this.value = def[pduTypeExtension];
        } else {
            throw new Error(`Invalid PDU Type Extension: ${pduTypeExtension}`);
        }
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementPduTypeExtension(key);
            }
        }
        throw new Error(`Invalid PDU Type Extension value: ${value}`);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);
        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementPduTypeExtension;
