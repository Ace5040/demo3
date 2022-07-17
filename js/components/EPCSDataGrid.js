import Component from './Component.js';

class EPCSDataGrid extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSDataGrid";
    this.columnNames = Object.keys(dataComponent.props.inputColumnNames);
    this.dataComponent = dataComponent;
    this.props = {
      disabled: false,
      tableData: [],
      rowTemplate: '',
      pageSize: 8,
      storageName: this.getName(),
    };
    (this.enumeration = dataComponent.enumeration),
      (this.validateProps = [
        "disabled",
        "noDataText",
        "tableData",
        "pageSize",
        "inputColumnNames",
        "inputColumnSortNames",
        "rowTemplate",
        "eventClick",
        "selectionMode",
        "eventDoubleClick",
      ]);
    this._setPropsBeforeCreate(dataComponent);
  }


  setRandomKey() {
    return String(Math.random() * 10)
  }


  _setPropsBeforeCreate() {
  //перезаписываем props из структуры
    const strProps = this.dataComponent.props;
    this.validateProps.forEach((prop) => {
      if (strProps[prop]) this.props[prop] = strProps[prop];
    });
  }


  setColumnNames(columnsArr) {
    this.props.inputColumnNames = columnsArr;
  }

  setColumnSortNames(value) {
    this.props.inputColumnSortNames = value;
  }

  getComponentName() {
    return this.nameTemplate;
  }


  setTableData(data) {
    this.props.tableData = data;
  }


  deleteRow(id) {
    this.props.tableData = this.props.tableData.filter((el) => el.id !== id);
  }


  getProps() {
    return this.props;
  }


  getColumnNames() {
    return this.columnNames;
  }

  delTableRow(id) {
    for (let i = 0; i < this.props.tableData.length; i++) {
      if (id === this.props.tableData[i].id) {
        this.props.tableData.splice(i, 1);
        break;
      }
    }
  }
}

export { EPCSDataGrid as default };
