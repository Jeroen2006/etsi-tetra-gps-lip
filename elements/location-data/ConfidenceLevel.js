const ElementScaffold = require('../scaffold');

const def = {
    "50-PERCENT": 0,
    "68-PERCENT": 1,
    "80-PERCENT": 2,
    "90-PERCENT": 3,
    "95-PERCENT": 4,
    "99-PERCENT": 5,
    "99.9-PERCENT": 6,
    "CONFIDENCE-LEVEL-NOT-KNOWN": 7,
};

class ElementConfidenceLevel extends ElementScaffold {
    constructor(confidenceLevel) {
        super(1, 3); // 3 bits for confidence level

        if (!(confidenceLevel in def) && !Object.values(def).includes(confidenceLevel)) {
            throw new Error('Invalid Confidence Level');
        }

        if (typeof confidenceLevel === 'string') {
            this.confidenceLevel = confidenceLevel;
            this.value = def[confidenceLevel];
        } else {
            this.confidenceLevel = Object.keys(def).find(key => def[key] === confidenceLevel);
            this.value = confidenceLevel;
        }
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);
        
        if (!Object.values(def).includes(value)) {
            throw new Error('Invalid value for Confidence Level');
        }

        return new ElementConfidenceLevel(value);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementConfidenceLevel;
