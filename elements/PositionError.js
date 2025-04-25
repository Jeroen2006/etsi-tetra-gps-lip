const ElementScaffold = require('./scaffold');

const def = {
    "<2m": 0,
    "<20m": 1,
    "<200m": 2,
    "<2km": 3,
    "<2km": 4,
    "<=200km": 5,
    ">200km": 6,
    "UNKNOWN": 7,
}

class ElementPositionError extends ElementScaffold {
    constructor(positionError){
        super(1, 3);

        if (positionError in def){
            this.positionError = positionError;
            this.value = def[positionError];
        } else {
            throw new Error(`Invalid Position Error: ${positionError}`);
        }
    }

    static fromValue(value){
        if (typeof value === 'string')  value = parseInt(value, 2);
        
        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementPositionError(key);
            }
        }
        throw new Error(`Invalid Position Error Value: ${value}`);
    }

    static isValid(value) {
        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementPositionError