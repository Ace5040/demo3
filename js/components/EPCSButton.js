import Component from './Component.js';

class EPCSButton extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = 'EPCSButton';
        this.props = {
            label: 'Default button',
            typeBtn: 'primary',
            disabled: false
        };
        this.validateProps = ["label", "type", "value","event","disabled"];
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
    getAlert() {
        alert('alert');
    }
}

export { EPCSButton as default };
