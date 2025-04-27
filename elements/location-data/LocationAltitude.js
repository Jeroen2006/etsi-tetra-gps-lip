const ElementScaffold = require('../scaffold');

const ALTITUDE_TYPE_WGS84 = 0;
const ALTITUDE_TYPE_USER_DEFINED = 1;

class ElementLocationAltitude extends ElementScaffold {
    constructor(altitude) {
        if (typeof altitude !== 'number' || !isValidAltitude(altitude)) {
            throw new Error('Invalid altitude value.');
        }

        super(1, 12); // 1 bit type + 11 bits altitude

        this.altitudeType = ALTITUDE_TYPE_WGS84;
        this.altitude = altitude;
        this.value = encodeAltitude(this.altitudeType, altitude);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        const type = (value >> 11) & 0b1;
        const rawAltitude = value & 0x7FF; // 11 bits

        if (type !== ALTITUDE_TYPE_WGS84) {
            throw new Error('Unsupported Location Altitude Type (expected WGS84 = 0)');
        }

        const altitude = decodeAltitude(rawAltitude);
        return new ElementLocationAltitude(altitude);
    }

    static isValid(value) {
        if (typeof value === 'string') value = parseInt(value, 2);

        const type = (value >> 11) & 0b1;
        if (type !== ALTITUDE_TYPE_WGS84) return false;

        const rawAltitude = value & 0x7FF;
        try {
            decodeAltitude(rawAltitude);
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = ElementLocationAltitude;

// --- Helper functions ---

function encodeAltitude(type, altitude) {
    if (type !== ALTITUDE_TYPE_WGS84) {
        throw new Error('Only WGS84 encoding supported.');
    }

    let encoded;

    if (altitude < -200 || altitude > 11525) {
        throw new Error('Altitude out of range.');
    } else if (altitude <= 1000) {
        encoded = altitude + 201;
    } else if (altitude <= 2450) {
        encoded = Math.floor((altitude - 1000) / 2) + 1201;
    } else {
        encoded = Math.floor((altitude - 2450) / 75) + 1927;
    }

    return (type << 11) | (encoded & 0x7FF);
}

function decodeAltitude(raw) {
    if (raw === 0) {
        throw new Error('Altitude value reserved.');
    } else if (raw >= 1 && raw <= 1200) {
        return raw - 201;
    } else if (raw >= 1201 && raw <= 1926) {
        return ((raw - 1201) * 2) + 1000;
    } else if (raw >= 1927 && raw <= 2047) {
        return ((raw - 1927) * 75) + 2450;
    } else {
        throw new Error('Invalid encoded altitude.');
    }
}

function isValidAltitude(altitude) {
    return typeof altitude === 'number' && altitude >= -200 && altitude <= 11525;
}
