import Component from './Component.js';

// import Vue component

class EPCSCoordInputList extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSCoordInputList";

        this.props = {
            inputList: [],
            minusEvent: '',
            plusEvent: '',
            latEvent: '',
            latDirectionEvent: '',
            lonEvent: '',
            lonDirectionEvent: '',
            visible: false,
        };
        this.validateProps = [
            "inputList",
            "minusEvent",
            "plusEvent",
            'latEvent',
            'latDirectionEvent',
            'lonEvent',
            'lonDirectionEvent',
            'visible',
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

    setRandomKey() {
        return String(Math.random() * 10)
    }

    getProps() {
        return this.props;
    }

    getInputList() {
        return this.props.inputList;
    }

    addItem(id, coords) {
        this.props.inputList.splice(id + 1, 0, {coords: coords, id: this.setRandomKey()});
    }

    setInputList(data) {
        this.props.inputList = data;
    }

    setVisible(value) {
        this.props.visible = value;
    }
}

export { EPCSCoordInputList as default };
