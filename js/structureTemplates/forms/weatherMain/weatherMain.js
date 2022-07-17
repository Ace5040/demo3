import inputComponentProps from '../../popup-menu/main-poup-menu.js';

var weatherMain = {
  structureType: "Form",
  components: [
    {
      id: 100,
      priority: 1,
      parentId: 0,
      visible: true,
      componentName: "MainShipHeader",
      component: "EPCSFormHeader",
      props: { title: "Работа с гидрометеорологическими данными" },
    },
    {
      id: 105,
      priority: 1,
      parentId: 0,
      visible: true,
      componentName: "EPCSProductionCardHubMain",
      component: "EPCSProductionCardHub",
      props: {},
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

export { weatherMain as default };
