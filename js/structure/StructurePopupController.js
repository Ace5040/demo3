import StructureController from './StructureController.js';

class StructurePopup extends StructureController {

    constructor(structure, name) {
    
        // console.info("🚀 POPUP POPUP5 ~ StructurePopup ~ constructor ~ structurePopup", structure)
        super(structure);
        this.name = structure.name;
        this.width = structure.width;
        this.components = structure.components;
        this.header = structure.header;
        this.submitBtns = structure.submitBtns;
        this.submitEvent = structure.submitEvent;
        this.text = structure.text;
        this.submitLabel = structure.submitLabel;
        this.systemPopup = true;
    }

}

export { StructurePopup as default };
