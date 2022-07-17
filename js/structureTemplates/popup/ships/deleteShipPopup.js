var deleteShipPopup = {
  structureType: "Popup",
  name: "checkDeleteShip",
  props: {
    header: "Удаление элемента",
    text: "Вы хотите удалить судно?",
    submitBtns: true,
    submitLabel: "Да",
    width: 500,
    submitEvent: "deleteShip",
    canselLabel:'Отмена'
  },
};

export { deleteShipPopup as default };
