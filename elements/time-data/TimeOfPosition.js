const ElementScaffold = require('../scaffold');
const ElementTimeType = require('./TimeType'); // using your TimeType class

class ElementTimeOfPosition extends ElementScaffold {
    constructor({ day, hour, minute, second }) {
        if (!isValidDay(day) || !isValidHour(hour) || !isValidMinute(minute) || !isValidSecond(second)) {
            throw new Error('Invalid timeOfPosition fields');
        }

        const timeType = new ElementTimeType('TIME-OF-POSITION');

        super(1, 24); // 2 bits for Time Type + 22 bits for day/hour/minute/second

        this.timeType = timeType;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;

        this.value = (timeType.value << 22) |
                     (day << 17) |
                     (hour << 12) |
                     (minute << 6) |
                     second;
    }

    static fromValue(value) {
        if (typeof value === 'string') value = parseInt(value, 2);
    
        // Remove TimeType (already assumed TIME-OF-POSITION when using this class)
        const day = (value >> 17) & 0b11111;
        const hour = (value >> 12) & 0b11111;
        const minute = (value >> 6) & 0b111111;
        const second = value & 0b111111;
    
        return new ElementTimeOfPosition({ day, hour, minute, second });
    }

    static isValid({ day, hour, minute, second }) {
        return isValidDay(day) && isValidHour(hour) && isValidMinute(minute) && isValidSecond(second);
    }
}

module.exports = ElementTimeOfPosition;

// --- Helper validation functions ---

function isValidDay(d) {
    return Number.isInteger(d) && d >= 1 && d <= 31;
}

function isValidHour(h) {
    return Number.isInteger(h) && h >= 0 && h <= 23;
}

function isValidMinute(m) {
    return Number.isInteger(m) && m >= 0 && m <= 59;
}

function isValidSecond(s) {
    return Number.isInteger(s) && s >= 0 && s <= 59;
}
