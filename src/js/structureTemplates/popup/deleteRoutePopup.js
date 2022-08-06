export default {
    structureType: "Popup",
    name: "deleteRoutePopup",
    props: {
        header: "Удаление маршрута",
        text: "Вы хотите удалить маршрут?",
        submitBtns: true,
        submitLabel: "Да",
        width: 500,
        submitEvent: "deleteRoute",
        canselLabel: "Нет",
        cancelLabel: "Нет",
    },
};
