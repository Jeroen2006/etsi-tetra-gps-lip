const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const { binaryToBigInt } = require('../../utils');

class ElementType5StartTime extends ElementScaffold {
    constructor({ seconds, minutes, hours, day }) {
        super(1, 22); 

        if(seconds > 59 || seconds < 0) throw new Error('Invalid seconds value. Must be between 0 and 59');
        if(minutes > 59 || minutes < 0) throw new Error('Invalid minutes value. Must be between 0 and 59');
        if(hours > 23 || hours < 0) throw new Error('Invalid hours value. Must be between 0 and 23');
        if(day > 31 || day < 0) throw new Error('Invalid day value. Must be between 0 and 31');

        this.elementIdentifier = new ElementType5ElementIdentifier("START-TIME");
        this.elementLength = new ElementType5ElementLength(22);
        this.seconds = seconds;
        this.minutes = minutes;
        this.hours = hours;
        this.day = day;

        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const dayBits = this.day.toString(2).padStart(5, '0');
        const hoursBits = this.hours.toString(2).padStart(5, '0');
        const minutesBits = this.minutes.toString(2).padStart(6, '0');
        const secondsBits = this.seconds.toString(2).padStart(6, '0');

        var bitString = elementIdentifierBits + elementLengthBits + dayBits + hoursBits + minutesBits + secondsBits;
        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        if (value.length !== 22) throw new Error('Invalid length for start time value');

        const startTimeBits = value.slice(0, 22);
        const dayBits = startTimeBits.slice(0, 5);
        const hoursBits = startTimeBits.slice(5, 10);
        const minutesBits = startTimeBits.slice(10, 16);
        const secondsBits = startTimeBits.slice(16, 22);

        const day = parseInt(dayBits, 2);
        const hours = parseInt(hoursBits, 2);
        const minutes = parseInt(minutesBits, 2);
        const seconds = parseInt(secondsBits, 2);

        return new ElementType5StartTime({ seconds, minutes, hours, day });
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementType5StartTime;
