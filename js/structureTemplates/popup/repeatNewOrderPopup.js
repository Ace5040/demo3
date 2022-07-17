var repeatNewOrderPopup = {
  structureType: "Popup",
  name: "repeatNewOrderPopup",
  props: {
    header: "Отправлено",
    text: "Данные успешно заказаны.",
    submitBtns: true,
    width: 500,
    submitLabel: "Ок",
    submitEvent: "repeatOrderFormDataOkPopup",
    cancelLabel: 'Заказать еще',
    cancelEvent: 'repeatOrderFormDataCancelPopup'
  },
};

export { repeatNewOrderPopup as default };
