class StructurePopup {
    constructor(structure, name) {
        this.name = structure.name;
        this.props = structure.props;
        this.components = structure.components;
        this.systemPopup = true;
    }

}

export { StructurePopup as default };
