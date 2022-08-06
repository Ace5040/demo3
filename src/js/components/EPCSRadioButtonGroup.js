import Component from "./Component";
// import Vue component

class EPCSRadioButtonGroup extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSRadioButtonGroup";
    this.componentName = dataComponent.componentName;
    this.props = {};
    this.col = dataComponent.col
    this.props = {
      value: true,
      ...dataComponent.props
    };
  }

  getComponentName() {
    return this.nameTemplate;
  }
}

export default EPCSRadioButtonGroup;
