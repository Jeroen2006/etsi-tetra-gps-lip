const ElementScaffold = require('../scaffold');

const def = {
    "NO-VELOCITY-INFORMATION": 0,
    "HORIZONTAL-VELOCITY": 1,
    "HORIZONTAL-VELOCITY-WITH-UNCERTAINTY": 2,
    "HORIZONTAL-AND-VERTICAL-VELOCITY": 3,
    "HORIZONTAL-AND-VERTICAL-VELOCITY-WITH-UNCERTAINTY": 4,
    "HORIZONTAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED": 5,
    "HORIZONTAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED-AND-UNCERTAINTY": 6,
    "HORIZONTAL-AND-VERTICAL-VELOCITY-WITH-DIRECTION-OF-TRAVEL-EXTENDED-AND-UNCERTAINTY": 7
};

class ElementVelocityType extends ElementScaffold {
    constructor(velocityType) {
        super(1, 3); // 3 bits

        if (!(velocityType in def)) {
            throw new Error(`Invalid Velocity Type: ${velocityType}`);
        }

        this.velocityType = velocityType;
        this.value = def[velocityType];
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementVelocityType(key);
            }
        }

        throw new Error(`Invalid Velocity Type value: ${value}`);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementVelocityType;
