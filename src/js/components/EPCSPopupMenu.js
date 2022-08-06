import Component from "./Component";

class EPCSPopupMenu extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSPopupMenu";
    this.props = {
      iconData: "F014",
      label: [],
      inputComponentProps: {
        buttonArr: [],
        tableData: [],
      },
      isOpen: false,
      disabled: false,
      ...dataComponent.props,
    };
  }

  getComponentName() {
    return this.nameTemplate;
  }

  setPlaceholder(text) {
    this.props.placeholder = text;
  }

  setType(type) {
    this.props.type = type;
  }

  setInputData(data) {
    this.props.inputComponentProps = { ...this.props.inputComponentProps, tableData: data };
  }

  toggleOpen() {
    this.props.isOpen = !this.props.isOpen;
  }

  setActiveMenuButton(title) {
    this.setAllButtonIsClose()

    for (let buttonArr of this.props.inputComponentProps.buttonArr) {
      if (buttonArr.data.title === title) {
        buttonArr.data.isActive = true;
      } else {
        if (buttonArr.children) {
          for (let child of buttonArr.children) {
            if (child.title === title) {
              buttonArr.data.isActive = true;
              child.isActive = true;
            }
          }
        }
      }
    }
  }

  setAllButtonIsClose() {
    for (let buttonArr of this.props.inputComponentProps.buttonArr) {
      buttonArr.data.isActive = false;

      if (buttonArr.children) {
        for (let child of buttonArr.children) {
          child.isActive = false;
        }
      }
    }
  }
}

export default EPCSPopupMenu;
