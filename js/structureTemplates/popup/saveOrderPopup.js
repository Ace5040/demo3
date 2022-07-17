var saveOrderPopup = {
  structureType: "Popup",
  name: "saveOrderPopup",
  props: {
    header: "Сохрание",
    text: "Оформить подписку?",
    submitBtns: true,
    width: 500,
    submitLabel: "Да",
    submitEvent: "saveOrderFormDataPopup",
    cancelLabel: 'Отмена',
    cancelEvent: 'saveTrackingFormDataAsDraftPopup'
  },
};

export { saveOrderPopup as default };
