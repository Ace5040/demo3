export default {
    structureType: "Popup",
    name: "saveChangesPopup",
    props: {
        header: "Сохранение",
        text: "Данные были изменены. Сохранить?",
        submitBtns: true,
        submitLabel: "Да",
        width: 500,
        submitEvent: "saveChanges",
        canselLabel: "Нет",
        cancelLabel: "Нет",
        cancelEvent: "back",
    },
};
