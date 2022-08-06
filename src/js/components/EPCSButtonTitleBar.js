import Component from "./Component";

class EPCSButtonTittleBar extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSButtonTittleBar";
        this.col = dataComponent.col;
        this.props = {
            iconData: "F01D",
            isPressed: false,
            disabled: false,
            ...dataComponent.props,
        };
    }

    getComponentName() {
        return this.nameTemplate;
    }

    getProps() {
        return this.props;
    }
    setChildComponents(data) {
        this.props = { data, ...this.props };
    }

    setPressed(bool) {
        this.props.isPressed = bool
    }

    setDisabled(disabled) {
        this.props.disabled = !!disabled;
    }
}

export default EPCSButtonTittleBar;
