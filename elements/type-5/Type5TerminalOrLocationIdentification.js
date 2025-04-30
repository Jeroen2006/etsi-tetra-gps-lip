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

class ElementType5TerminalOrLocationIdentification extends ElementScaffold {
    constructor(terminalOrLocationIdentification) {
        super(1, 4); 

        if (!(terminalOrLocationIdentification instanceof Ssi || terminalOrLocationIdentification instanceof MniSsi || terminalOrLocationIdentification instanceof NoAddress || terminalOrLocationIdentification instanceof Esn || terminalOrLocationIdentification instanceof MniSsiEsn || terminalOrLocationIdentification instanceof SsiEsn)) {
            throw new Error('Invalid terminal or location identification value. Must be an instance of Ssi, MniSsi, Esn, MniSsiEsn, SsiEsn or NoAddress');
        }

        this.elementIdentifier = new ElementType5ElementIdentifier("TERMINAL-OR-LOCATION-IDENTIFICATION");
        this.elementLength = new ElementType5ElementLength(terminalOrLocationIdentification.length + 4);
        this.terminalOrLocationIdentification = terminalOrLocationIdentification;
        this.addressOrIdentificationType = new ElementAddressOrIdentificationType(terminalOrLocationIdentification.addressOrIdentificationType);

        const elementIdentifierBits = this.elementIdentifier.toBinary();
        const elementLengthBits = this.elementLength.toBinary();
        const terminalOrLocationIdentificationBits = this.addressOrIdentificationType.toBinary() + terminalOrLocationIdentification.toBinary();
        var bitString = elementIdentifierBits + elementLengthBits + terminalOrLocationIdentificationBits;
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

        var terminalOrLocationIdentification;
        const bits = value.slice(4);
        if(addressOrIdentificationType === "SSI") terminalOrLocationIdentification = Ssi.fromValue(bits);
        else if(addressOrIdentificationType === "SSI-MNI") terminalOrLocationIdentification = MniSsi.fromValue(bits);
        else if(addressOrIdentificationType === "EXTERNAL-SUBSCRIBER-NUMBER") terminalOrLocationIdentification = Esn.fromValue(bits);
        else if(addressOrIdentificationType === "SSI-EXTERNAL-SUBSCRIBER-NUMBER") terminalOrLocationIdentification = SsiEsn.fromValue(bits);
        else if(addressOrIdentificationType === "SSI-MNI-EXTERNAL-SUBSCRIBER-NUMBER") terminalOrLocationIdentification = MniSsiEsn.fromValue(bits);
        else if(addressOrIdentificationType === "NO-TERMINAL-OR-LOCATION-IDENTIFICATION-AVAILABLE") terminalOrLocationIdentification = NoAddress.fromValue();

        return new ElementType5TerminalOrLocationIdentification(terminalOrLocationIdentification);
    }
}

module.exports = ElementType5TerminalOrLocationIdentification;
