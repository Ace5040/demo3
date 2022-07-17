import Component from './Component.js';

// import Vue component

class EPCSCheckbox extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSCheckbox";
        this.props = {
            value: null,
            disabled: false
        };
        this.col = dataComponent.col;
        this.validateProps = [
            "label",
            "value",
            "event"
        ];
        this._setPropsBeforeCreate(dataComponent);
    }

    setValue(val) {
        this.props.value = val;
    }

    getComponentName() {
        return this.nameTemplate;
    }

    setDisabled(disabled) {
        this.props.disabled = disabled;
    }

}

export { EPCSCheckbox as default };
