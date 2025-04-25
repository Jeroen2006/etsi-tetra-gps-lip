const ElementScaffold = require('./scaffold');

const def = {
    "<5s": 0,
    "<5m": 1,
    "<30m": 2,
    "UNKNOWN-OR-NOT-APPLICABLE": 3,
}

class ElementTimeElapsed extends ElementScaffold {
    constructor(timeElapsed){
        super(1, 2);

        if (timeElapsed in def){
            this.timeElapsed = timeElapsed;
            this.value = def[timeElapsed];
        } else {
            throw new Error(`Invalid Time Elapsed: ${timeElapsed}`);
        }
    }

    static fromValue(value){
        if (typeof value === 'string')  value = parseInt(value, 2);
        
        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementTimeElapsed(key);
            }
        }
        throw new Error(`Invalid Time Elapsed Value: ${value}`);
    }

    static isValid(value) {
        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementTimeElapsed