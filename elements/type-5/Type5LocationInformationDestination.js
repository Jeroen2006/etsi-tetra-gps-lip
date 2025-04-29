const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const ElementAddressOrIdentificationType = require('./address/AddressOrIdentificationType');
const NoAddress = require('./address/NoAddress');
const Ssi = require('./address/Ssi');
const MniSsi = require('./address/MniSsi');

const { binaryToBigInt } = require('../../utils');

class ElementType5LocationInformationDestination extends ElementScaffold {
    constructor(locationInformationDestination) {
        super(1, 4); 

        if (!(locationInformationDestination instanceof Ssi || locationInformationDestination instanceof MniSsi || locationInformationDestination instanceof NoAddress)) {
            throw new Error('Invalid terminal or location identification value. Must be an instance of Ssi or MniSsi');
        }

        this.elementIdentifier = new ElementType5ElementIdentifier("LOCATION-INFORMATION-DESTINATION");
        this.elementLength = new ElementType5ElementLength(locationInformationDestination.length);
        this.locationInformationDestination = locationInformationDestination;


        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const locationInformationDestinationBits = locationInformationDestination.toBinary();
        var bitString = elementIdentifierBits + elementLengthBits + locationInformationDestinationBits;

        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        const addressOrIdentificationTypeBits = value.slice(0, 4);
        const { addressOrIdentificationType } = ElementAddressOrIdentificationType.fromValue(addressOrIdentificationTypeBits);

        if(addressOrIdentificationType !== "SSI" && addressOrIdentificationType !== "SSI-MNI" && addressOrIdentificationType !== "NO-TERMINAL-OR-LOCATION-IDENTIFICATION-AVAILABLE") {
            throw new Error('Invalid/unsupported address or identification type value.');
        }
        var locationInformationDestination;
        const bits = value.slice(4);
        if(addressOrIdentificationType === "SSI") locationInformationDestination = Ssi.fromValue(bits);
        else if(addressOrIdentificationType === "SSI-MNI") locationInformationDestination = MniSsi.fromValue(bits);
        else if(addressOrIdentificationType === "NO-TERMINAL-OR-LOCATION-IDENTIFICATION-AVAILABLE") locationInformationDestination = NoAddress.fromValue();

        return new ElementType5LocationInformationDestination(locationInformationDestination);
    }
}

module.exports = ElementType5LocationInformationDestination;
