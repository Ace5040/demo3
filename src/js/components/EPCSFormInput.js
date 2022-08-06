import Component from "./Component";
import moment from "moment";
import DateBox from "devextreme/ui/date_box";


class EPCSFormInput extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSFormInput";
    this.props = {
      placeholder: "Standard placeholder",
      type: "text",
      disabled: false,
      value: null,
      step: 1,
      min: 0,
      items: [],
      searchObject: [],
      spinButtons: true,
      required: false,
      isDataSource: true,
      exprItemName: "name",
      exprItemVal: "id",
      invalidMessage: "",
      customIsNotValid: false,
      dateMin: null,
      dateMax: null,
      calendarValue: null,
      ...dataComponent.props
    };

    this.col = dataComponent.col;
  }

  getComponentName() {
    return this.nameTemplate;
  }

  getValue() {
    return this.props.value;
  }

  setPlaceholder(text) {
    this.props.placeholder = text;
  }

  setType(type) {
    this.props.type = type;
  }

  getSource() {
    return this.props.isDataSource ? this.props.searchObject : this.props.items;
  }

  setSource(value) {
    if (this.props.isDataSource) {
      this.props.searchObject = value;
    }
    else {
      this.props.items = value;
    }
  }

  setValue(value) {
    this.props.value = value;
  }

  setNotValid(message = "Не заполнено") {
    this.props.customIsNotValid = true;
    this.props.invalidMessage = message;
  }

  setDateMin(value) {
    this.props.dateMin = value;
  }

  setDateMax(value) {
    this.props.dateMax = value;
  }

  setCalendarValue(value) {

    if (this.props.value) {
      return;
    }

    if (!this.props.calendarValue && !value) {
      return;
    }

    const date = value ? moment(value).startOf("day").toDate() : moment().startOf("day").toDate();
    if (!date) {
      return;
    }

    if (this.props.calendarValue === value) {
      return;
    }

    this.props.calendarValue = date;

    //TODO перенести в сторибук
    const element = document.querySelector(`.CUSTOM-DIR-${this.name} .dx-datebox`);

    if (!element) {
      return;
    }

    const dateBox = DateBox.getInstance(element);
    if (!dateBox) {
      return;
    }

    let calendar = dateBox._strategy._widget;
    if (calendar) {
      calendar.option("currentDate", this.props.calendarValue);
      calendar._getDate = () => this.props.calendarValue;
    } else {
      //если календарь ещё не создан
      try {
        document.body.classList.add("hidepopup");
        dateBox.open();
        dateBox.close();

        calendar = dateBox._strategy._widget;
        if (calendar) {
          calendar.option("currentDate", this.props.calendarValue);
        }
      }
      finally {
        setTimeout(() => {
          document.body.classList.remove("hidepopup");
        }, 0);
      }
    }
  }
}

export default EPCSFormInput;
