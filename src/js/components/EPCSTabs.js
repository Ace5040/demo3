import Component from "./Component";
// import Vue component

class EPCSTabs extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSTabs";
        this.props = {
            label: "",
            value: false,
            selectedIndex: 0,
            ...dataComponent.props
        };

        this.col = dataComponent.col;
    }

    getComponentName() {
        return this.nameTemplate;
    }

    setValue(value) {
        this.props.value = value;
    }

    setSelectedIndex(value) {
        if (this.props.selectedIndex === value) {
            this.props.selectedIndex = -1;
            setTimeout(() => this.props.selectedIndex = value);
            return;
        }

        this.props.selectedIndex = value;
    }
}

export default EPCSTabs;