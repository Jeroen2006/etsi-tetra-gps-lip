const ElementScaffold = require('../../scaffold');

class ElementTriggerSDSType1Value extends ElementScaffold {
    constructor(sdsType1Value) {
        super(1, 16); 

        //check if sdsType1Value is a valid status value (0-65536)
        if(sdsType1Value > 65535 || sdsType1Value < 0) throw new Error('Invalid Result Code value. Must be between 0 and 65535');

        this.sdsType1Value = sdsType1Value;
        this.value = sdsType1Value
    }

    static fromValue(value) {
        if (value.length !== 16) throw new Error('Invalid length for status value');

        const sdsType1ValueBits = value.slice(0, 16);
        const sdsType1Value = parseInt(sdsType1ValueBits, 2);

        return new ElementTriggerSDSType1Value(sdsType1Value);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementTriggerSDSType1Value;
