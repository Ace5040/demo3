var changeDataPopup = {
  structureType: "Popup",
  name: "changeDataPopup",
  props: {
    header: "Данные были изменены.",
    text: " Сохранить?",
    submitBtns: true,
    submitLabel: "Да",
    width: 500,
    submitEvent: "saveDisp",
    cancelEvent:'goToMainPage',
    cancelLabel:'Нет'
  },
};

export { changeDataPopup as default };
