import Component from './Component.js';

// import Vue component

class EPCSDirection extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSDirection";
    this.props = {
      type: "row",
      disabled: false,
      labelRequired: false,
    };
    this.col = dataComponent.col;
    this.validateProps = ["type", "label","disabled","event", "labelRequired"];
    this._setPropsBeforeCreate(dataComponent);
  }

  getComponentName() {
    return this.nameTemplate;
  }

  getProps() {
    return this.props;
  }

  setChildComponents(data) {
    this.props = { data, ...this.props };
  }

  setValue(value) {
    this.props.value = value;
  }
}

export { EPCSDirection as default };
