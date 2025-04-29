const ElementScaffold = require('../../scaffold');

class NoAddress extends ElementScaffold {
    constructor() {
        super(1, 0); // 24 bits

        this.addressOrIdentificationType = "NO-TERMINAL-OR-LOCATION-IDENTIFICATION-AVAILABLE";
        this.binary = ""
        this.value = 0
    }

    static fromValue(value) {
        return new NoAddress();
    }
}

module.exports = NoAddress;
