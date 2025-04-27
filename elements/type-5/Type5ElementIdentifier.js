const ElementScaffold = require('../scaffold');

const def = {
    "DIRECTION-OF-TRAVEL-AND-ACCURACY": 0,
    "EXTENDED-USER-DEFINED-DATA": 1,
    "HORIZONTAL-POSITION-AND-ACCURACY": 2,
    "HORIZONTAL-VELOCITY-AND-ACCURACY": 3,
    "LOCATION-INFORMATION-DESTINATION": 4,
    "LOCATION-ALTITUDE-AND-ACCURACY": 5,
    "LOCATION-MESSAGE-REFERENCE": 6,
    "MAXIMUM-INFORMATION-AGE": 7,
    "MAXIMUM-RESPONSE-TIME": 8,
    "DEFAULT-ENABLE-DISABLE-LIFETIME": 9,
    "RESERVED-10": 10,
    "REQUEST-PRIORITY": 11,
    "RESULT-CODE": 12,
    "SDS-TYPE-1-VALUE": 13,
    "START-TIME": 14,
    "STATUS-VALUE": 15,
    "STOP-TIME": 16,
    "TERMINAL-OR-LOCATION-IDENTIFICATION": 17,
    "RESERVED-18": 18,
    "TRIGGER-DEFINITION": 19,
    "TRIGGER-REMOVAL": 20,
    "VERTICAL-VELOCITY-AND-ACCURACY": 21,
    "TEMPORARY-CONTROL-PARAMETER-DEFINITION": 22,
    "BACKLOG-INFORMATION-AVAILABLE": 23,
    "BACKLOG-CONTINUATION-STATE": 24,
    "RESERVED-25": 25,
    "RESERVED-26": 26,
    "RESERVED-27": 27,
    "RESERVED-28": 28,
    "RESERVED-29": 29,
    "RESERVED-30": 30,
    "EXTENDED-TYPE-5-ELEMENT": 31,
};

class ElementType5ElementIdentifier extends ElementScaffold {
    constructor(elementIdentifier) {
        super(1, 5); // 5 bits

        if (!(elementIdentifier in def)) {
            throw new Error(`Invalid Type 5 Element Identifier: ${elementIdentifier}`);
        }

        this.elementIdentifier = elementIdentifier;
        this.value = def[elementIdentifier];
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementType5ElementIdentifier(key);
            }
        }
        throw new Error(`Unknown Type 5 Element Identifier value: ${value}`);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);
        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementType5ElementIdentifier;
