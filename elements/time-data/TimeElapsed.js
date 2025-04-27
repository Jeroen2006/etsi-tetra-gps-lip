const ElementScaffold = require('../scaffold');
const ElementTimeType = require('./TimeType'); // using your TimeType class

const def = {
    "LESS-THAN-5-SECONDS": 0,
    "LESS-THAN-5-MINUTES": 1,
    "LESS-THAN-30-MINUTES": 2,
    "TIME-ELAPSED-UNKNOWN-OR-NOT-APPLICABLE": 3,
};

class ElementTimeElapsed extends ElementScaffold {
    constructor(timeElapsed) {
        if (!Number.isInteger(timeElapsed) || !Object.values(def).includes(timeElapsed)) {
            throw new Error('Invalid timeElapsed value (must be 0–3)');
        }

        const timeType = new ElementTimeType('TIME-ELAPSED');

        super(1, 4); // 2 bits for time type + 2 bits for elapsed

        this.timeType = timeType;
        this.timeElapsed = timeElapsed;
        this.value = (timeType.value << 2) | timeElapsed;
    }

    static fromValue(timeElapsed) {
        if (typeof timeElapsed === 'string') timeElapsed = parseInt(timeElapsed, 10);

        if (!Object.values(def).includes(timeElapsed)) {
            throw new Error('Invalid timeElapsed value for ElementTimeElapsed');
        }

        return new ElementTimeElapsed(timeElapsed);
    }

    static isValid(timeElapsed) {
        if (typeof timeElapsed === 'string') timeElapsed = parseInt(timeElapsed, 10);

        return Object.values(def).includes(timeElapsed);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementTimeElapsed;
