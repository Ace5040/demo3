import Component from "./Component";


class EPCSFormHeader extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSFormHeader";

    this.props = {
      title: "Заголовок страницы",
      disabled: false,
      headerButtons: []
    };
    this.validateProps = ["title", "disabled", "headerButtons"];
    this._setPropsBeforeCreate(dataComponent);

    this.buttons = this.props.headerButtons
  }

  getComponentName() {
    return this.nameTemplate;
  }

  setActiveButtons(activeButtons) {
    this.buttons.forEach(button => {
      button.disabled = !activeButtons.includes(button.name);
    })
  }

  setPressedButtons(pressedButtons) {
    this.buttons.forEach(button => {
      button.isPressed = pressedButtons.includes(button.name);
    })
  }

  getProps() {
    return this.props;
  }

  setDisabled(disabled) {
    this.props = { disabled, ...this.props }
  }
}

export default EPCSFormHeader;
