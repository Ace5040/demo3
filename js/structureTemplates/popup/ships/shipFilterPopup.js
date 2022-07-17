var shipFilterPopup = {
  structureType: "Popup",
  name: "filterPopup",
  storeName:"shipsStore",
  props: {
    header: "Фильтр",
    submitBtns: true,
    submitEvent: "filteringShipsData",
    width: 800,
    activePoup: false,
    submitLabel: "Применить",
    canselLabel:'Отмена',
    filter : true
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
        items: [
          "ARKTIKA",
          "VLADIMIR"
        ],
        value: "",
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
        items: ["Arc7", "Arc8", "Arc5"],
        value: "",
      },
    },
    {
      id: 3,
      parentId: 0,
      componentName: "status",
      component: "EPCSFormInput",
      props: {
        label: "Статус",
        labelPosition: "left",
        placeholder: "Статус",
        type: "select",
        items: ["Черновик", "Заполнено"],
        value: "",
      },
    },
  ],
};

export { shipFilterPopup as default };
