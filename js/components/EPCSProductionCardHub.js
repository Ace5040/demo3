import Component from './Component.js';

class EPCSProductionCardHub extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSProductionCardHub";
    this.props = {};
    this.validateProps = [];
    this._setPropsBeforeCreate(dataComponent);
  }

  _setPropsBeforeCreate(dataComponent) {
    const strProps = dataComponent.props;
    this.validateProps.forEach((prop) => {
      if (strProps[prop]) this.props.data[prop] = strProps[prop];
    });
  }

  getComponentName() {
    return this.nameTemplate;
  }

  getProps() {
    return this.props;
  }

  setProps(props) {
    this.props = props;
  }
}

export { EPCSProductionCardHub as default };
