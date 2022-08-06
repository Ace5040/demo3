import Component from "./Component";
import DataGrid from "devextreme/ui/data_grid";


/**
 * @class EPCSDataGrid - класс компонента реализующий взаимодействие между логикой и представлением
 */
class EPCSDataGrid extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSDataGrid";
    this.columnNames = Object.keys(dataComponent.props.inputColumnNames);
    this.dataComponent = dataComponent;
    this.props = {
      disabled: false,
      pageSize: 10,
      tableData: [],
      storageName: this.getName(),
      keyExpr: "id",
      selectedRows: null,
      ...dataComponent.props
    };
    this.enumeration = dataComponent.enumeration;
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

  clearSettings() {
    const settings = JSON.parse(localStorage.getItem(this.props.storageName));
    if (settings) {
      localStorage.removeItem(this.props.storageName);
    }
  }

  findRowIndexById(id) {
    const res = this.props.tableData
      .map((item, index) => {
        return { index: index, data: item };
      })
      .find((item) => item.data.id === id);

    return res ? res.index : null;
  }

  getRowData(id) {
    return this.props.tableData.find((item) => item.id === id);
  }

  selectRow(id) {
    if (!this.props.tableData.length) {
      return;
    }

    const index = this.findRowIndexById(id);
    if (index === null) {
      return;
    }

    this.props.selectedRows = [id];
    //добавлено, чтобы работал selectedRows
    //this.dataComponent.id = this.dataComponent.id + (new Date()).getTime();

    //TODO перенести в storybook
    const element = document.querySelector("#dataGrid");

    if (!element) {
      this.clearSettings();
      return;
    }

    const instance = DataGrid.getInstance(element);

    instance.clearSorting();
    const settings = instance.state();

    settings.selectedRowKeys = [id];
    settings.pageIndex = Math.floor(index / this.props.pageSize);

    instance.state(settings);
    localStorage.setItem(this.props.storageName, JSON.stringify(settings));
  }
}

export default EPCSDataGrid;
