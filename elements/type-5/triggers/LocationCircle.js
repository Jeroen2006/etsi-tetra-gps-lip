const ElementScaffold = require('../../scaffold');

const ElementLongitude = require("../../Longitude");
const ElementLatitude = require("../../Latitude");
const ElementHorizontalPositionUncertainty = require("../../location-data/HorizontalPositionUncertainty");

const { binaryToBigInt } = require("../../../utils");

class ElementTriggerLocationCircle extends ElementScaffold {
    constructor({ longitude, latitude, horizontalPositionUncertainty }) {
        super(1, 55); // 55 bits total

        this.longitude = new ElementLongitude(longitude);
        this.latitude = new ElementLatitude(latitude);
        this.horizontalPositionUncertainty = new ElementHorizontalPositionUncertainty(horizontalPositionUncertainty);

        const longitudeBinary = this.longitude.toBinary();
        const latitudeBinary = this.latitude.toBinary();
        const horizontalPositionUncertaintyBinary = this.horizontalPositionUncertainty.toBinary();

        this.binary = longitudeBinary + latitudeBinary + horizontalPositionUncertaintyBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);
        const binary = value.toString(2).padStart(55, '0');

        let index = 0;

        const longitudeBits = binary.slice(index, index + 25); index += 25;
        const latitudeBits = binary.slice(index, index + 24); index += 24;
        const horizontalPositionUncertaintyBits = binary.slice(index, index + 6); index += 6;

        const { longitude } = ElementLongitude.fromValue(longitudeBits);
        const { latitude } = ElementLatitude.fromValue(latitudeBits);
        const { horizontalPositionUncertainty } = ElementHorizontalPositionUncertainty.fromValue(horizontalPositionUncertaintyBits);

        return new ElementTriggerLocationCircle({
            longitude: longitude,
            latitude: latitude,
            horizontalPositionUncertainty: horizontalPositionUncertainty
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

module.exports = ElementTriggerLocationCircle;
