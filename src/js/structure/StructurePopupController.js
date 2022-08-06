import StructureController from "./StructureController"

class StructurePopup extends StructureController {

    constructor(structure, name) {
        super(structure);
        this.name = structure.name;
        this.width = structure.width;
        this.components = structure.components;
        this.header = structure.header;
        this.submitBtns = structure.submitBtns;
        this.submitEvent = structure.submitEvent;
        this.text = structure.text;
        this.submitLabel = structure.submitLabel;
        this.systemPopup = true
    }

}

export default StructurePopup;