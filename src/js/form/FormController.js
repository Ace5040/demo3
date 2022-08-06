import Form from "./Form";

class FormController {
  constructor(structuresComponents) {
    this.structuresForms = structuresComponents;
    this.allForms = {};
    this.allPopupForms = {};
    this.activeForm = "FormName";
    this.metaDataForForm = {}
    this._createForm();
  }

  _createForm() {
    Object.entries(this.structuresForms).forEach((structComponents) => {
      if (structComponents[1].systemPopup) {
        this.allPopupForms[structComponents[0]] = new Form(structComponents[1], structComponents[0]);
      } else {
        this.allForms[structComponents[0]] = new Form(structComponents[1], structComponents[0]);
      }
    });
  }

  getAllForms() {
    return this.allForms;
  }

  getAllPopupForms() {
    return this.allPopupForms;
  }

  getFormForVueByName(formName) {
    return this.allForms[formName].getFormForVue();
  }

  getAllFormsForVue() {
    let allFormsForVue = [];
    Object.entries(this.allForms).forEach((form) => {
      allFormsForVue[form[0]] = form[1].getFormForVue();
    });

    return allFormsForVue;
  }

  getFormByName(formName, metaData) {
    if (!this.allForms[formName]) {
      console.error("form not found", formName);
    }
    this.allForms[formName].setMetaData(metaData);
    return this.allForms[formName];
  }

  getPopupByName(formName) {
    return this.allPopupForms[formName];
  }

  getAppAllPopupForms() {
    return this.allPopupForms
  }

  getActiveFormName() {
    return this.activeForm;
  }
}

export default FormController;
