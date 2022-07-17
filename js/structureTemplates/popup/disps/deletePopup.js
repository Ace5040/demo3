var deletePopup = {
  structureType: "Popup",
  name: "deletePopup",
  props: {
    header: "Удаление элемента",
    text: "Вы хотите удалить Диспетчерское СМП?",
    submitBtns: true,
    submitLabel: "Да",
    width: 500,
    submitEvent: "deleteDisp",
    canselLabel:'Отмена'
  },
};

export { deletePopup as default };
