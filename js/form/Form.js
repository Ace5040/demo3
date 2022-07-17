import Components from '../components/componentsList.js';

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

  getComponentByParentId(parentId) {
    return  Object.values(this.instanceComponents).filter(el=>el.id === parentId)[0]
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
                x.components.push(component);
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

  setMetaData(metaData) {
    this.metaData = metaData;
  }

  getMetaData() {
    return this.metaData;
  }

  _addInstanceComponent(componentName, dataComponent) {
    this.instanceComponents[componentName] = dataComponent;
  }

  _addInstanceTemplate(templateName, dataTemplate) {
    this.instanceTemplates[templateName] = dataTemplate;
  }
}

export { Form as default };
