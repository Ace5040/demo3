import Component from "./Component";
// import Vue component

class EPCSIconButton extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSIconButton";
        this.props = {
            disabled: false,
            title: "",
            ...dataComponent.props
        };

        this.col = dataComponent.col;

        // this.validateProps = ["title", "disabled"];
        // this._setPropsBeforeCreate(dataComponent);
    }

    getComponentName() {
        return this.nameTemplate;
    }
}

export default EPCSIconButton;