const ElementScaffold = require('../../scaffold');

const ElementLongitude = require("../../Longitude");
const ElementLatitude = require("../../Latitude");

const { binaryToBigInt } = require("../../../utils");

class ElementTriggerLocationPoint extends ElementScaffold {
    constructor({ longitude, latitude }) {
        super(1, 49);

        this.longitude = new ElementLongitude(longitude);
        this.latitude = new ElementLatitude(latitude);

        const longitudeBinary = this.longitude.toBinary();
        const latitudeBinary = this.latitude.toBinary();

        this.binary = longitudeBinary + latitudeBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);
        const binary = value.toString(2).padStart(49, '0');

        let index = 0;

        const longitudeBits = binary.slice(index, index + 25); index += 25;
        const latitudeBits = binary.slice(index, index + 24); index += 24;

        const { longitude } = ElementLongitude.fromValue(longitudeBits);
        const { latitude } = ElementLatitude.fromValue(latitudeBits);

        return new ElementTriggerLocationPoint({
            longitude: longitude,
            latitude: latitude,
        });
    }

    static isValid(value) {
        try {
            this.fromValue(value);
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = ElementTriggerLocationPoint;
