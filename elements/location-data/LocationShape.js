const ElementScaffold = require('../scaffold');

const def = {
    "NO-SHAPE": 0,
    "LOCATION-POINT": 1,
    "LOCATION-CIRCLE": 2,
    "LOCATION-ELLIPSE": 3,
    "LOCATION-POINT-WITH-ALTITUDE": 4,
    "LOCATION-CIRCLE-WITH-ALTITUDE": 5,
    "LOCATION-ELLIPSE-WITH-ALTITUDE": 6,
    "LOCATION-CIRCLE-WITH-ALTITUDE-AND-UNCERTAINTY": 7,
    "LOCATION-ELLIPSE-WITH-ALTITUDE-AND-UNCERTAINTY": 8,
    "LOCATION-ARC": 9,
    "LOCATION-POINT-AND-POSITION-ERROR": 10,
    "RESERVED-11": 11,
    "RESERVED-12": 12,
    "RESERVED-13": 13,
    "RESERVED-14": 14,
    "LOCATION-SHAPE-EXTENSION": 15,
};

class ElementLocationShape extends ElementScaffold {
    constructor(locationShape) {
        super(1, 4); // 4 bits

        if (locationShape in def) {
            this.locationShape = locationShape;
            this.value = def[locationShape];
        } else {
            throw new Error(`Invalid Location Shape: ${locationShape}`);
        }
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        for (const [key, val] of Object.entries(def)) {
            if (val === value) {
                return new ElementLocationShape(key);
            }
        }

        throw new Error(`Invalid Location Shape value: ${value}`);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);
        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementLocationShape;
