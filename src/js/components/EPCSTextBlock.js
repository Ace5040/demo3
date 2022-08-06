import Component from "./Component";

class EPCSTextBlock extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSTextBlock";
        this.props = {
            text: "",
            type: "",
            ...dataComponent.props
        };

        this.col = dataComponent.col;
    }

    getComponentName() {
        return this.nameTemplate;
    }

    getProps() {
        return this.props;
    }

    setDisabled(disabled) {
        this.props.disabled = disabled
    }
}

export default EPCSTextBlock;