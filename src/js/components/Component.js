class Component {
  constructor(dataComponent) {
    this.name = dataComponent.componentName || dataComponent.name;
    this.parentId = dataComponent.parentId;
  }

  _setPropsBeforeCreate(dataComponent) {
    //перезаписываем props из структуры
    const strProps = dataComponent.props;
    this.validateProps.forEach((prop) => {
      if (strProps[prop] !== undefined) {
        this.props[prop] = strProps[prop];
      }
    });
  }

  init() {

  }

  set hidden(value) {
  }

  getParentId() {
    return this.parentId;
  }

  getName() {
    return this.name;
  }

  getProps() {
    return this.props;
  }

  setDisabled(disabled) {
    this.props.disabled = disabled;
    if (this.props.uploadBtn) {
      this.props.uploadBtn.type = "disabled";
    }
  }

  getValue() {
    return this.props.value;
  }

  set hidden(value) {
    this.props.hidden = value;
  }

  get hidden() {
    return this.props.hidden;
  }

  setNotValid() {
  }

  scrollIntoView() {
    const input = document.getElementsByClassName(`CUSTOM-DIR-${this.name}`);
    if (input.length) {
      input[0].scrollIntoView();
    }
  }
}

export default Component;
