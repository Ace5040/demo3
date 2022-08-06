export default {
  structureType: "Form",
  components: [
    {
      id: 1,
      priority: 1,
      parentId: 0,
      componentName: "EPCSMainHeader",
      component: "EPCSFormHeader",
      props: { title: "Форма заявления", headerButtons: {} },
    },
    {
      id: 2,
      priority: 1,
      parentId: 0,
      component: "EPCSDirection",
      componentName: "EPCSDirectionMain",
      props: {
        type: "row",
      },
    },
    {
      id: 3,
      parentId: 2,
      priority: 1,
      component: "EPCSTabs",
      componentName: "ApplicationFloatDetailTabs",
      props: {
        dataTabs: [
          {
            name: "Сведения",
          },
          {
            name: "Документы",
          },
          {
            name: "Маршрут",
          },
        ],
      },
    },
    {
      id: 4,
      priority: 1,
      parentId: 3,
      component: "EPCSDirection",
      componentName: "tab1",
      props: {
        type: "column",
      },
    },

    /** Сведения о заявителе  */

    {
      id: 102,
      parentId: 4,
      priority: 1,
      component: "EPCSDirection",
      componentName: "ApplicantGroup",
      props: {
        type: "row",
      },
    },

    {
      id: 152,
      parentId: 102,
      priority: 1,
      component: "EPCSTextBlock",
      componentName: "textApplicant",
      props: {
        text: "Сведения о заявителе",
        type: "h2",
      },
    },

    {
      id: 201,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "incomingNumber",
      col: 6,
      props: {
        type: "text",
        placeholder: "Укажите исходящий номер",
        label: "Исходящий номер заявления",
        labelPosition: "left",
      },
    },
    {
      id: 202,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "applicantStatus",
      col: 6,
      props: {
        type: "select",
        placeholder: "Выберите статус заявителя",
        label: "Статус заявителя",
        labelRequired: true,
        labelPosition: "left",
        searchObject: [
          { id: 0, name: "Судовладелец" },
          { id: 1, name: "Представитель судовладельца" },
          { id: 2, name: "Капитан судна" }],
        event: "applicantStatusChange",
      },
    },
    {
      id: 203,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "applicantId",
      col: 6,
      props: {
        type: "select",
        placeholder: "Укажите полное наименование организации",
        label: "Полное наименование организации",
        labelRequired: false,
        labelPosition: "left",
        event: "selectCompany",
      },
    },
    {
      id: 204,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "applicant.imo",
      col: 6,
      props: {
        type: "text",
        placeholder: "Укажите идентификационный номер организации",
        label: "Номер IMO (при наличии)",
        labelRequired: false,
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 205,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "shipOwnerName",
      col: 6,
      props: {
        type: "text",
        placeholder: "Укажите наименование организации",
        label: "Наименование организации (судовладельца)",
        labelRequired: false,
        labelPosition: "left",
        hidden: true,
      },
    },

    {
      id: 216,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "emptySpace3",
      col: 6,
      props: {
        type: "empty",
        hidden: true,
      },
    },

    {
      id: 206,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "applicant.director",
      col: 6,
      props: {
        type: "text",
        placeholder: "Укажите ФИО руководителя",
        label: "ФИО руководителя заявителя",
        labelRequired: false,
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 208,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "applicant.telephone",
      col: 6,
      props: {
        type: "text",
        placeholder: "Укажите номер телефона",
        label: "Телефон организации",
        labelRequired: false,
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 209,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "applicant.fax",
      col: 6,
      props: {
        type: "text",
        placeholder: "Укажите номер факса",
        label: "Факс организации",
        labelRequired: false,
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 210,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "applicant.email",
      col: 6,
      props: {
        type: "text",
        placeholder: "Укажите электронную почту",
        label: "Электронная почта организации",
        labelRequired: false,
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 211,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "applicant.responsibleTelephone",
      col: 6,
      props: {
        type: "text",
        placeholder: "Укажите номер телефона",
        label: "Телефон ответственного лица/исполнителя",
        labelRequired: false,
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 212,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "applicant.responsibleEmail",
      col: 6,
      props: {
        type: "text",
        placeholder: "Укажите электронную почту",
        label: "Электронная почта ответственного лица/исполнителя",
        labelRequired: false,
        labelPosition: "left",
        disabled: true,
      },
    },

    {
      id: 213,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      col: 6,
      componentName: "applicant.responsible",
      props: {
        type: "text",
        placeholder: "Укажите ФИО ответственного лица",
        label: "ФИО ответственного лица",
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 214,
      parentId: 102,
      priority: 1,
      component: "EPCSFormInput",
      col: 6,
      componentName: "applicant.responsiblePost",
      props: {
        type: "text",
        placeholder: "Укажите должность",
        label: "Должность ответственного лица",
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 215,
      parentId: 102,
      priority: 1,
      component: "EPCSCheckbox",
      col: 6,
      componentName: "applicant.responsibleSignature",
      props: {
        label: "Право подписи ответственного лица",
        labelPosition: "top",
        disabled: true
      },
    },

    /** Сведения по маршруту */

    {
      id: 103,
      parentId: 4,
      priority: 1,
      component: "EPCSDirection",
      componentName: "Route",
      props: {
        type: "row",
      },
    },

    {
      id: 153,
      parentId: 103,
      priority: 1,
      component: "EPCSTextBlock",
      componentName: "textRoute",
      props: {
        text: "Сведения по маршруту",
        type: "h2",
      },
    },

    /**---- Порт/локация отхода */

    {
      id: 301,
      parentId: 103,
      priority: 1,
      component: "EPCSFormInput",
      col: 6,
      componentName: "departurePlace",
      props: {
        type: "text",
        placeholder: "Выберите порт/локацию",
        label: "Порт/локация отхода",
        labelPosition: "left",
      },
    },

    /**---- Порт/локация назначения */

    {
      id: 307,
      parentId: 103,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "destinationPlace",
      col: 6,
      props: {
        type: "text",
        placeholder: "Выберите порт/локацию",
        label: "Порт/локация назначения",
        labelPosition: "left",
      },
    },

    /**--- */


    {
      id: 313,
      parentId: 103,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "etaNsr",
      col: 6,
      props: {
        type: "date",
        placeholder: "",
        label: "Дата начала плавания в СМП",
        labelPosition: "left",
        labelRequired: true,
        value: new Date(),
        event: "selectEtaNsr",
      },
    },

    {
      id: 314,
      parentId: 103,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "etdNsr",
      col: 6,
      props: {
        type: "date",
        placeholder: "",
        label: "Дата окончания плавания в СМП",
        labelRequired: true,
        labelPosition: "left",
        value: new Date(),
        event: "selectEtdNsr",
      },
    },

    {
      id: 320,
      parentId: 103,
      priority: 1,
      component: "EPCSDirection",
      componentName: "works",
      col: 12,
      props: {
        type: "row",
      },
    },

    {
      id: 322,
      parentId: 103,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "routeDescription",
      col: 12,
      props: {
        type: "text",
        placeholder: "Опишите планируемый маршрут",
        label: "Описание предполагаемого маршрута плавания",
        labelRequired: true,
        labelPosition: "left",
      },
    },

    {
      id: 323,
      parentId: 103,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "crew",
      col: 6,
      props: {
        type: "number",
        placeholder: "0",
        label: "Экипаж",
        labelPosition: "left",
        value: null,
      },
    },

    {
      id: 324,
      parentId: 103,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "passangers",
      col: 6,
      props: {
        type: "number",
        placeholder: "0",
        label: "Пассажиры",
        labelPosition: "left",
        value: null,
      },
    },



    /** Сведения по грузу */

    {
      id: 104,
      parentId: 4,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSDirectionCargo",
      props: {
        type: "row"
      },
    },

    {
      id: 154,
      parentId: 104,
      priority: 1,
      component: "EPCSTextBlock",
      componentName: "textCargo",
      props: {
        text: "Сведения по грузу",
        type: "h2",
      },
    },

    {
      id: 401,
      parentId: 104,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "cargoTypeId",
      col: 6,
      props: {
        type: "select",
        placeholder: "Выберите тип груза",
        label: "Тип груза",
        labelPosition: "left",
      },
    },

    {
      id: 402,
      parentId: 104,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "weight",
      col: 6,
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Вес груза, т",
        labelPosition: "left",
        value: null,
        step: 0.1
      },
    },

    {
      id: 403,
      parentId: 104,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "hazardClassId",
      col: 6,
      props: {
        type: "select",
        placeholder: "Выберите класс опасности",
        label: "Класс опасности",
        labelPosition: "left",
      },
    },

    {
      id: 404,
      parentId: 104,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "weightDangerous",
      col: 6,
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Вес опасного груза, т",
        labelPosition: "left",
        value: 0,
        step: 0.1
      },
    },

    {
      id: 405,
      parentId: 104,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "towedObject",
      col: 12,
      props: {
        type: "text",
        placeholder: "Опишите буксируемый объект",
        label: "Информация о буксируемом объекте",
        labelPosition: "left",
        value: null,
      },
    },

    /*******Сведения по судну */

    {
      id: 105,
      parentId: 4,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSDirectionShip",
      props: {
        type: "row",
      },
    },
    {
      id: 155,
      parentId: 105,
      priority: 1,
      component: "EPCSTextBlock",
      componentName: "textShip",
      props: {
        text: "Сведения по судну",
        type: "h2",
      },
    },
    {
      id: 501,
      parentId: 105,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "shipId",
      col: 6,
      props: {
        type: "selectAsync",
        placeholder: "Выберете судно",
        label: "Наименование судна",
        labelPosition: "left",
        value: "",
        event: "selectShip",
        labelRequired: true,
        asyncSetting: {
          displayExpr: "name",
          valueExpr: "id",
          customValue: true,
          asyncName: "Ship",
          templateRow: {
            id: null,
            name: "",
            imo: null,
          },
          ignoreCustomItemCreating: true,
        },
      },
    },
    {
      id: 502,
      parentId: 105,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.imo",
      col: 6,
      props: {
        type: "text",
        placeholder: "Введите номер IMO",
        label: "Номер IMO (при наличии)",
        labelRequired: false,
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 503,
      parentId: 105,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.registerNumber",
      col: 6,
      props: {
        type: "text",
        placeholder: "Введите регистровый номер",
        label: "Регистровый номер",
        labelRequired: false,
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 504,
      parentId: 105,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.callsign",
      col: 6,
      props: {
        type: "text",
        placeholder: "Введите позывной сигнал судна",
        label: "Позывной сигнал судна",
        labelRequired: false,
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 505,
      parentId: 105,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.flagId",
      col: 6,
      props: {
        type: "select",
        placeholder: "Выберите страну",
        label: "Флаг государства судна",
        labelRequired: true,
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 506,
      parentId: 105,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.shipTypeId",
      col: 6,
      props: {
        type: "select",
        placeholder: "Выберите тип судна",
        label: "Тип судна",
        labelRequired: false,
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 507,
      parentId: 105,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.iceClass",
      col: 6,
      props: {
        type: "select",
        placeholder: "Выберите ледовый класс",
        label: "Ледовый класс в соответствии с РМРС",
        labelRequired: true,
        labelPosition: "left",
        disabled: true,
      },
    },

    /** Технические характеристики*/

    {
      id: 106,
      parentId: 4,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSDirectionTech",
      props: {
        type: "row",
      },
    },

    {
      id: 156,
      parentId: 106,
      priority: 1,
      component: "EPCSTextBlock",
      componentName: "textTech",
      props: {
        text: "Технические характеристики",
        type: "h2",
      },
    },

    {
      id: 601,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      col: 6,
      componentName: "ship.overallLength",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Длина наибольшая, м ",
        labelPosition: "left",
        step: 1,
        disabled: true,
      },
    },
    {
      id: 602,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      col: 6,
      componentName: "ship.grossTonnage",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Валовая вместимость, т",
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 603,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      col: 6,
      componentName: "ship.breadth",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Ширина наибольшая, м ",
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 604,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      col: 6,
      componentName: "ship.deadweight",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Дедвейт, т",
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 605,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      col: 6,
      componentName: "ship.draught",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Осадка максимальная, м ",
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 606,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      col: 6,
      componentName: "ship.populsionMotorPower",
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Мощность ГЭУ, кВт",
        labelPosition: "left",
        disabled: true,
      },
    },

    {
      id: 607,
      parentId: 106,
      priority: 1,
      component: "EPCSDirection",
      componentName: "petrolParametersLabel",
      col: 12,
      props: {
        label: "Тип топлива и суточный расход, т",
      },
    },

    {
      id: 608,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.fuelHeavy",
      col: 6,
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Тяжелое топливо",
        labelPosition: "left",
        value: null,
        disabled: true,
      },
    },

    {
      id: 609,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.fuelLight",
      col: 6,
      props: {
        type: "number",
        placeholder: "0.0",
        label: "Легкое топливо",
        labelPosition: "left",
        value: null,
        disabled: true,
      },
    },

    {
      id: 610,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.fuelSpg",
      col: 6,
      props: {
        type: "number",
        placeholder: "0.0",
        label: "СПГ",
        labelPosition: "left",
        value: null,
        disabled: true,
      },
    },

    {
      id: 613,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "emptySpace",
      col: 6,
      props: {
        type: "empty",
      },
    },

    {
      id: 611,
      parentId: 106,
      priority: 1,
      component: "EPCSCheckbox",
      componentName: "ship.bulb",
      col: 6,
      props: {
        label: "Наличие бульба/аппарели",
        labelPosition: "right",
        disabled: true,
      },
    },

    {
      id: 612,
      parentId: 106,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.stern",
      col: 6,
      props: {
        type: "text",
        placeholder: "Опишите особенности",
        label: "Особенности кормовой оконечности",
        labelPosition: "left",
        disabled: true,
      },
    },

    /** Контактная информация*/

    {
      id: 107,
      parentId: 4,
      priority: 1,
      component: "EPCSDirection",
      componentName: "EPCSDirectionShipContacts",
      props: {
        type: "row",
      },
    },

    {
      id: 157,
      parentId: 107,
      priority: 1,
      component: "EPCSTextBlock",
      componentName: "textShipContacts",
      props: {
        text: "Контактная информация",
        type: "h2",
      },
    },

    {
      id: 701,
      parentId: 107,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.telephone",
      col: 6,
      props: {
        type: "text",
        placeholder: "Укажите номер телефона судна",
        label: "Спутниковый тел. номер (при наличии)",
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 702,
      parentId: 107,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.fax",
      col: 6,
      props: {
        type: "text",
        placeholder: "Укажите номер судового факса",
        label: "Номер судового факса (при наличии)",
        labelPosition: "left",
        disabled: true,
      },
    },
    {
      id: 703,
      parentId: 107,
      priority: 1,
      component: "EPCSFormInput",
      componentName: "ship.email",
      col: 6,
      props: {
        type: "text",
        placeholder: "example@email.ru",
        label: "Адрес судовой электронной почты (при наличии)",
        labelPosition: "left",
        disabled: true,
      },
    },

    /**------------------------- */

    {
      id: 5,
      priority: 1,
      parentId: 3,
      component: "EPCSDirection",
      componentName: "tab2",
      props: {
        type: "column",
      },
    },

    /**Файлы  */

    {
      id: 108,
      parentId: 5,
      priority: 1,
      component: "EPCSDirection",
      componentName: "files",
      props: {
        type: "row",
      },
    },

    {
      id: 158,
      parentId: 108,
      priority: 1,
      component: "EPCSTextBlock",
      componentName: "textFiles",
      props: {
        text: "Копии всех страниц документов, даже не заполненных, в формате pdf",
        type: "h2",
      },
    },

    {
      id: 801,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "fileApplication",
      props: {
        label: "Подписанное заявление",
        labelRequired: true,
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile1",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile1"
        },
      },
    },

    {
      id: 802,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "fileInfo",
      props: {
        label: "Информация о судне и рейсе согласно Приложению 1",
        labelRequired: true,
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile2",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile2"
        },
      },
    },

    {
      id: 803,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file3",
      props: {
        label: "Классификационное свидетельство",
        labelRequired: true,
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile3",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile3"
        },
      },
    },

    {
      id: 804,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file4",
      props: {
        label: "Свидетельство судна полярного плавания",
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile4",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile4"
        },
      },
    },

    {
      id: 805,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file5",
      props: {
        label: "Свидетельство на оборудование и снабжение по форме 4.1.1 РМРС либо Свидетельство неконвенционного судна",
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile5",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile5"
        },
      },
    },

    {
      id: 806,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file6",
      props: {
        label: "Перечень оборудования к Свидетельству судна полярного плавания",
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile6",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile6"
        },
      },
    },

    {
      id: 807,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file7",
      props: {
        label: "Мерительное свидетельство",
        labelRequired: true,
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile7",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile7"
        },
      },
    },

    {
      id: 808,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file8",
      props: {
        label: "Страховка от загрязнения бункерным топливом",
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile8",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile8"
        },
      },
    },

    {
      id: 809,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file9",
      props: {
        label: "Страховка от загрязнения нефтью",
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile9",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile9"
        },
      },
    },

    {
      id: 810,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file10",
      props: {
        label: "Свидетельство о праве собственности на судно или иной документ, подтверждающий право собственности",
        labelRequired: true,
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile10",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile10"
        },
      },
    },

    {
      id: 811,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file11",
      props: {
        label: "Свидетельство о праве плавания под государственным флагом РФ",
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile11",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile11"
        },
      },
    },

    {
      id: 812,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file12",
      props: {
        label: "Договор на предоставление услуг по ледокольной проводке",
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile12",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile12"
        },
      },
    },

    {
      id: 813,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file13",
      props: {
        label: `Судовой билет (для прогулочных яхт, маломерных судов, спортивных парусных судов) или документ, 
        аналогичный судовому билету, выданный администрацией государства флага или признанной ею организацией`,
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile13",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile13"
        },
      },
    },

    {
      id: 814,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file14",
      props: {
        label: `Свидетельство, выданное организацией, 
        уполномоченной на классификацию и освидетельствование судов, одобрившей проект разового перехода (перегона)`,
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile14",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile14"
        },
      },
    },

    {
      id: 815,
      parentId: 108,
      priority: 1,
      component: "EPCSUploadBlock",
      componentName: "file15",
      props: {
        label: `Руководство по штатной буксировке или проект буксировки, 
        одобренный организацией, уполномоченной на классификацию и освидетельствование судов
         (для буксируемых плавучих объектов в установленном для них районе плавания,
        включая буксируемые плавучие буровые установки)`,
        uploadBtn: {
          type: "main",
        },
        dataPopup: {
          pdfPopupVisible: false,
        },
        event: "uploadFile",
        deleteEvent: "deleteFile",
        openEvent: "openFile15",
        dataPopup: {
          pdfFile: 'https://www.orimi.com/pdf-test.pdf',
          event: "openFile15"
        },
      },
    },

    /**------------------------------------------- */

    {
      id: 6,
      priority: 1,
      parentId: 3,
      component: "EPCSDirection",
      componentName: "tab3",
      props: {
        type: "row",
      },
    },

    /**Маршрут  */

    {
      id: 109,
      parentId: 6,
      priority: 1,
      component: "EPCSDirection",
      componentName: "routeLeftSide",
      col: 6,
      props: {
        type: "row",
      },
    },

    {
      id: 901,
      parentId: 109,
      priority: 1,
      component: "EPCSDirection",
      componentName: "routeLabel",
      col: 10,
      props: {
        label: `Введите координаты точек предполагаемого маршрута плавания в поля ввода координат или нарисуйте маршрут на карте`,
      },
    },

    {
      id: 902,
      priority: 1,
      parentId: 109,
      componentName: "activateRouteMapButton",
      component: "EPCSButtonTittleBar",
      col: 1,
      props: {
        event: "activateRouteMap",
        iconData: "F08F",
        isPressed: false,
      },
    },

    {
      id: 903,
      priority: 1,
      parentId: 109,
      componentName: "clearRouteButton",
      component: "EPCSButtonTittleBar",
      col: 1,
      props: {
        event: "clearRoute",
        iconData: "F06C",
        isPressed: false,
      },
    },

    {
      id: 904,
      parentId: 109,
      priority: 1,
      component: "EPCSDirection",
      componentName: "route",
      col: 12,
      props: {
        type: "row",
        event: "coordinatesChange",
      },
    },
    {
      id: 905,
      parentId: 6,
      priority: 1,
      component: "EPCSMap",
      componentName: "routeMap",
      name: "routeMap",
      col: 6,
      props: {
        mapId: "routeMap",
        event: "mapCoordinatesChange",
      }
    },

    /**------------------------------------------- */

    {
      id: 111,
      parentId: 0,
      priority: 5,
      component: "EPCSFooter",
      componentName: "footer",
      props: {
        leftEvent: "backFromApplicantFloatDetail",
        leftType: "primary",
        leftLabel: "Назад",
        middleLabel: "Сохранить черновик",
        middleEvent: "saveApplicationFloatDraft",
        middleType: "outline",
        rightLabel: "Отправить на рассмотрение",
        rightType: "primary",
        rightEvent: "saveApplicationFloat",
      },
    },
    {
      id: 112,
      priority: 5,
      parentId: 0,
      component: "EPCSPopup",
      componentName: "EPCSPopup",
    }
  ],
};
