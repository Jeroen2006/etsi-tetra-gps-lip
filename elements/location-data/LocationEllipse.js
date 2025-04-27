const ElementScaffold = require('../scaffold');
const ElementLocationShape = require('./LocationShape');

const ElementLongitude = require("../Longitude");
const ElementLatitude = require("../Latitude");
const ElementHalfMajorAxis = require("./HalfOfMajorAxis");
const ElementHalfMinorAxis = require("./HalfOfMinorAxis");
const ElementAngle = require("./Angle");
const ElementConfidenceLevel = require("./ConfidenceLevel");

const { binaryToBigInt } = require("../../utils");

class ElementLocationEllipse extends ElementScaffold {
    constructor({ longitude, latitude, halfOfMajorAxis, halfOfMinorAxis, angle, confidenceLevel }) {
        super(1, 76); // 76 bits total

        this.locationShape = new ElementLocationShape("LOCATION-ELLIPSE");
        this.longitude = new ElementLongitude(longitude);
        this.latitude = new ElementLatitude(latitude);
        this.halfOfMajorAxis = new ElementHalfMajorAxis(halfOfMajorAxis);
        this.halfOfMinorAxis = new ElementHalfMinorAxis(halfOfMinorAxis);
        this.angle = new ElementAngle(angle);
        this.confidenceLevel = new ElementConfidenceLevel(confidenceLevel);

        const locationShapeBinary = this.locationShape.toBinary();
        const longitudeBinary = this.longitude.toBinary();
        const latitudeBinary = this.latitude.toBinary();
        const halfOfMajorAxisBinary = this.halfOfMajorAxis.toBinary();
        const halfOfMinorAxisBinary = this.halfOfMinorAxis.toBinary();
        const angleBinary = this.angle.toBinary();
        const confidenceLevelBinary = this.confidenceLevel.toBinary();

        this.binary = locationShapeBinary + longitudeBinary + latitudeBinary + halfOfMajorAxisBinary + halfOfMinorAxisBinary + angleBinary + confidenceLevelBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);
        const binary = value.toString(2).padStart(76, '0');

        let index = 0;

        const locationShapeBits = binary.slice(index, index + 4); index += 4;
        const longitudeBits = binary.slice(index, index + 25); index += 25;
        const latitudeBits = binary.slice(index, index + 24); index += 24;
        const halfMajorBits = binary.slice(index, index + 6); index += 6;
        const halfMinorBits = binary.slice(index, index + 6); index += 6;
        const angleBits = binary.slice(index, index + 8); index += 8;
        const confidenceLevelBits = binary.slice(index, index + 3); index += 3;

        // Validate shape
        const { locationShape } = ElementLocationShape.fromValue(locationShapeBits);
        if (locationShape !== "LOCATION-ELLIPSE") {
            throw new Error("Invalid location shape type for this element.");
        }

        const { longitude } = ElementLongitude.fromValue(longitudeBits);
        const { latitude } = ElementLatitude.fromValue(latitudeBits);
        const { halfOfMajorAxis } = ElementHalfMajorAxis.fromValue(halfMajorBits);
        const { halfOfMinorAxis } = ElementHalfMinorAxis.fromValue(halfMinorBits);
        const { angle } = ElementAngle.fromValue(angleBits);
        const { confidenceLevel } = ElementConfidenceLevel.fromValue(confidenceLevelBits);

        return new ElementLocationEllipse({
            longitude: longitude,
            latitude: latitude,
            halfOfMajorAxis: halfOfMajorAxis,
            halfOfMinorAxis: halfOfMinorAxis,
            angle: angle,
            confidenceLevel: confidenceLevel
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

module.exports = ElementLocationEllipse;
