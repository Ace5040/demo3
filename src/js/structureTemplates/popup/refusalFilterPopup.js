export default {
  structureType: "Popup",
  name: "refusalFilterPopup",
  props: {
    header: "Фильтр",
    submitBtns: true,
    submitEvent: "filteringRefusalList",
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
      priority: 1,
      componentName: "EPCSDirection",
      component: "EPCSDirection",
      props: {
        type: "row",
      },
    },
    {
      id: 2,
      parentId: 1,
      componentName: "shipName",
      component: "EPCSFormInput",
      props: {
        label: "Судно",
        labelPosition: "left",
        type: "select",
        placeholder: "Судно",
      },
    },
    {
      id: 3,
      parentId: 1,
      componentName: "labelDate",
      component: "EPCSDirection",
      col: 12,
      props: {
        label: "Дата отказа",
      },
    },
    {
      id: 4,
      parentId: 1,
      componentName: "dateBefore",
      component: "EPCSFormInput",
      col: 6,
      props: {
        label: "от",
        labelPosition: "left",
        placeholder: "дд.мм.гггг",
        format: "d.MM.yyyy",
        type: "date",
      },
    },
    {
      id: 5,
      parentId: 1,
      componentName: "dateAfter",
      component: "EPCSFormInput",
      col: 6,
      props: {
        type: "date",
        placeholder: "дд.мм.гггг",
        format: "d.MM.yyyy",
        label: "до",
        labelPosition: "left",
      },
    },
  ],
};
