const ElementScaffold = require('../scaffold');

const A = 2;
const x = 0.2;
const B = 5;
const C = -4;

const { metersToString } = require('../../utils');

// Direct table values from the spec
const lookupTable = {
    63: "BEST-EFFORT",
};

//for loop 0-62
for (let i = 0; i < 63; i++) {
    //Horizontal position accuracy = A × (1 + x)(K + B) + C, where: 
    const meters = Math.round(A * Math.pow(1 + x, i + B) + C);
    lookupTable[i] = `<${metersToString(meters)}`
}

class ElementHorizontalPositionUncertainty extends ElementScaffold {
    constructor(horizontalPositionUncertainty) {
        const lookupTableValues = Object.values(lookupTable);
        if(!lookupTableValues.includes(horizontalPositionUncertainty)) throw new Error('Invalid Horizontal Position Uncertainty value');

        super(1, 6); // 6 bits

        this.horizontalPositionUncertainty = horizontalPositionUncertainty;
        const horizontalPositionUncertaintyValue = lookupTableValues.indexOf(horizontalPositionUncertainty);
        this.value = horizontalPositionUncertaintyValue;
    }

    static fromValue(horizontalPositionUncertainty) {
        if (typeof horizontalPositionUncertainty === 'string') horizontalPositionUncertainty = parseInt(horizontalPositionUncertainty, 2);

        if (!isValidEncodedHpu(horizontalPositionUncertainty)) {
            throw new Error('Invalid Horizontal Position Uncertainty encoded value');
        }

        horizontalPositionUncertainty = lookupTable[horizontalPositionUncertainty];

        return new ElementHorizontalPositionUncertainty(horizontalPositionUncertainty);
    }

    static isValid(horizontalPositionUncertainty) {
        if (typeof horizontalPositionUncertainty === 'string') horizontalPositionUncertainty = parseInt(horizontalPositionUncertainty, 2);

        return isValidEncodedHpu(horizontalPositionUncertainty);
    }

}

module.exports = ElementHorizontalPositionUncertainty;

// --- Helper validation function ---

function isValidEncodedHpu(value) {
    return Number.isInteger(value) && value >= 0 && value <= 63;
}
