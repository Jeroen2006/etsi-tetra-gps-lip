const ElementScaffold = require('./scaffold');

const def = {
    "REASON-FOR-SENDING": 0,
    "USER-DEFINED-DATA": 1,
};

class ElementTypeOfAdditionalData extends ElementScaffold {
    constructor(TypeOfAdditionalData) {
        super(1, 1); // 1-bit field

        if (TypeOfAdditionalData in def) {
            this.TypeOfAdditionalData = TypeOfAdditionalData;
            this.value = def[TypeOfAdditionalData];
        } else {
            throw new Error(`Invalid additional data type: ${TypeOfAdditionalData}`);
        }
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementTypeOfAdditionalData(key);
            }
        }

        throw new Error(`Invalid value for additional data type: ${value}`);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);
        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementTypeOfAdditionalData;