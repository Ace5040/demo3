import Form from './Form.js';

class FormController {
  constructor(structuresComponents) {
    this.structuresForms = structuresComponents;
    this.allForms = {};
    this.allPopupForms = {};
    this.activeForm = "FormName";
    this.metaDataForForm = {};
    // console.log("STRUCTURES FROMS: ", this.structuresForms);
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
    // console.log("ALL CREATE FORMS: ", this.allForms);
    // console.log("ALL CREATE Popup FORMS: ", this.allPopupForms);
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

  getFormByName(formName,metaData) {
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

export { FormController as default };
