const ElementScaffold = require('../scaffold');
const ElementLocationShape = require('./LocationShape');

const ElementLongitude = require("../Longitude");
const ElementLatitude = require("../Latitude");
const ElementInnerRadius = require("./InnerRadius");
const ElementOuterRadius = require("./OuterRadius");
const ElementStartAngle = require("./StartAngle");
const ElementStopAngle = require("./StopAngle");
const ElementConfidenceLevel = require("./ConfidenceLevel");

const { binaryToBigInt } = require("../../utils");

class ElementLocationArc extends ElementScaffold {
    constructor({ longitude, latitude, innerRadius, outerRadius, startAngle, stopAngle, confidenceLevel }) {
        super(1, 104); // 53 bits total

        this.locationShape = new ElementLocationShape("LOCATION-ARC");
        this.longitude = new ElementLongitude(longitude);
        this.latitude = new ElementLatitude(latitude);
        this.innerRadius = new ElementInnerRadius(innerRadius);
        this.outerRadius = new ElementOuterRadius(outerRadius);
        this.startAngle = new ElementStartAngle(startAngle);
        this.stopAngle = new ElementStopAngle(stopAngle);
        this.confidenceLevel = new ElementConfidenceLevel(confidenceLevel);

        const locationShapeBinary = this.locationShape.toBinary();
        const longitudeBinary = this.longitude.toBinary();
        const latitudeBinary = this.latitude.toBinary();
        const innerRadiusBinary = this.innerRadius.toBinary();
        const outerRadiusBinary = this.outerRadius.toBinary();
        const startAngleBinary = this.startAngle.toBinary();
        const stopAngleBinary = this.stopAngle.toBinary();
        const confidenceLevelBinary = this.confidenceLevel.toBinary();

        this.binary = locationShapeBinary + longitudeBinary + latitudeBinary + innerRadiusBinary + outerRadiusBinary + startAngleBinary + stopAngleBinary + confidenceLevelBinary;
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);
        const binary = value.toString(2).padStart(104, '0');

        let index = 0;

        const locationShapeBits = binary.slice(index, index + 4); index += 4;
        const longitudeBits = binary.slice(index, index + 25); index += 25;
        const latitudeBits = binary.slice(index, index + 24); index += 24;
        const innerRadiusBits = binary.slice(index, index + 16); index += 16;
        const outerRadiusBits = binary.slice(index, index + 16); index += 16;
        const startAngleBits = binary.slice(index, index + 8); index += 8;
        const stopAngleBits = binary.slice(index, index + 8); index += 8;
        const confidenceLevelBits = binary.slice(index, index + 3); index += 3;

        // Validate shape
        const { locationShape } = ElementLocationShape.fromValue(locationShapeBits);
        if (locationShape !== "LOCATION-ARC") {
            throw new Error("Invalid location shape type for this element.");
        }

        const { longitude } = ElementLongitude.fromValue(longitudeBits);
        const { latitude } = ElementLatitude.fromValue(latitudeBits);
        const { innerRadius } = ElementInnerRadius.fromValue(innerRadiusBits);
        const { outerRadius } = ElementOuterRadius.fromValue(outerRadiusBits);
        const { startAngle } = ElementStartAngle.fromValue(startAngleBits);
        const { stopAngle } = ElementStopAngle.fromValue(stopAngleBits);
        const { confidenceLevel } = ElementConfidenceLevel.fromValue(confidenceLevelBits);

        return new ElementLocationArc({
            longitude: longitude,
            latitude: latitude,
            innerRadius: innerRadius,
            outerRadius: outerRadius,
            startAngle: startAngle,
            stopAngle: stopAngle,
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

module.exports = ElementLocationArc;
