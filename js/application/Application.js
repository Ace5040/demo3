import FormController from '../form/FormController.js';
import StructureController from '../structure/StructureController.js';
import StructurePopup from '../structure/StructurePopupController.js';

class Application {
    constructor(structure) {
        this.structure = structure.allStructures;
        this.structurePopup = structure.allPopupStructures;
        this.structureController = new StructureController(this.structure);
        this.structurePopupController = new StructurePopup(this.structurePopup);
        this.formController = new FormController(this.structureController.getAllStructures());
        this.formPopupController = new FormController(this.structurePopupController.getAllPopupStructures());
    }

    //Все обращения к структурам и формам должны быть приватными методами и не должны выходить за пределы Application
    
    //забираем все структуры контроллера структур
    getAppAllStructures() {
        return this.structureController.getAllStructures();
    }

    getAppStructByName(structName) {
        return this.structureController.getStructureByName(structName); 
    }

    getPopupStructByName(structName) {
        return this.structureController.getPopupStructureByName(structName);
    }

    getAppStructComponentsByStructureName(structName) {
        return this.structureController.getStructComponentsByStructureName(structName);
    }

    getAppFormForVueByName(formName) {
        return this.formController.getFormForVueByName(formName);
    }

    getAppAllFormsForVue() {
        return this.formController.getAllFormsForVue();
    }

    getFormByName(formName,metaData) {
        return this.formController.getFormByName(formName,metaData);
    }

    getPopupFormByName(formName) {
        return this.formPopupController.getPopupByName(formName);
    }
    getAppAllPopupForms() {
        return this.formPopupController.getAllPopupForms();
    }
    

}

export { Application as default };
