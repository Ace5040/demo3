import Component from "./Component";
// import Vue component

class EPCSDirection extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSDirection";
    this.props = {
      type: "row",
      disabled: false,
    };
    this.col = dataComponent.col
    this.validateProps = ["type", "label", "event"];
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
}

export default EPCSDirection;
