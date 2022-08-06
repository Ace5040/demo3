import Component from "./Component";
// import Vue component

class EPCSFooter extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSFooter";
    this.props = {};
    this.validateProps = [
      "type",
      "components",
      "leftDisabled",
      "rightEvent",
      "rightType",
      "rightLabel",
      "middleLabel",
      "middleEvent",
      "middleType",
      "leftLabel",
      "leftType",
      "leftEvent",
    ];

    this._setPropsBeforeCreate(dataComponent);
  }

  getComponentName() {
    return this.nameTemplate;
  }
}

export default EPCSFooter;
