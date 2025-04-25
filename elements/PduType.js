const ElementScaffold = require('./scaffold');

const def = {
    "SHORT-LOCATION-REPORT": 0,
    "LOCATION-PROTOCOL-PDU-WITH-EXTENSION": 1,
    "RESERVED": 2,
    "RESERVED": 3,
}

class ElementPduType extends ElementScaffold {
    constructor(pduType){
        super(1, 2);

        if (pduType in def){
            this.pduType = pduType;
            this.value = def[pduType];
        } else {
            throw new Error(`Invalid PDU Type: ${pduType}`);
        }
    }

    static fromValue(value){
        if (typeof value === 'string')  value = parseInt(value, 2);

        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementPduType(key);
            }
        }
        throw new Error(`Invalid PDU Value: ${value}`);
    }

    static isValid(value) {
        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementPduType