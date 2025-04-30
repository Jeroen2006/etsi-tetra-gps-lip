const ElementScaffold = require('../scaffold');
const ElementType5ElementIdentifier = require('./Type5ElementIdentifier');
const ElementType5ElementLength = require('./Type5ElementLength');

const ElementAddressOrIdentificationType = require('./address/AddressOrIdentificationType');
const NoAddress = require('./address/NoAddress');
const Ssi = require('./address/Ssi');
const MniSsi = require('./address/MniSsi');
const Esn = require('./address/Esn');
const MniSsiEsn = require('./address/MniSsiEsn');
const SsiEsn = require('./address/SsiEsn');

const { binaryToBigInt } = require('../../utils');

class ElementType5LocationInformationDestination extends ElementScaffold {
    constructor(locationInformationDestination) {
        super(1, 4); 

        if (!(locationInformationDestination instanceof Ssi || locationInformationDestination instanceof MniSsi || locationInformationDestination instanceof NoAddress | locationInformationDestination instanceof Esn || locationInformationDestination instanceof MniSsiEsn || locationInformationDestination instanceof SsiEsn)) {
            throw new Error('Invalid terminal or location identification value. Must be an instance of Ssi, MniSsi, Esn, MniSsiEsn, SsiEsn or NoAddress');
        }

        this.elementIdentifier = new ElementType5ElementIdentifier("LOCATION-INFORMATION-DESTINATION");
        this.elementLength = new ElementType5ElementLength(locationInformationDestination.length + 4);
        this.locationInformationDestination = locationInformationDestination;
        this.addressOrIdentificationType = new ElementAddressOrIdentificationType(locationInformationDestination.addressOrIdentificationType);


        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const locationInformationDestinationBits = this.addressOrIdentificationType.toBinary() + locationInformationDestination.toBinary();
        var bitString = elementIdentifierBits + elementLengthBits + locationInformationDestinationBits;
        this.value = binaryToBigInt(bitString);
        this.length = bitString.length;
    }

    static fromValue(value) {
        const addressOrIdentificationTypeBits = value.slice(0, 4);
        const { addressOrIdentificationType } = ElementAddressOrIdentificationType.fromValue(addressOrIdentificationTypeBits);

        const supportedAddressOrIdentificationTypes = ["SSI", "SSI-MNI", "EXTERNAL-SUBSCRIBER-NUMBER", "SSI-EXTERNAL-SUBSCRIBER-NUMBER", "SSI-MNI-EXTERNAL-SUBSCRIBER-NUMBER", "NO-TERMINAL-OR-LOCATION-IDENTIFICATION-AVAILABLE"];
        if(!supportedAddressOrIdentificationTypes.includes(addressOrIdentificationType)) {
            throw new Error('Invalid/unsupported address or identification type value.');
        }
        var locationInformationDestination;
        const bits = value.slice(4);

        if(addressOrIdentificationType === "SSI") locationInformationDestination = Ssi.fromValue(bits);
        else if(addressOrIdentificationType === "SSI-MNI") locationInformationDestination = MniSsi.fromValue(bits);
        else if(addressOrIdentificationType === "EXTERNAL-SUBSCRIBER-NUMBER") locationInformationDestination = Esn.fromValue(bits);
        else if(addressOrIdentificationType === "SSI-EXTERNAL-SUBSCRIBER-NUMBER") locationInformationDestination = SsiEsn.fromValue(bits);
        else if(addressOrIdentificationType === "SSI-MNI-EXTERNAL-SUBSCRIBER-NUMBER") locationInformationDestination = MniSsiEsn.fromValue(bits);
        else if(addressOrIdentificationType === "NO-TERMINAL-OR-LOCATION-IDENTIFICATION-AVAILABLE") locationInformationDestination = NoAddress.fromValue();

        return new ElementType5LocationInformationDestination(locationInformationDestination);
    }
}

module.exports = ElementType5LocationInformationDestination;
