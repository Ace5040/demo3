<template>
  <div class="main-form__inputs epcs-components">
    <div
      v-for="tplComponent in components"
      :key="tplComponent.id"
      :class="`CUSTOM-${tplComponent.component.getComponentName()}`"
    >
      <component
        :is="tplComponent.component.getComponentName()"
        :data="tplComponent.component.getProps()"
        :components="tplComponent.components"
        :application="application"
        class="epcs-components"
        @update:value="tplComponent.component.setValue($event)"
      />
    </div>
  </div>
</template>

<script>
import logicHub from "../logic/logicHub";

import {
  EPCSButton,
  EPCSButtonGroup,
  EPCSButtonTittleBar,
  EPCSColumn,
  EPCSDataGrid,
  EPCSFooter,
  EPCSFormHeader,
  EPCSFormInput,
  EPCSIconButton,
  EPCSMenuButton,
  EPCSMenuButtonList,
  EPCSMenuCard,
  EPCSPdfPopup,
  EPCSPopup,
  EPCSPopupMenu,
  EPCSRadioButtonGroup,
  EPCSRow,
  EPCSUploadButton,
  EPCSDirection,
  EPCSMap,
  EPCSCheckbox,
  EPCSTabs,
  EPCSUploadBlock,
  EPCSJoystick,
  EPCSToggle,
} from "epcs-storybook";

export default {
  name: "FormTemplate",
  components: {
    EPCSButton,
    EPCSButtonGroup,
    EPCSButtonTittleBar,
    EPCSColumn,
    EPCSDataGrid,
    EPCSFooter,
    EPCSFormHeader,
    EPCSFormInput,
    EPCSIconButton,
    EPCSMenuButton,
    EPCSMenuButtonList,
    EPCSMenuCard,
    EPCSPdfPopup,
    EPCSPopup,
    EPCSPopupMenu,
    EPCSRadioButtonGroup,
    EPCSRow,
    EPCSUploadButton,
    EPCSDirection,
    EPCSMap,
    EPCSCheckbox,
    EPCSTabs,
    EPCSUploadBlock,
    EPCSToggle,
    EPCSJoystick,
  },
  props: {
    data: {
      required: false,
    },
    application: {
      required: false,
    },
  },
  data() {
    return {
      components: null,
    };
  },
  beforeMount() {
    this.init();
  },
  watch: {
    data: {
      handler() {
        this.init();
      },
    },
  },
  methods: {
    init() {
      // запрашивает структуру необходимой нам формы

      const form = this.application.getFormByName(
        this.data.nameForm,
        this.data
      );
      this.components = form.getFormForVue();
      let formName = form.getFormName();

      let logics = logicHub[formName];
      if (logics) {
        Object.entries(logics).forEach((logic) => {
          let name = `logicFor${logic[0]}`;

          const previousLogicObject = this._data[name];
          if (previousLogicObject && previousLogicObject.destroy) {
            previousLogicObject.destroy();
          }

          // запрашивает структуры всех попапов
          const formPopups = this.application.getAppAllPopupForms();
          this._data[name] = new logic[1](form, this, formPopups);
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
};
</script>
