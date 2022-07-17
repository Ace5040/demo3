import structureForm from '../../names/nameForms.js';

var newDispPopup = {
  structureType: "Popup",
  name: "newDispPopup",
  props: {
    submitEvent: "addNewDisp",
    width: 400,
    header: "Выберите тип диспетчерского СМП:",
    submitBtns: true,
  },
  components: [
    {
      id: 1,
      parentId: 0,
      componentName: "EPCSRadioButtonGroup",
      component: "EPCSRadioButtonGroup",
      props: {
        value: "CreateDispAqua",
        type: "column",
        inputData: structureForm,
        event: "addActualDisp",
      },
    },
    // {
    //   id:2,
    //   componentName: "popupShipName1121",
    //   label: "Судно",
    //   labelPosition:'left',
    //   placeholder: "Выберете судно",
    //   type: "select",
    //   component:"EPCSFormInput",
    //   value: "",
    //   items: ["VLADIMIR", "Все суда"],
    //   class: "form__popup-input",
    //   filterName: "shipName",
    //   props:{},
    // },
  ],
};

export { newDispPopup as default };
