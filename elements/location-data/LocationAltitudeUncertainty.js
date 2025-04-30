const ElementScaffold = require('../scaffold');

const def = {
    "<1m": 0,
    "<2m": 1,
    "<5m": 2,
    "<15m": 3,
    "<50m": 4,
    "<150m": 5,
    "<300m": 6,
    "BEST-EFFORT": 7,
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
