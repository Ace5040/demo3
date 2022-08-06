export default {
    structureType: "Popup",
    name: "confirmDeleteFilePopup",
    props: {
        header: "Удаление элемента",
        text: "Вы хотите удалить файл?",
        submitBtns: true,
        submitLabel: "Да",
        width: 500,
        submitEvent: "confirmDeleteFile",
        canselLabel: "Нет",
        cancelLabel: "Нет",
    },
};
