import Component from "./Component";


class EPCSToggle extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSToggle";
        this.componentName = dataComponent.componentName;
        this.props = {};
        this.col = dataComponent.col
        this.props = {
            value: true,
            ...dataComponent.props
        };
    }

    getComponentName() {
        return this.nameTemplate;
    }

    setValue(value) {
        this.props.value = value;
    }
}

export default EPCSToggle;