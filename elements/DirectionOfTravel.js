const ElementScaffold = require('./scaffold');

const def = {
    N: 0,
    NNE: 1,
    NE: 2,
    ENE: 3,
    E: 4,
    ESE: 5,
    SE: 6,
    SSE: 7,
    S: 8,
    SSW: 9,
    SW: 10,
    WSW: 11,
    W: 12,
    WNW: 13,
    NW: 14,
    NNW: 15,
};

class ElementDirectionOfTravel extends ElementScaffold {
    constructor(directionOfTravel) {
        super(1, 4);

        if (directionOfTravel in def) {
            this.directionOfTravel = directionOfTravel;
            this.value = def[directionOfTravel];
        } else {
            throw new Error(`Invalid direction of travel: ${directionOfTravel}`);
        }
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementDirectionOfTravel(key);
            }
        }
        throw new Error(`Invalid direction value: ${value}`);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);
        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementDirectionOfTravel;
