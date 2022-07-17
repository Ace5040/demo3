import Component from './Component.js';

// import Vue component

class EPCSListView extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSListView";
        this.props = {
            tableData: null,
            selectedRows: [],
            refKey: this.setRandomKey(),
            disabled: false
        };
        this.validateProps = [
            "tableData",
            "eventClick",
            'eventDoubleClick',
            "type",
            "rowAlternation",
            "selectEvent",
            "selectedRows",
            "disabled",
            "keyExpr"
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

    setRandomKey(){
        return String(Math.random() * 10)
    }

    getComponentName() {
        return this.nameTemplate;
    }

    getProps() {
        return this.props;
    }

    setTableData(data) {
        this.props.tableData = data;
    }

    setDisabled(disabled) {
        this.props.disabled = disabled;
    }

    setselectedRows(value) {
        this.props.selectedRows = value;
    }
}

export { EPCSListView as default };
