import Component from './Component.js';

// import Vue component

class EPCSJoystick extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSJoystick";
        this.props = {
            // iconData: "F014",
            // label: [],
            // inputComponentProps: {},
            // disabled: false,
        };
        this.validateProps = [
            "leftEvent",
            "rightEvent",
        ];
        this._setPropsBeforeCreate(dataComponent);
    }

    _setPropsBeforeCreate(dataComponent) {
        //перезаписываем props из структуры
        const strProps = dataComponent.props;
        this.validateProps.forEach((prop) => {
            if (strProps[prop]) this.props[prop] = strProps[prop];
        });
    }

    getComponentName() {
        return this.nameTemplate;
    }

    getProps() {
        return this.props;
    }

    setActiveMenuButton(title) {
        this.setAllButtonIsClose();
        for (let i = 0; i < this.props.inputComponentProps.buttonArr.length; i++) {
            if (this.props.inputComponentProps.buttonArr[i].data.title === title) {
                this.props.inputComponentProps.buttonArr[i].data.isActive = true;
            } else {
                if (this.props.inputComponentProps.buttonArr[i].children) {
                    for (let j = 0; j < this.props.inputComponentProps.buttonArr[i].children.length; j++) {
                        if (this.props.inputComponentProps.buttonArr[i].children[j].title === title) {
                            this.props.inputComponentProps.buttonArr[i].data.isActive = true;
                            this.props.inputComponentProps.buttonArr[i].children[j].isActive = true;
                        }
                    }
                }
            }
        }
    }

    setAllButtonIsClose() {
        for (let i = 0; i < this.props.inputComponentProps.buttonArr.length; i++) {
            this.props.inputComponentProps.buttonArr[i].data.isActive = false;
            if (this.props.inputComponentProps.buttonArr[i].children) {
                for (let j = 0; j < this.props.inputComponentProps.buttonArr[i].children.length; j++) {
                    this.props.inputComponentProps.buttonArr[i].children[j].isActive = false;
                }
            }
        }
        // console.log('setAllButtonIsClose()', this.props.inputComponentProps)
    }

    setPlaceholder(text) {
        this.props.placeholder = text;
    }

    setType(type) {
        this.props.type = type;
    }

    setData(data) {
        this.props.tableData = data;
    }

    pushItem(item) {
        this.props.tableData.push(item);
    }

    setDisabled() {

    }
}

export { EPCSJoystick as default };
