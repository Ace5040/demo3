import Component from './Component.js';

class EPCSFormInput extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSFormInput";
    this.props = {
      placeholder: "Standard placeholder",
      type: "text",
      disabled: false,
      value: null,
      dateMin: null,
      dateMax: null
    };
    this.col = dataComponent.col;
    this.validateProps = ["label", "type", "value","step", "placeholder", "items", "labelPosition", "searchMode", "event","disabled", "isDataSource", "exprItemName", "exprItemVal", "labelRequired"];
    this._setPropsBeforeCreate(dataComponent);
  }

  getComponentName() {
    return this.nameTemplate;
  }

  getValue() {
    return this.props.value
  }

  getShips() {}

  setPlaceholder(text) {
    this.props.placeholder = text;
  }

  getType() {
    return this.props.type
  }

  setType(type) {
    this.props.type = type;
  }

  setValue(value) {
    let props = this.props;
    if(props.type === 'select' && !props.isDataSource && !props.setSearchValue && !props.items.includes(value)) props.items.push(value);
    props.value = value;
  }

  addSearchObject(searchObject) {
    this.props = { searchObject, ...this.props };
  }

  setSearchValue(value) {
    this.props.value = value;
    this.props.items.push(value);
  }

  setItems(items) {
    this.props.items = items;
  }

  setMinDate(date) {
    this.props.dateMin = date;
  }

  setMaxDate(date) {
    this.props.dateMax = date;
  }

}

export { EPCSFormInput as default };
