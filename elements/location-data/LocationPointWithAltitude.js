const ElementScaffold = require('../scaffold');
const ElementLocationShape = require('./LocationShape');

const ElementLongitude = require("../Longitude");
const ElementLatitude = require("../Latitude");
const ElementLocationAltitude = require("./LocationAltitude");

const { binaryToBigInt } = require("../../utils");

class ElementLocationPointWithAltitude extends ElementScaffold {
    constructor({ longitude, latitude, altitude }) {
        super(1, 65); // 53 bits total

        this.locationShape = new ElementLocationShape("LOCATION-POINT-WITH-ALTITUDE");
        this.longitude = new ElementLongitude(longitude);
        this.latitude = new ElementLatitude(latitude);
        this.altitude = new ElementLocationAltitude(altitude);

        const locationShapeBinary = this.locationShape.toBinary();
        const longitudeBinary = this.longitude.toBinary();
        const latitudeBinary = this.latitude.toBinary();
        const altitudeBinary = this.altitude.toBinary();

        this.binary = locationShapeBinary + longitudeBinary + latitudeBinary + altitudeBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);
        const binary = value.toString(2).padStart(65, '0');

        let index = 0;

        const locationShapeBits = binary.slice(index, index + 4); index += 4;
        const longitudeBits = binary.slice(index, index + 25); index += 25;
        const latitudeBits = binary.slice(index, index + 24); index += 24;
        const altitudeBits = binary.slice(index, index + 12); index += 12;

        // Validate shape
        const { locationShape } = ElementLocationShape.fromValue(locationShapeBits);
        if (locationShape !== "LOCATION-POINT-WITH-ALTITUDE") {
            throw new Error("Invalid location shape type for this element.");
        }

        const { longitude } = ElementLongitude.fromValue(longitudeBits);
        const { latitude } = ElementLatitude.fromValue(latitudeBits);
        const { altitude } = ElementLocationAltitude.fromValue(altitudeBits);

        return new ElementLocationPointWithAltitude({
            longitude: longitude,
            latitude: latitude,
            altitude: altitude,
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

module.exports = ElementLocationPointWithAltitude;
