const ElementScaffold = require('./scaffold');
const { binaryToBigInt } = require('../utils');

class ElementLocationReportingEnableFlags extends ElementScaffold {
    constructor({ globalEnable, backlogRecording }) {
        super(1, 8); // 8 bits

        this.globalEnable = !!globalEnable; // boolean
        this.backlogRecording = !!backlogRecording; // boolean
        this.reservedFlags = Array(6).fill(0); // Always 0 for now

        const bits = [
            this.globalEnable ? '1' : '0',
            this.backlogRecording ? '1' : '0',
            ...this.reservedFlags.map(() => '0')
        ].join('');

        this.binary = bits;
        this.value = binaryToBigInt(bits);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const bits = value.toString(2).padStart(8, '0');

        const globalEnable = bits[0] === '1';
        const backlogRecording = bits[1] === '1';

        return new ElementLocationReportingEnableFlags({ globalEnable, backlogRecording });
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

module.exports = ElementLocationReportingEnableFlags;
