import Component from './Component.js';

// import Vue component

class EPCSTextBlock extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSTextBlock";
        this.props = {
            "type": '',
            "text": '',
        };
        this.validateProps = [
            "text",
            "type"
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
        this.props.disabled = disabled;
    }
}

export { EPCSTextBlock as default };
