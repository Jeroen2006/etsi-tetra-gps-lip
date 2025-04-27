const ElementScaffold = require('../scaffold');

const def = {
    "NONE": 0,
    "TIME-ELAPSED": 1,
    "TIME-OF-POSITION": 2,
    "RESERVED": 3,
};

class ElementTimeType extends ElementScaffold {
    constructor(timeType) {
        super(1, 2); // 2 bits for Time Type

        if (timeType in def) {
            this.timeType = timeType;
            this.value = def[timeType];
        } else {
            throw new Error(`Invalid Time Type: ${timeType}`);
        }
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementTimeType(key);
            }
        }

        throw new Error(`Invalid Time Type value: ${value}`);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);
        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementTimeType;
