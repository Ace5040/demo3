import Component from './Component.js';

// import Vue component

class EPCSRadioButtonGroup extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSRadioButtonGroup";
    this.props = {
      value:"CreateDispAqua",
      disabled: false
    };
    this.col = dataComponent.col;
    this.validateProps = [
      "type",
      "inputData",
      "value",
      "label",
      "event",
      "value"
    ];
    this._setPropsBeforeCreate(dataComponent);
  }

  getComponentName() {
    return this.nameTemplate;
  }

  setDisabled(disabled) {
    this.props.disabled = disabled;
  }
}

export { EPCSRadioButtonGroup as default };
