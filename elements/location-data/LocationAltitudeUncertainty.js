const ElementScaffold = require('../scaffold');

const def = {
    "LESS-THAN-1-METER": 0,
    "LESS-THAN-2-METERS": 1,
    "LESS-THAN-5-METERS": 2,
    "LESS-THAN-15-METERS": 3,
    "LESS-THAN-50-METERS": 4,
    "LESS-THAN-150-METERS": 5,
    "LESS-THAN-300-METERS": 6,
    "BEST-EFFORT-OR-NOT-SUPPORTED": 7,
};

class ElementLocationAltitudealtitudeUncertainty extends ElementScaffold {
    constructor(altitudeUncertainty) {
        super(1, 3); // 3 bits for altitudeUncertainty

        if (!(altitudeUncertainty in def) && !Object.values(def).includes(altitudeUncertainty)) {
            throw new Error('Invalid Location Altitude altitudeUncertainty');
        }

        if (typeof altitudeUncertainty === 'string') {
            this.altitudeUncertainty = altitudeUncertainty;
            this.value = def[altitudeUncertainty];
        } else {
            this.altitudeUncertainty = Object.keys(def).find(key => def[key] === altitudeUncertainty);
            this.value = altitudeUncertainty;
        }
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        if (!Object.values(def).includes(value)) {
            throw new Error('Invalid value for Location Altitude altitudeUncertainty');
        }

        return new ElementLocationAltitudealtitudeUncertainty(value);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        return Object.values(def).includes(value);
    }

    static get def() {
        return def;
    }
}

module.exports = ElementLocationAltitudealtitudeUncertainty;
