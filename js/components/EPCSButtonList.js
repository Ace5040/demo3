import Component from './Component.js';

// import Vue component

class EPCSButtonList extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = 'EPCSButtonList';
        this.props = {
            data: {
                columnHeadings: '',
                tableData: [],
                // listData: [],
                eventClick: [],
            },
            disabled: false
        };
        this.validateProps = ["tableData", "eventClick"];
        this._setPropsBeforeCreate(dataComponent);
    }

    getComponentName() {
        return this.nameTemplate;
    }

    setPlaceholder(text) {
        this.props.placeholder = text;
    }

    setType(type) {
        this.props.type = type;
    }

    setData(data) {
        this.props.tableData = data;
    }

    pushItem(item) {
        this.props.tableData.push(item);
    }

}

export { EPCSButtonList as default };
