const ElementScaffold = require('../scaffold');
const ElementLocationShape = require('./LocationShape');

const ElementLongitude = require("../Longitude");
const ElementLatitude = require("../Latitude");
const ElementHorizontalPositionUncertainty = require("./HorizontalPositionUncertainty");
const ElementLocationAltitude = require("./LocationAltitude");

const { binaryToBigInt } = require("../../utils");

class ElementLocationCircleWithAltitude extends ElementScaffold {
    constructor({ longitude, latitude, horizontalPositionUncertainty, altitude }) {
        super(1, 71); // 71 bits total

        this.locationShape = new ElementLocationShape("LOCATION-CIRCLE-WITH-ALTITUDE");
        this.longitude = new ElementLongitude(longitude);
        this.latitude = new ElementLatitude(latitude);
        this.horizontalPositionUncertainty = new ElementHorizontalPositionUncertainty(horizontalPositionUncertainty);
        this.altitude = new ElementLocationAltitude(altitude);

        const locationShapeBinary = this.locationShape.toBinary();
        const longitudeBinary = this.longitude.toBinary();
        const latitudeBinary = this.latitude.toBinary();
        const horizontalPositionUncertaintyBinary = this.horizontalPositionUncertainty.toBinary();
        const altitudeBinary = this.altitude.toBinary();

        this.binary = locationShapeBinary + longitudeBinary + latitudeBinary + horizontalPositionUncertaintyBinary + altitudeBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);
        const binary = value.toString(2).padStart(71, '0');

        let index = 0;

        const locationShapeBits = binary.slice(index, index + 4); index += 4;
        const longitudeBits = binary.slice(index, index + 25); index += 25;
        const latitudeBits = binary.slice(index, index + 24); index += 24;
        const horizontalPositionUncertaintyBits = binary.slice(index, index + 6); index += 6;
        const altitudeBits = binary.slice(index, index + 12); index += 12;

        // Validate shape
        const { locationShape } = ElementLocationShape.fromValue(locationShapeBits);
        if (locationShape !== "LOCATION-CIRCLE-WITH-ALTITUDE") {
            throw new Error("Invalid location shape type for this element.");
        }

        const { longitude } = ElementLongitude.fromValue(longitudeBits);
        const { latitude } = ElementLatitude.fromValue(latitudeBits);
        const { horizontalPositionUncertainty } = ElementHorizontalPositionUncertainty.fromValue(horizontalPositionUncertaintyBits);
        const { altitude } = ElementLocationAltitude.fromValue(altitudeBits);

        return new ElementLocationCircleWithAltitude({
            longitude: longitude,
            latitude: latitude,
            horizontalPositionUncertainty: horizontalPositionUncertainty,
            altitude: altitude
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

module.exports = ElementLocationCircleWithAltitude;
