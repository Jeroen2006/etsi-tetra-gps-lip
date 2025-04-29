const ElementScaffold = require('./scaffold');
const { binaryToBigInt } = require("../utils");

const def = {
    "LONG-WITHOUT-TIME": 0,
    "LONG-WITH-TIME-ELAPSED": 1,
    "LONG-WITH-TIME-OF-POSITION": 2,
    "SHORT-LOCATION-REPORT": 3,
};

class ElementReportType extends ElementScaffold {
    constructor(reportType) {
        if (!(reportType in def)) {
            throw new Error(`Invalid Report Type: ${reportType}`);
        }

        super(1, 2); // 2 bits

        this.reportType = reportType;
        this.value = def[reportType];
        this.binary = this.value.toString(2).padStart(2, '0');
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(2, '0');
        const parsed = parseInt(binary, 2);

        for (const [key, val] of Object.entries(def)) {
            if (val === parsed) {
                return new ElementReportType(key);
            }
        }
        throw new Error(`Invalid Report Type Value: ${parsed}`);
    }

    static isValid(value) {
        try {
            this.fromValue(value);
            return true;
        } catch {
            return false;
        }
    }

    static get def() {
        return def;
    }
}

module.exports = ElementReportType;
