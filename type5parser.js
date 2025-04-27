const ElementType5ElementIdentifier = require('./elements/type-5/Type5ElementIdentifier');

const ElementType5LocationMessageReference = require('./elements/type-5/Type5LocationMessageReference');
const ElementType5ResultCode = require('./elements/type-5/Type5ResultCode');
const ElementType5RequestPriority = require('./elements/type-5/Type5RequestPriority');
const ElementType5TerminalOrLocationIdentification = require('./elements/type-5/Type5TerminalOrLocationIdentification');

function parseType5Elements(data){
    const elements = [];

    while(data.length > 0){
        const elementIdentifierBits = data.slice(0, 5);
        const { elementIdentifier } = ElementType5ElementIdentifier.fromValue(elementIdentifierBits);

        const elementLengthBits = data.slice(5, 11);
        const elementLength = parseInt(elementLengthBits, 2);

        //LENGTH EXTENSION NOT SUPPORTED (YET)
        
        if(elementIdentifier === "LOCATION-MESSAGE-REFERENCE"){
            const referenceBits = data.slice(0, 5 + 6 + elementLength);
            const element = ElementType5LocationMessageReference.fromValue(referenceBits);
            data = data.slice(5 + 6 + elementLength);

            console.log(referenceBits, element.toBinary())

            elements.push(element);
        } else if(elementIdentifier === "RESULT-CODE"){
            const resultCodeBits = data.slice(0, 5 + 6 + elementLength);
            const element = ElementType5ResultCode.fromValue(resultCodeBits);
            data = data.slice(5 + 6 + elementLength);
            elements.push(element);
        } else if(elementIdentifier === "REQUEST-PRIORITY"){
            const requestPriorityBits = data.slice(0, 5 + 6 + elementLength);
            const element = ElementType5RequestPriority.fromValue(requestPriorityBits);
            data = data.slice(5 + 6 + elementLength);
            elements.push(element);
        } else if(elementIdentifier === "TERMINAL-OR-LOCATION-IDENTIFICATION"){
            const terminalOrLocationIdentificationBits = data.slice(0, 5 + 6 + elementLength);
            const element = ElementType5TerminalOrLocationIdentification.fromValue(terminalOrLocationIdentificationBits);
            data = data.slice(5 + 6 + elementLength);
            elements.push(element);
        } else {
            throw new Error(`Unsupported element identifier: ${elementIdentifier}`);
        }
    }

    return elements;
}

module.exports = {
    parseType5Elements
}