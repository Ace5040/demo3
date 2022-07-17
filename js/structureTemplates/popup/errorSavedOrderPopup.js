var errorSavedOrderPopup = {
  structureType: "Popup",
  name: "errorSavedOrderPopup",
  props: {
    header: "Ошибка",
    text: "Данные не заполнены!",
    submitBtns: true,
    width: 500,
    submitLabel: "ОК",
    submitEvent: "okErrorOrderFormDataPopup",
    cancelLabel: 'Отмена',
    cancelEvent: 'cancelErrorOrderFormDataPopup'
  },
};

export { errorSavedOrderPopup as default };
