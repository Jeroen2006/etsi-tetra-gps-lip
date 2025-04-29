const ElementScaffold = require('../../scaffold');
const { binaryToBigInt } = require('../../../utils');

const def = {
    0: "NO-TERMINAL-OR-LOCATION-IDENTIFICATION-AVAILABLE",
    1: "SSI",
    2: "SSI-MNI",
    3: "IPV4",
    4: "IPV6",
    8: "EXTERNAL-SUBSCRIBER-NUMBER",
    9: "SSI-EXTERNAL-SUBSCRIBER-NUMBER",
    10: "SSI-MNI-EXTERNAL-SUBSCRIBER-NUMBER",
    11: "NAME-SERVER-TYPE-NAME",
    12: "NAME-FREE-FORMAT",
};

class ElementAddressOrIdentificationType extends ElementScaffold {
    constructor(addressOrIdentificationType) {
        super(1, 4); 

        if(!Object.values(def).includes(addressOrIdentificationType)) throw new Error('Invalid address or identification type value.');
        this.AddressOrIdentificationTypeValue = parseInt(Object.keys(def).find(key => def[key] === addressOrIdentificationType))
        this.addressOrIdentificationType = addressOrIdentificationType;

        const addressOrIdentificationTypeBits = this.AddressOrIdentificationTypeValue.toString(2).padStart(4, '0');
        this.value = binaryToBigInt(addressOrIdentificationTypeBits);
        this.length = addressOrIdentificationTypeBits.length;
    }

    static fromValue(value) {
        if (value.length !== 4) throw new Error('Invalid length for address or identification type value.');

        const addressOrIdentificationTypeBits = value.slice(0, 4);
        const requestPriority = binaryToBigInt(addressOrIdentificationTypeBits);

        return new ElementAddressOrIdentificationType(def[requestPriority]);
    }

    static getDefinition() {
        return def;
    }
}

module.exports = ElementAddressOrIdentificationType;
