import logicHub from '../logic/logicHub.js';
import { EPCSAccordion, EPCSButton, EPCSButtonGroup, EPCSButtonList, EPCSButtonTittleBar, EPCSCardProductionDetailed, EPCSCheckbox, EPCSColumn, EPCSCoordInputList, EPCSDataGrid, EPCSDataGridTemplate, EPCSDirection, EPCSFooter, EPCSFormHeader, EPCSFormInput, EPCSGallery, EPCSIconButton, EPCSJoystick, EPCSListView, EPCSMap, EPCSMapPopup, EPCSMapPopupFactory, EPCSMenuButton, EPCSMenuButtonList, EPCSMenuCard, EPCSNotificationBlock, EPCSPdfPopup, EPCSPopup, EPCSPopupMenu, EPCSProductionCard, EPCSProductionCardHub, EPCSRadioButtonGroup, EPCSRow, EPCSTabs, EPCSTextBlock, EPCSToggle, EPCSUploadBlock, EPCSUploadButton } from 'epcs-storybook';

var FormTemplate = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"main-form__inputs epcs-components"},_vm._l((_vm.formVue),function(tplComponent){return _c('div',{key:tplComponent.id,class:("CUSTOM-" + (tplComponent.component.getComponentName()))},[_c(tplComponent.component.getComponentName(),{tag:"component",class:'epcs-components',attrs:{"data":tplComponent.component.getProps(),"components":tplComponent.components},on:{"update:data":function($event){return tplComponent.component.setValue($event)},"hook:mounted":function($event){return _vm.initComponent(tplComponent.component)}}})],1)}),0)},
staticRenderFns: [],
  name: "FormTemplate",
  components: {
    EPCSAccordion,
    EPCSButton,
    EPCSButtonGroup,
    EPCSButtonList,
    EPCSButtonTittleBar,
    EPCSCardProductionDetailed,
    EPCSCheckbox,
    EPCSColumn,
    EPCSCoordInputList,
    EPCSDataGrid,
    EPCSDataGridTemplate,
    EPCSDirection,
    EPCSFooter,
    EPCSFormHeader,
    EPCSFormInput,
    EPCSGallery,
    EPCSIconButton,
    EPCSJoystick,
    EPCSListView,
    EPCSMap,
    EPCSMapPopup,
    EPCSMapPopupFactory,
    EPCSMenuButton,
    EPCSMenuButtonList,
    EPCSMenuCard,
    EPCSNotificationBlock,
    EPCSPdfPopup,
    EPCSPopup,
    EPCSPopupMenu,
    EPCSProductionCard,
    EPCSProductionCardHub,
    EPCSRadioButtonGroup,
    EPCSRow,
    EPCSTabs,
    EPCSTextBlock,
    EPCSToggle,
    EPCSUploadBlock,
    EPCSUploadButton
  },
  props: {
    formVue: {
      required: true,
    },
    form: {
      required: true,
    },
    formPopups: {
      required: false,
    },
    disabled: {
      required: false,
    },
  },
  computed: {},
  data() {
    return {
      testTemplate: null,
      logicForTpl: null,
    };
  },
  beforeMount() {
    // This method of import bussines logic
    this.initLogic();
  },
  watch: {
    formVue: {
      handler(val, old) {
        // this.$bus.$off("openDisp")
        this.initLogic();
        // do stuff
      },
      //  deep: true
    },
  },
  created() {},
  mounted() { },
  methods: {
    initComponent(component) {
      component.init();
    },
    initLogic() {
      Window.ctx = this;
      let formName = this.form.getFormName(),
        logics = logicHub[formName];

      if (logics) {
        Object.entries(logics).forEach((logic) => {
          let name = `logicFor${logic[0]}`;
          this._data[name] = new logic[1](this.form, this, this.formPopups);
        });
      }
      this.offDoublesEvents();
    },
    offDoublesEvents() {
      let events = this.$bus._events;
      Object.keys(events).forEach((eventItem) => {
        let event = events[eventItem];
        if (event && event.length > 1) {
          for (let i = 0; i < event.length - 1; i++) {
            if (i !== event.length - 1) {
              event.shift();
            }
          }
        }
      });
    },
  },
  beforeDestroy() {},
};

export { FormTemplate as default };
