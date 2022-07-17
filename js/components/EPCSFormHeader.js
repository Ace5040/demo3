import Component from './Component.js';

class EPCSFormHeader extends Component {
  constructor(dataComponent) {
    super(dataComponent);
    this.nameTemplate = "EPCSFormHeader";
   
    this.props = {
      title: "Заголовок страницы",
      disabled: false,
      headerButtons:[]
    };
    this.validateProps = ["title", "disabled", "headerButtons"];
    this._setPropsBeforeCreate(dataComponent);
    this.patternBtns = {
      shipsForm: {
        activateRow :['add','addConnect','copy','edit','delete','filter'],
        deactivateRow :['copy','edit','delete','addConnect']
      },
      mainForm:{
        activateRow :['add','copy','edit','delete','filter'],
        deactivateRow :['copy','edit','delete']
      }
     
    };
    this.buttons = this.props.headerButtons;
  }

  getComponentName() {
    return this.nameTemplate;
  }

  activateRow(formName) {
    this.buttons.forEach(button => {
      let checkDisabled = this.patternBtns[formName].activateRow.includes(button.name);
      button.disabled = checkDisabled ? false : button.disabled;
    });
  }

  deactivateRow(formName) {
    this.buttons.forEach(button => {
      let checkDisabled = this.patternBtns[formName].deactivateRow.includes(button.name);
      button.disabled = checkDisabled ? true : button.disabled;
    });
  }
  activateShipRow() {
    console.log(dataComponent);
  }

  clearFilter() {
    this.buttons.forEach(button => {
      button.isPressed =  false;
      button.disabled = button.name === 'clearFilter' ? true : button.disabled;
    });
  }

  setActiveFilter() {
    this.buttons.forEach(button => {
      button.isPressed = button.name === 'filter' ? true : false;
      button.disabled = button.name === 'clearFilter' ? false : button.disabled;
    });
  }



  getProps() {
    return this.props;
  }
  setDisabled(disabled) {
    this.props = {disabled,...this.props};
  }
}

export { EPCSFormHeader as default };
