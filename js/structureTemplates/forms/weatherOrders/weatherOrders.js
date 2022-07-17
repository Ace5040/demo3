import inputComponentProps from '../../popup-menu/main-poup-menu.js';

var weatherOrders = {
  structureType: "Form",
  components: [
    {
      id: 100,
      priority: 1,
      parentId: 0,
      visible: true,
      componentName: "MainShipHeader",
      component: "EPCSFormHeader",
      props: {
        title: "Заказы продукции",
        headerButtons: [{
          id: 0,
          iconData: "F012",
          isPressed: false,
          type: "small",
          event: "addNewOrder",
          label: "",
          disabled:false,
          name:"add"
        }]
      },
    },
    {
      id: 1,
      priority: 3,
      parentId: 0,
      componentName: 'WeatherOrders',
      component: 'EPCSDataGrid',
      props:
        {
          inputColumnNames: {},
          tableData: [],
          noDataText: 'Заказы ГМО отсутствуют',
          eventClick: 'selectOrderLine',
          eventDoubleClick: 'openWeatherOrder',
          selectionMode: "single",
        },
    },
    {
      id: 108,
      priority: 1,
      parentId: 0,
      visible: true,
      componentName: "EPCSPopupMenu",
      component: "EPCSPopupMenu",
      props: {
        iconData: "61454",
        label: "Навигация",
        width: 340,
        inputComponentProps
      },
    },
    {
      id: 2000,
      priority: 1,
      parentId: 0,
      visible: true,
      component: "EPCSJoystick",
      componentName: "EPCSJoystick",
      props: {
        leftEvent: 'joystickLeftButton',
        rightEvent: 'joystickRightButton'
      }
    },
  ]
};

export { weatherOrders as default };
