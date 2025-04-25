class ElementScaffold {
    constructor(type, length) {
        this.length = length
        this.type = type
    }

    toBinary() {
        return this.value.toString(2).padStart(this.length, '0');
    }
}

module.exports = ElementScaffold