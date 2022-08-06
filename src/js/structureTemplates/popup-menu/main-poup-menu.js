export default {
  buttonArr: [
    {
      data: {
        title: "Заявления",
        buttonIcon: "F033",
        state: "unfolded",
        event: "loadList",
        nameInnerForm: "ApplicationFloatListForm",
        isActive: true,
      },
      open: false,
    },
    {
      data: {
        title: "Разрешения",
        buttonIcon: "F033",
        state: "unfolded",
        event: "loadList",
        nameInnerForm: "PermitListForm",
        isActive: false,
      },
      open: false,
    },
    {
      data: {
        title: "Отказы в выдаче разрешения",
        buttonIcon: "F033",
        state: "unfolded",
        event: "loadList",
        nameInnerForm: "RefusalListForm",
        isActive: false,
      },
      open: false,
    },
    {
      data: {
        title: "Флот",
        buttonIcon: "F033",
        state: "unfolded",
        event: "loadList",
        nameInnerForm: "ShipsListForm",
        isActive: false,
      },
      open: false,
    },
  ],
};
