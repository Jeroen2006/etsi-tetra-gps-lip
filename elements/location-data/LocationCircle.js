const ElementScaffold = require('../scaffold');
const ElementLocationShape = require('./LocationShape');

const ElementLongitude = require("../Longitude");
const ElementLatitude = require("../Latitude");
const ElementHorizontalPositionUncertainty = require("./HorizontalPositionUncertainty");

const { binaryToBigInt } = require("../../utils");

class ElementLocationCircle extends ElementScaffold {
    constructor({ longitude, latitude, horizontalPositionUncertainty }) {
        super(1, 59); // 59 bits total

        this.locationShape = new ElementLocationShape("LOCATION-CIRCLE");
        this.longitude = new ElementLongitude(longitude);
        this.latitude = new ElementLatitude(latitude);
        this.horizontalPositionUncertainty = new ElementHorizontalPositionUncertainty(horizontalPositionUncertainty);

        const locationShapeBinary = this.locationShape.toBinary();
        const longitudeBinary = this.longitude.toBinary();
        const latitudeBinary = this.latitude.toBinary();
        const horizontalPositionUncertaintyBinary = this.horizontalPositionUncertainty.toBinary();

        this.binary = locationShapeBinary + longitudeBinary + latitudeBinary + horizontalPositionUncertaintyBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);
        const binary = value.toString(2).padStart(59, '0');

        let index = 0;

        const locationShapeBits = binary.slice(index, index + 4); index += 4;
        const longitudeBits = binary.slice(index, index + 25); index += 25;
        const latitudeBits = binary.slice(index, index + 24); index += 24;
        const horizontalPositionUncertaintyBits = binary.slice(index, index + 6); index += 6;

        // Validate shape
        const { locationShape } = ElementLocationShape.fromValue(locationShapeBits);
        if (locationShape !== "LOCATION-CIRCLE") {
            throw new Error("Invalid location shape type for this element.");
        }

        const { longitude } = ElementLongitude.fromValue(longitudeBits);
        const { latitude } = ElementLatitude.fromValue(latitudeBits);
        const { horizontalPositionUncertainty } = ElementHorizontalPositionUncertainty.fromValue(horizontalPositionUncertaintyBits);

        return new ElementLocationCircle({
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

module.exports = ElementLocationCircle;
