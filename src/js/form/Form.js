import Components from "../components/componentsList";

class Form {
  constructor(formData, formName) {
    this.data = formData;
    this.name = formName;
    this.components = formData.components || [];
    this.instanceComponents = {};
    this.instancePopupComponents = {};
    this.instanceTemplates = {};
    this.metaData = {};

    this._buildComponents();
  }

  getFormName() {
    return this.name;
  }

  getStucture() {
    return this.data;
  }

  getComponentByName(nameComponent) {
    return this.instanceComponents[nameComponent];
  }

  getAllComponents() {
    return this.instanceComponents
  }

  getPopupByName(nameComponent) {
    this.getFormForVue();
  }

  _buildComponents() {
    this.instanceComponents = {};

    this.components.forEach((component) => {
      let { parentId, id, priority, componentName, component: npmComponent } = component;

      if (Components[npmComponent]) {
        // Важно учитывать что все экземпляры классов компонентов мы храним в объекте
        // Учитывая это, имена компонентов в структуре должны быть уникальными для всех компонентов
        this._addInstanceComponent(componentName, {
          component: new Components[npmComponent](component),
          parentId,
          id,
          priority,
          components: [],
        });
      }
    });
  }

  getFormForVue() {
    let flatTemplate = [];
    this._buildComponents();

    Object.keys(this.instanceComponents).forEach((itemKey) => {
      flatTemplate.push(this.instanceComponents[itemKey]);
    });

    const result = flatTemplate.reduce(
      (r, component) => (
        !component.parentId
          ? r.push(component)
          : flatTemplate.some((x) => {
            if (x.id === component.parentId) {
              x.components.push(component), true;
            } else {
              false;
            }
          }),
        r
      ),
      []
    );

    result.sort(function (a, b) {
      return a.priority - b.priority;
    });

    return result;
  }

  getFormPopupForVue() {
    let data = this.data.props;
    data.components = this.getFormForVue();
    return data;
  }

  getProps() {
    return this.data.props;
  }

  getFilterValues() {
    console.log(this.instanceComponents);
  }

  setMetaData(metaData) {
    this.metaData = metaData;
  }

  _addInstanceComponent(componentName, dataComponent) {
    this.instanceComponents[componentName] = dataComponent;
  }

  _addInstanceTemplate(templateName, dataTemplate) {
    this.instanceTemplates[templateName] = dataTemplate;
  }

  getFormValue() {
    const formValue = {};

    const excludeTypes = ["EPCSDirection", "EPCSFormHeader", "EPCSMap", "EPCSButton", "EPCSPopup"];
    const components = this.components.filter((item) => !excludeTypes.includes(item.component));

    for (const data of components) {
      const component = this.getComponentByName(data.componentName).component;
      const value = component.getValue();
      formValue[data.componentName] = value;
    }

    return formValue;
  }

  setFormValue(formValue) {

    const excludeTypes = ["EPCSDirection", "EPCSFormHeader", "EPCSMap", "EPCSButton", "EPCSPopup"];
    const components = this.components.filter((item) => !excludeTypes.includes(item.component));
    for (const data of components) {
      const component = this.getComponentByName(data.componentName);

      if (component) {
        const value = formValue[data.componentName];
        component.component.setValue(value);
      }
    }
  }

  setDisabled() {
    const excludeTypes = ["EPCSDirection", "EPCSFormHeader", "EPCSMap", "EPCSButton", "EPCSPopup"];
    const components = this.components.filter((item) => !excludeTypes.includes(item.component));

    for (const data of components) {
      const component = this.getComponentByName(data.componentName);

      if (component && component.component.setDisabled) {
        component.component.setDisabled(true);
      }
    }
  }
}

export default Form;
