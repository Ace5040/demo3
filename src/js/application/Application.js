import FormController from "../form/FormController";
import StructureController from "../structure/StructureController";
import StructurePopupController from "../structure/StructurePopupController";
// import allStructures from "../structureTemplates/allStructures";
// import allPopupStructures from "../structureTemplates/popup/allPopupStructures";

class Application {
    constructor(structure) {
        this.structure = structure.allStructures
        this.structurePopup = structure.allPopupStructures
        this.structureController = new StructureController(this.structure);
        this.structurePopupController = new StructurePopupController(this.structurePopup);
        this.formController = new FormController(this.structureController.getAllStructures());
        this.formPopupController = new FormController(this.structurePopupController.getAllPopupStructures());

        this.data = {};
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

    getFormByName(formName, metaData) {
        return this.formController.getFormByName(formName, metaData);
    }

    getPopupFormByName(formName) {
        return this.formPopupController.getPopupByName(formName);
    }

    getAppAllPopupForms() {
        return this.formPopupController.getAllPopupForms();
    }

    set(nameForm, metadata) {
        const form = this.getFormByName(nameForm, metadata);

        this.data[nameForm] = {
            form,
            components: form.getFormForVue(),
            formName: form.getFormName()
        }
    }

    getComponents(nameForm) {

        if (!this.data[nameForm]) {
            this.set(nameForm);
        }
        return this.data[nameForm].components;
    }

    getFormName(nameForm) {
        return this.data[nameForm].formName;
    }

    getForm(nameForm) {
        return this.data[nameForm].form;
    }
}

// const application = new Application({
//     allStructures,
//     allPopupStructures
// });

export default Application;