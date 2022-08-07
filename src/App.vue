<template>
  <div id="app" class="epcs-permit">
    <FormTemplate :data="formData" :application="application"></FormTemplate>
  </div>
</template>

<script>
import FormTemplate from "./components/FormTemplate";
import Application from "./js/application/Application";
import allStructures from "./js/structureTemplates/allStructures";
import allPopupStructures from "./js/structureTemplates/popup/allPopupStructures";

export default {
  name: "App",
  props: {
    store: {
      required: true,
    },
    eventBus: {
      required: true,
    },
  },
  components: {
    FormTemplate,
  },
  data() {
    return {
      formData: null,
      application: null,
    };
  },
  beforeMount() {
    this.application = new Application({
      allStructures,
      allPopupStructures,
    });

    this.getComponent({
      nameForm: "MainForm",
      nameInnerForm: "ApplicationFloatListForm",
      title: "Заявления",
    });
    this.$bus.$on("getComponent", (e) => this.getComponent(e));
    this.$bus.$on("back", () => history.back());

    window.onpopstate = (event) => {
      if (event.singleSpaTrigger === "pushState") {
        return;
      }

      if (!event.state.nameForm) {
        return;
      }

      this.getComponent(event.state, false);
    };
  },
  methods: {
    getComponent(data, pushHistory = true) {
      this.formData = data;
      if (pushHistory) {
        history.pushState(this.formData, this.formData.nameForm, "");
      }
      this.clearBusEvents();
    },
    clearBusEvents() {
      const events = Object.keys(this.$bus._events).filter(
        (e) => !["back", "getComponent"].includes(e)
      );
      for (let eventName of events) {
        this.$bus._events[eventName] = [];
      }
    },
  },
  beforeDestroy() {
    this.$bus.$off("getComponent");
    this.$bus.$off("back");
  },
};
</script>
<style lang="scss" >
@import "./scss";

.CUSTOM-DIR-ApplicationFloatDetailTabs {
  /**works */

  .CUSTOM-DIR-works {
    .CUSTOM-DIR-workTypeDescription {
      width: calc(50% - 80px);
      padding-left: 8px;

      .epcs-form-input__title_left {
        width: inherit !important;
        white-space: nowrap !important;
      }
    }

    .CUSTOM-DIR-addButton,
    .CUSTOM-DIR-deleteButton {
      text-align: center;
      width: 32px !important;
    }
  }

  /**end works */

  /**route */

  .CUSTOM-DIR-activateRouteMapButton,
  .CUSTOM-DIR-clearRouteButton {
    width: 35px;
  }

  .CUSTOM-DIR-routeLabel {
    width: calc(100% - 80px);
  }

  .CUSTOM-DIR-routeLeftSide {
    width: 590px;
  }

  .CUSTOM-DIR-routeMap {
    width: calc(100% - 620px);
  }

  .CUSTOM-DIR-route {
    .CUSTOM-DIR-coordiateRow {
      width: calc(100% - 80px);
    }

    .CUSTOM-DIR-coordiateButtonsRow {
      width: 72px;
    }

    .CUSTOM-DIR-lat,
    .CUSTOM-DIR-lon {
      min-width: 178px;
      max-width: 178px;
    }

    .CUSTOM-DIR-latDirection,
    .CUSTOM-DIR-lonDirection {
      min-width: 60px;
      max-width: 60px;
    }

    .CUSTOM-DIR-addButton,
    .CUSTOM-DIR-deleteButton {
      text-align: center;
      width: 32px !important;
    }
  }

  @media (max-width: 1270px) {
    .CUSTOM-DIR-routeLeftSide {
      width: 380px;
    }

    .CUSTOM-DIR-route {
      width: 326px;
    }

    .CUSTOM-DIR-routeMap {
      width: calc(100% - 410px);
    }

    .CUSTOM-DIR-route {
      .CUSTOM-DIR-coordiateButtonsRow {
        align-self: end;
      }

      .CUSTOM-DIR-coordiateRowLat,
      .CUSTOM-DIR-coordiateRowLon {
        width: 100%;
        margin-bottom: 0;

        .epcs-form-input__title_left {
          min-width: 75px;
        }
      }
    }
  }

  .CUSTOM-DIR-routeMap {
    min-height: 70vh;
  }

  .epcs-map {
    height: 70vh;
  }

  /**end route */

  .dx-multiview-wrapper {
    padding: 16px;
  }

  .epcs-form-input__title_left {
    white-space: pre-wrap !important;
    display: block !important;

    > :nth-child(2) {
      display: inline-flex !important;
    }
  }

  .col-6
    > div
    > div
    > .epcs-form-input-group_left
    > .epcs-form-input__title_left {
    width: 100%;
  }

  .col-12 > div > div > .epcs-form-input-group_left {
    & > .epcs-form-input__title_left {
      width: calc(25% - 3px);
    }

    & > .form-input,
    & > .form-input__disabled {
      width: calc(75% + 3px) !important;
    }
  }

  .direction-column {
    align-self: center;
  }

  /**исправлено - попап не всегда стилизуется правильно */
  .dx-popup-title.dx-toolbar {
    padding: 0;
  }

  .dx-popup-normal .dx-toolbar .dx-toolbar-items-container {
    height: 28px;
  }
}

.CUSTOM-EPCSPopupMenu {
  .popup-menu-open__left > div:nth-child(2) {
    max-height: 50vh;
    overflow: auto;
  }
}

.dx-fileuploader-files-container {
  display: none;
}

.epcs-upload-block > div > span:first-child {
  padding-right: 4px;
}

.hidepopup {
  .dx-popup-normal {
    opacity: 0 !important;
  }
}

// .CUSTOM-EPCSToggle {
//   position: absolute;
//   z-index: 1;
//   top: -3px;
//   left: 364px;

//   .epcs-components.radio-button-group__row,
//   .radio-button-group__block {
//     background-color: transparent;
//   }

//   label {
//     color: white;
//   }
// }
</style>
