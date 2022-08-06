import Component from "./Component";

class EPCSPopup extends Component {
  constructor(dataComponent, Vue) {
    super(dataComponent);
    this.nameTemplate = "EPCSPopup";
    this.$Vue = Vue
    this.dataComponent = dataComponent
    this.props = {
      width: 400,
      header: "",
    };
  }

  getComponentName() {
    return this.nameTemplate;
  }

  setProps(props) {
    this.props = props
  }
}

export default EPCSPopup;
