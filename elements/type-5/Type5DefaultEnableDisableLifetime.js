const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const { binaryToBigInt } = require('../../utils');

const def = {
    0: 'UNTIL-MIGRATION',
    1: 'UNTIL-NEXT-ITSI-ATTACH',
};

class ElementType5DefaultEnableDisableLifetime extends ElementScaffold {
    constructor(defaultEnableDisableLifetime) {
        super(1, 2); 

        if(!Object.values(def).includes(defaultEnableDisableLifetime)) throw new Error('Invalid Default Enable Disable Lifetime value');
        this.defaultEnableDisableLifetimeValue = parseInt(Object.keys(def).find(key => def[key] === defaultEnableDisableLifetime))

        this.elementIdentifier = new ElementType5ElementIdentifier("DEFAULT-ENABLE-DISABLE-LIFETIME");
        this.elementLength = new ElementType5ElementLength(2);
        this.defaultEnableDisableLifetime = defaultEnableDisableLifetime;
        

        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const defaultEnableDisableLifetimeBits = this.defaultEnableDisableLifetimeValue.toString(2).padStart(2, '0');
        var bitString = elementIdentifierBits + elementLengthBits + defaultEnableDisableLifetimeBits;

        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        if (value.length !== 2) throw new Error('Invalid length for Default Enable Disable Lifetime');

        const defaultEnableDisableLifetimeBits = value.slice(0, 2);
        const defaultEnableDisableLifetime = binaryToBigInt(defaultEnableDisableLifetimeBits);

        return new ElementType5DefaultEnableDisableLifetime(def[defaultEnableDisableLifetime]);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementType5DefaultEnableDisableLifetime;
