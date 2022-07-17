var backToNotEmptyFormOrderPopup = {
  structureType: "Popup",
  name: "backToNotEmptyFormOrderPopup",
  props: {
    header: "Заказ данных",
    text: 'Если вы выберете "Назад" данные буду сброшены. Выйти или продолжить формирование заказа?',
    submitBtns: true,
    width: 500,
    submitLabel: "Назад",
    submitEvent: "backToOrderFormDataOkPopup",
    cancelLabel: 'Продолжить',
    cancelEvent: 'backToOrderFormDataCancelPopup'
  },
};

export { backToNotEmptyFormOrderPopup as default };
