import Component from "./Component";

class EPCSButton extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSButton";
        this.props = {
            label: "",
            type: "outline",
            disabled: false
        };

        this.col = dataComponent.col;

        this.validateProps = ["label", "type", "value", "event", "rowNumber"];
        this._setPropsBeforeCreate(dataComponent);
    }

    getComponentName() {
        return this.nameTemplate;
    }

    getProps() {
        return this.props;
    }

    setLabel(labelText) {
        this.props.label = labelText;
    }

    setTypeBtn(type) {
        this.props.typeBtn = type;
    }
}

export default EPCSButton;