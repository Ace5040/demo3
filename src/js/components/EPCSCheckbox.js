import Component from "./Component";
// import Vue component

class EPCSCheckbox extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSCheckbox";
        this.props = {
            label: "",
            value: false,
            hidden: false
        };

        this.col = dataComponent.col;
        this.validateProps = ["label", "value", "labelPosition", "disabled", "hidden"];
        this._setPropsBeforeCreate(dataComponent);
    }

    getComponentName() {
        return this.nameTemplate;
    }

    setValue(value) {
        this.props.value = value;
    }
}

export default EPCSCheckbox;
