const ElementScaffold = require('./scaffold');
const { binaryToBigInt } = require("../utils");

const lookup = {
    0: "10s",
    1: "20s",
    2: "30s",
    3: "40s",
    4: "50s",
    5: "1min",
    6: "1.5min",
    7: "2min",
    8: "2.5min",
    9: "3min",
    10: "3.5min",
    11: "4min",
    12: "4.5min",
    13: "5min",
    14: "5.5min",
    15: "6min",
    16: "6.5min",
    17: "7min",
    18: "7.5min",
    19: "8min",
    20: "8.5min",
    21: "9min",
    22: "9.5min",
    23: "10min",
    24: "10.5min",
    25: "11min",
    26: "11.5min",
    27: "12min",
    28: "12.5min",
    29: "5min",
    30: "5.5min",
    31: "6min",
    32: "6.5min",
    33: "7min",
    34: "7.5min",
    35: "8min",
    36: "8.5min",
    37: "9min",
    38: "9.5min",
    39: "10min",
    40: "10.5min",
    41: "11min",
    42: "11.5min",
    43: "12min",
    44: "12.5min",
    45: "13min",
    46: "13.5min",
    47: "14min",
    48: "14.5min",
    49: "15min",
    50: "15.5min",
    51: "16min",
    52: "16.5min",
    53: "17min",
    54: "17.5min",
    55: "18min",
    56: "18.5min",
    57: "19min",
    58: "19.5min",
    59: "20min",
    60: "21min",
    61: "22min",
    62: "23min",
    63: "24min",
    64: "25min",
    65: "26min",
    66: "27min",
    67: "28min",
    68: "29min",
    69: "30min",
    70: "31min",
    71: "32min",
    72: "33min",
    73: "34min",
    74: "35min",
    75: "36min",
    76: "37min",
    77: "38min",
    78: "39min",
    79: "40min",
    80: "41min",
    81: "42min",
    82: "43min",
    83: "44min",
    84: "45min",
    85: "46min",
    86: "47min",
    87: "48min",
    88: "49min",
    89: "50min",
    90: "51min",
    91: "52min",
    92: "53min",
    93: "54min",
    94: "55min",
    95: "56min",
    96: "57min",
    97: "58min",
    98: "59min",
    99: "60min",
    100: "61min",
    101: "62min",
    102: "63min",
    103: "64min",
    104: "65min",
    105: "66min",
    106: "67min",
    107: "68min",
    108: "69min",
    109: "70min",
    110: "71min",
    111: "72min",
    112: "73min",
    113: "74min",
    114: "75min",
    115: "76min",
    116: "77min",
    117: "78min",
    118: "79min",
    119: "80min",
    120: "81min",
    121: "82min",
    122: "83min",
    123: "84min",
    124: "85min",
    125: "86min",
    126: "87min",
    127: "88min",
};

class ElementMinimumReportingminimumReportingInterval extends ElementScaffold {
    constructor(minimumReportingInterval) {
        super(1, 7); // 7 bits

        const encodedValue = Object.entries(lookup).find(([k, v]) => v === minimumReportingInterval);
        if (!encodedValue) {
            throw new Error(`Invalid minimumReportingInterval: ${minimumReportingInterval}`);
        }

        this.minimumReportingInterval = minimumReportingInterval;
        this.encodedValue = parseInt(encodedValue[0], 10);
        this.binary = this.encodedValue.toString(2).padStart(7, '0');
        this.value = binaryToBigInt(this.binary);
    }

    static fromValue(value) {
        if (typeof value === 'string') value = binaryToBigInt(value);

        const binary = value.toString(2).padStart(7, '0');
        const encodedValue = parseInt(binary, 2);

        const minimumReportingInterval = lookup[encodedValue];
        if (!minimumReportingInterval) {
            throw new Error(`Invalid Minimum Reporting minimumReportingInterval encoded value: ${encodedValue}`);
        }

        return new ElementMinimumReportingminimumReportingInterval(minimumReportingInterval);
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

module.exports = ElementMinimumReportingminimumReportingInterval;
