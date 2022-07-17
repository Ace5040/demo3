import inputComponentProps from '../../popup-menu/main-poup-menu.js';

var weatherOrder = {
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
        title: "Оформление заказа ГМО",
      },
    },
    {
      id: 301,
      priority: 1,
      parentId: 0,
      componentName: "EPCSDirectionOrder",
      component: "EPCSDirection",
      props: {
        type: "row",
      },
    },
    {
      id: 335,
      priority: 1,
      parentId: 301,
      componentName: "EPCSDirectionOrderParams",
      component: "EPCSDirection",
      col: 6,
      props: {
        type: "row",
      },
    },
    {
      id: 1152,
      priority: 1,
      parentId: 335,
      componentName: "ProductItemName",
      component: "EPCSFormInput",
      col: 12,
      props: {
        label: 'Наименование продукта',
        labelPosition: 'top',
        type: 'select',
        value: null,
        placeholder: 'Выберите продукт',
        disabled: false,
        event: 'selectProductName',
        isDataSource: true,
        exprItemName: 'prname',
        exprItemVal: 'prid',
        labelRequired: true
      },
    },
    {
      id: 1252,
      priority: 1,
      parentId: 335,
      componentName: "ProductDateFrom",
      component: "EPCSFormInput",
      col: 6,
      props: {
        label: 'Период c',
        labelPosition: 'top',
        type: 'date',
        value: null,
        placeholder: 'Выберите дату',
        disabled: false,
        event: 'selectProductDateFrom',
        isDataSource: true,
        exprItemName: 'prname',
        labelRequired: true,
        exprItemVal: 'prid'
      },
    },
    {
      id: 1253,
      priority: 1,
      parentId: 335,
      componentName: "ProductDateTo",
      component: "EPCSFormInput",
      col: 6,
      props: {
        label: 'по',
        labelPosition: 'top',
        type: 'date',
        value: null,
        placeholder: 'Выберите дату',
        disabled: false,
        event: 'selectProductDateTo',
        isDataSource: true,
        exprItemName: 'prname',
        exprItemVal: 'prid',
        labelRequired: true,
      },
    },
    {
      id: 1153,
      priority: 1,
      parentId: 335,
      componentName: "ProductItemRenewalPeriod",
      component: "EPCSFormInput",
      col: 6,
      props: {
        label: 'Периодичность обновления',
        labelPosition: 'top',
        type: 'select',
        items: [
          '  ',
        ],
        value: null,
        placeholder: 'Выберите период',
        disabled: false,
        event: 'selectRenewal',
        labelRequired: true
      },
    },
    {
      id: 1154,
      priority: 1,
      parentId: 335,
      componentName: "ProductItemBeforeHand",
      component: "EPCSFormInput",
      col: 6,
      props: {
        label: 'Заблаговременность прогноза',
        labelPosition: 'top',
        type: 'select',
        items: [
          '  ',
        ],
        value: null,
        placeholder: 'Выберите период',
        disabled: false,
        event: 'selectBeforeHand',
        labelRequired: true
      },
    },
    {
      id: 1155,
      priority: 1,
      parentId: 335,
      componentName: "ProductItemBeforeHandForecastDiscreteness",
      component: "EPCSFormInput",
      col: 6,
      props: {
        label: 'Дискретность прогноза',
        labelPosition: 'top',
        type: 'select',
        items: [
          '  ',
        ],
        value: null,
        placeholder: 'Выберите период',
        disabled: false,
        event: 'selectForecastDiscreteness',
        labelRequired: true
      },
    },
    {
      id: 1156,
      priority: 1,
      parentId: 335,
      componentName: "ProductItemBeforeHandFormatData",
      component: "EPCSFormInput",
      col: 6,
      props: {
        label: 'Формат данных',
        labelPosition: 'top',
        type: 'select',
        items: [
          '  ',
        ],
        value: null,
        placeholder: 'Выберите формат',
        disabled: false,
        event: 'selectHandFormatData',
        labelRequired: true
      },
    },
    {
      id: 336,
      priority: 1,
      parentId: 335,
      componentName: "EPCSDirectionOrderParamsSwitches",
      component: "EPCSDirection",
      col: 12,
      props: {
        type: "row",
        label: 'Регионы интереса'
      },
    },
    {
      id: 1157,
      priority: 1,
      parentId: 336,
      componentName: "RegionInterestingRadio",
      component: "EPCSRadioButtonGroup",
      col: 9,
      props: {
        inputData: [
          "Задание региона вручную",
          "Выбор региона из списка",
        ],
        type: 'column',
        event: 'selectRegionInterestingRadio',
        value: 1
      },
    },
    {
      id: 651,
      priority: 650,
      parentId: 336,
      componentName: "InputCoordsListButton",
      component: "EPCSButtonTittleBar",
      col: 1,
      props: {
        event: 'inputCoordsListButton',
        iconData: "F087",
        isPressed: false,
        disabled: true
      },
    },
    {
      id: 652,
      priority: 651,
      parentId: 336,
      componentName: "InputPolygonDraw",
      component: "EPCSButtonTittleBar",
      col: 1,
      props: {
        event: 'InputPolygonDrawEvent',
        iconData: "F08F",
        isPressed: false
      },
    },
    {
      id: 653,
      priority: 652,
      parentId: 336,
      componentName: "InputDeleteData",
      component: "EPCSButtonTittleBar",
      col: 1,
      props: {
        event: 'InputDeleteDataEvent',
        iconData: "F06C",
        isPressed: false,
        disabled: true
      },
    },
    {
      id: 1189,
      priority: 1,
      parentId: 336,
      componentName: "ProductItemRegionDropDownText",
      component: "EPCSFormInput",
      col: 12,
      props: {
        label: 'Выбор региона из списка',
        labelPosition: 'top',
        type: 'select',
        value: null,
        placeholder: 'Выберите зону из списка',
        disabled: false,
        event: 'selectRegionName',
        isDataSource: true,
        exprItemName: 'name',
        exprItemVal: 'id',
        labelRequired: true
      },
    },
    {
      id: 621,
      priority: 1,
      parentId: 336,
      componentName: "EPCSCoordsInputList",
      component: "EPCSCoordInputList",
      col: 12,
      props: {
        inputList: [
          {
            coords: [null, null],
            id: 0,
          },
        ],
        minusEvent: 'deleteMapPoint',
        plusEvent: 'addMapPoint',
        latEvent: 'inputLatEvent',
        latDirectionEvent: 'inputLatDirectionEvent',
        lonEvent: 'inputLonEvent',
        lonDirectionEvent: 'inputLonDirectionEvent',
        visible: false,
      },
    },
    {
      id: 339,
      priority: 50,
      parentId: 335,
      componentName: "EPCSDirectionOrderParamsModels",
      component: "EPCSDirection",
      col: 12,
      props: {
        type: "row",
        label: 'Параметры модели',
        labelRequired: true
      },
    },
    {
      id: 1159,
      priority: 3,
      parentId: 339,
      componentName: 'SelectOrderParamModels',
      component: 'EPCSListView',
      col: 12,
      props:
        {
          selectEvent: 'selectOrderParamModels',
          type: 'multiple',
          // disabled: true,
          keyExpr: 'paramModelId'
        },
    },
    {
      id: 338,
      priority: 50,
      parentId: 335,
      componentName: "EPCSDirectionOrderDataSelectable",
      component: "EPCSDirection",
      col: 12,
      props: {
        type: "row",
        label: 'Тип предоставляемых данных',
        labelRequired: true
      },
    },
    {
      id: 121,
      parentId: 338,
      priority: 1,
      componentName: "CheckMapLayer",
      component: "EPCSCheckbox",
      visible: true,
      col: 6,
      props: {
        label: "Картографический слой",
        value: false,
        event: "checkedMapLayer"
      },
    },
    {
      id: 122,
      parentId: 338,
      priority: 1,
      componentName: "CheckDownloadFile",
      component: "EPCSCheckbox",
      visible: true,
      col: 6,
      props: {
        label: "Скачать файл",
        value: false,
        event: "checkedSaveFile"
      },
    },
    {
      id: 108,
      priority: 1,
      parentId: 335,
      componentName: "EPCSFooterOrder",
      component: "EPCSFooter",
      col: 12,
      props: {
        leftLabel: 'НАЗАД',
        leftType: 'primary',
        leftDisabled: false,
        leftEvent: 'backToForm',
        rightLabel: 'ЗАКАЗАТЬ',
        rightType: 'primary',
        rightDisabled: false,
        rightEvent: 'saveOrderPopup',
      },
    },




    {
      id: 310,
      priority: 1,
      parentId: 301,
      componentName: "OrderRegionMap",
      component: "EPCSMap",
      col: 6,
      props: {
        mapCenterCoords: [80.2, 71.2],
        mapId: 'TrackingMap',
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
      id: 10205,
      priority: 1,
      parentId: 0,
      visible: true,
      component: "EPCSPopup",
      componentName: "EPCSPopup",
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

export { weatherOrder as default };
