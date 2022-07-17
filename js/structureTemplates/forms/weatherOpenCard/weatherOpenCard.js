import inputComponentProps from '../../popup-menu/main-poup-menu.js';

var weatherOpenCard = {
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
      id: 300,
      priority: 1,
      parentId: 0,
      componentName: "EPCSDirectionMain",
      component: "EPCSDirection",
      props: {
        type: "row",
      },
    },
    {
      id: 108,
      priority: 1,
      parentId: 300,
      col: 6,
      visible: true,
      componentName: "EPCSCardProductionDetailedActive",
      component: "EPCSCardProductionDetailed",
      props: {},
    },
    {
      id: 109,
      priority: 1,
      parentId: 300,
      col: 6,
      visible: true,
      componentName: "EPCSGalleryProductCard",
      component: "EPCSGallery",
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

export { weatherOpenCard as default };
