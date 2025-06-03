const ElementScaffold = require('./scaffold');

const def = {
    "RETURN-TO-NORMAL-REPORTING": 0,
    "UNTIL-NEXT-LOCATION-UPDATE": 1,
    "UNTIL-NEXT-ITSI-ATTATCH": 2,
    "UNTIL-NORMAL-REPORTING-NOTIFICATION": 3,
    "10m": 8,
    "20m": 9,
    "30m": 10,
    "40m": 11,
    "50m": 12,
    "60m": 13,
    "70m": 14,
    "NO-TIMEOUT": 15,
}

class ElementTemporaryControlValidity extends ElementScaffold {
    constructor(temporaryControlValidity){
        super(1, 4);

        if (temporaryControlValidity in def){
            this.temporaryControlValidity = temporaryControlValidity;
            this.value = def[temporaryControlValidity];
        } else {
            throw new Error(`Invalid Temporary Control Validity: ${temporaryControlValidity}`);
        }
    }

    static fromValue(value){
        if (typeof value === 'string')  value = parseInt(value, 2);
        
        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementTemporaryControlValidity(key);
            }
        }
        throw new Error(`Invalid temporary control validity value: ${value}`);
    }

    static isValid(value) {
        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementTemporaryControlValidity