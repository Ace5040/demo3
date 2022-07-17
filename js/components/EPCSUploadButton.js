import Component from './Component.js';

// import Vue component

class EPCSUploadButton extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSUploadButton";
        this.props = {};
        this.validateProps = [
            "text",
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

    setDisabled(disabled) {
        this.props = {disabled, ...this.props};
    }
}

export { EPCSUploadButton as default };
