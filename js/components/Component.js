class Component {
  constructor(dataComponent) {
    this.name = dataComponent.componentName;
    this.parentId = dataComponent.parentId;
    this.props = dataComponent.props;
    this.col = dataComponent.col;
  }

  _setPropsBeforeCreate(dataComponent) {
    //перезаписываем props из структуры
    const strProps = dataComponent.props;
    this.validateProps.forEach((prop) => {
      // Не учитывает False
      if (strProps[prop]) this.props[prop] = strProps[prop];
    });
  }

  init() {
    return;
  }

  getParentId() {
    return this.parentId;
  }

  getName() {
    return this.name;
  }

  setEvent(event) {
    // console.log('EVENT!', event);
  }

  getProps() {
    return this.props;
  }

  setDisabled(disabled) {
    this.props.disabled = !!disabled;
  }

  getValue() {
    return this.props.value;
  }
}

export { Component as default };
