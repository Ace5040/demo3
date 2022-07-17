import Component from './Component.js';

// import Vue component

class EPCSAccordion extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSAccordion";
    this.props = {
      typeAddBtn: "primary",
      addlabel: 'button',
      typeRemoveBtn: "primary",
      removelabel: 'button'
    };
    this.validateProps = ["typeAddBtn", "addLabel","typeRemoveBtn","removeLabel","disabled"];
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

export { EPCSAccordion as default };
