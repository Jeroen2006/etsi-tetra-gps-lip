const ElementScaffold = require('../scaffold');
const ElementLocationShape = require('./LocationShape');

const ElementLongitude = require("../Longitude");
const ElementLatitude = require("../Latitude");
const ElementPositionError = require("../PositionError");

const { binaryToBigInt } = require("../../utils");

class ElementLocationPointAndPositionError extends ElementScaffold {
    constructor({ longitude, latitude, positionError }) {
        super(1, 56); // 56 bits total

        this.locationShape = new ElementLocationShape("LOCATION-POINT-AND-POSITION-ERROR");
        this.longitude = new ElementLongitude(longitude);
        this.latitude = new ElementLatitude(latitude);
        this.positionError = new ElementPositionError(positionError);

        const locationShapeBinary = this.locationShape.toBinary();
        const longitudeBinary = this.longitude.toBinary();
        const latitudeBinary = this.latitude.toBinary();
        const positionErrorBinary = this.positionError.toBinary();

        this.binary = locationShapeBinary + longitudeBinary + latitudeBinary + positionErrorBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);
        const binary = value.toString(2).padStart(56, '0');

        let index = 0;

        const locationShapeBits = binary.slice(index, index + 4); index += 4;
        const longitudeBits = binary.slice(index, index + 25); index += 25;
        const latitudeBits = binary.slice(index, index + 24); index += 24;
        const positionErrorBits = binary.slice(index, index + 3); index += 3;

        // Validate shape
        const { locationShape } = ElementLocationShape.fromValue(locationShapeBits);
        if (locationShape !== "LOCATION-POINT-AND-POSITION-ERROR") {
            throw new Error("Invalid location shape type for this element.");
        }

        const { longitude } = ElementLongitude.fromValue(longitudeBits);
        const { latitude } = ElementLatitude.fromValue(latitudeBits);
        const { positionError } = ElementPositionError.fromValue(positionErrorBits);

        return new ElementLocationPointAndPositionError({
            longitude: longitude,
            latitude: latitude,
            positionError: positionError
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

module.exports = ElementLocationPointAndPositionError;
