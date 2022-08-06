import Component from "./Component";

class EPCSJoystick extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSJoystick";
        this.props = {
            leftMenu: false,
            rightMenu: false,
            ...dataComponent.props
        };
    }

    getComponentName() {
        return this.nameTemplate;
    }

    getProps() {
        return this.props;
    }

    setActiveMenuButton(title) {
        this.setAllButtonIsClose()
        for (let i = 0; i < this.props.inputComponentProps.buttonArr.length; i++) {
            if (this.props.inputComponentProps.buttonArr[i].data.title === title) {
                this.props.inputComponentProps.buttonArr[i].data.isActive = true
            } else {
                if (this.props.inputComponentProps.buttonArr[i].children) {
                    for (let j = 0; j < this.props.inputComponentProps.buttonArr[i].children.length; j++) {
                        if (this.props.inputComponentProps.buttonArr[i].children[j].title === title) {
                            this.props.inputComponentProps.buttonArr[i].data.isActive = true
                            this.props.inputComponentProps.buttonArr[i].children[j].isActive = true
                        }
                    }
                }
            }
        }
    }

    setAllButtonIsClose() {
        for (let i = 0; i < this.props.inputComponentProps.buttonArr.length; i++) {
            this.props.inputComponentProps.buttonArr[i].data.isActive = false
            if (this.props.inputComponentProps.buttonArr[i].children) {
                for (let j = 0; j < this.props.inputComponentProps.buttonArr[i].children.length; j++) {
                    this.props.inputComponentProps.buttonArr[i].children[j].isActive = false
                }
            }
        }
    }
}

export default EPCSJoystick;
