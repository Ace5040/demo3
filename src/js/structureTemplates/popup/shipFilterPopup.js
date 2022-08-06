export default {
  structureType: "Popup",
  name: "shipFilterPopup",
  storeName: "shipsStore",
  props: {
    header: "Фильтр",
    submitBtns: true,
    submitEvent: "filteringShipsList",
    width: 800,
    activePoup: false,
    submitLabel: "Применить",
    canselLabel: "Отмена",
    cancelLabel: "Отмена",
    filter: true
  },
  components: [
    {
      id: 1,
      parentId: 0,
      componentName: "name",
      component: "EPCSFormInput",
      props: {
        label: "Судно",
        labelPosition: "left",
        type: "select",
        placeholder: "Судно",
      },
    },
    {
      id: 2,
      parentId: 0,
      componentName: "iceClass",
      component: "EPCSFormInput",
      props: {
        label: "Ледовый класс",
        labelPosition: "left",
        placeholder: "Ледовый класс",
        type: "select",
      },
    },
  ],
};