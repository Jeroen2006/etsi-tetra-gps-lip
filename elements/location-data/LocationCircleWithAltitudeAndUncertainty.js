const ElementScaffold = require('../scaffold');
const ElementLocationShape = require('./LocationShape');

const ElementLongitude = require("../Longitude");
const ElementLatitude = require("../Latitude");
const ElementHorizontalPositionUncertainty = require("./HorizontalPositionUncertainty");
const ElementLocationAltitude = require("./LocationAltitude");
const ElementLocationAltitudeUncertainty = require("./LocationAltitudeUncertainty");

const { binaryToBigInt } = require("../../utils");

class ElementLocationCircleWithAltitudeAndUncertainty extends ElementScaffold {
    constructor({ longitude, latitude, horizontalPositionUncertainty, altitude, altitudeUncertainty }) {
        super(1, 74); // 74 bits total

        this.locationShape = new ElementLocationShape("LOCATION-CIRCLE-WITH-ALTITUDE-AND-UNCERTAINTY");
        this.longitude = new ElementLongitude(longitude);
        this.latitude = new ElementLatitude(latitude);
        this.horizontalPositionUncertainty = new ElementHorizontalPositionUncertainty(horizontalPositionUncertainty);
        this.altitude = new ElementLocationAltitude(altitude);
        this.altitudeUncertainty = new ElementLocationAltitudeUncertainty(altitudeUncertainty);

        const locationShapeBinary = this.locationShape.toBinary();
        const longitudeBinary = this.longitude.toBinary();
        const latitudeBinary = this.latitude.toBinary();
        const horizontalPositionUncertaintyBinary = this.horizontalPositionUncertainty.toBinary();
        const altitudeBinary = this.altitude.toBinary();
        const altitudeUncertaintyBinary = this.altitudeUncertainty.toBinary();

        this.binary = locationShapeBinary + longitudeBinary + latitudeBinary + horizontalPositionUncertaintyBinary + altitudeBinary + altitudeUncertaintyBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);
        const binary = value.toString(2).padStart(74, '0');

        let index = 0;

        const locationShapeBits = binary.slice(index, index + 4); index += 4;
        const longitudeBits = binary.slice(index, index + 25); index += 25;
        const latitudeBits = binary.slice(index, index + 24); index += 24;
        const horizontalPositionUncertaintyBits = binary.slice(index, index + 6); index += 6;
        const altitudeBits = binary.slice(index, index + 12); index += 12;
        const altitudeUncertaintyBits = binary.slice(index, index + 3); index += 3;

        // Validate shape
        const { locationShape } = ElementLocationShape.fromValue(locationShapeBits);
        if (locationShape !== "LOCATION-CIRCLE-WITH-ALTITUDE-AND-UNCERTAINTY") {
            throw new Error("Invalid location shape type for this element.");
        }

        const { longitude } = ElementLongitude.fromValue(longitudeBits);
        const { latitude } = ElementLatitude.fromValue(latitudeBits);
        const { horizontalPositionUncertainty } = ElementHorizontalPositionUncertainty.fromValue(horizontalPositionUncertaintyBits);
        const { altitude } = ElementLocationAltitude.fromValue(altitudeBits);
        const { altitudeUncertainty } = ElementLocationAltitudeUncertainty.fromValue(altitudeUncertaintyBits);

        return new ElementLocationCircleWithAltitudeAndUncertainty({
            longitude: longitude,
            latitude: latitude,
            horizontalPositionUncertainty: horizontalPositionUncertainty,
            altitude: altitude,
            altitudeUncertainty: altitudeUncertainty
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

module.exports = ElementLocationCircleWithAltitudeAndUncertainty;
