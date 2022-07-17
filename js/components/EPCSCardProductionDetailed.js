import Component from './Component.js';

class EPCSCardProductionDetailed extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSCardProductionDetailed";
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

export { EPCSCardProductionDetailed as default };
