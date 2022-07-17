import Component from './Component.js';

class EPCSPopup extends Component {
  constructor(dataComponent, Vue) {
    super(dataComponent);
    this.nameTemplate = "EPCSPopup";
    this.$Vue = Vue;
    this.dataComponent = dataComponent;
    this.props = {
      width: 400,
      header: "",
    };
  }

  getComponentName() {
    return this.nameTemplate;
  }
  
  clearFilter() {
    if(this.props.name === "filterPopup") {
      this.props.components.forEach(el => el.value = '');
    }
  }

  setProps(props) {
    this.props = props;
  }
  setDisabled(disabled) {
    this.props.disabled = disabled;
}

}

export { EPCSPopup as default };
