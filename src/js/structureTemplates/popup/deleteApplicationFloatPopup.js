export default {
    structureType: "Popup",
    name: "deleteApplicationFloatPopup",
    props: {
        header: "Удаление элемента",
        text: "Вы хотите удалить это заявление?",
        submitBtns: true,
        submitLabel: "Да",
        width: 500,
        submitEvent: "deleteApplicationFloat",
        canselLabel: "Отмена",
        cancelLabel: "Отмена",
    },
};
