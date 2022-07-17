import 'ol/layer';
import 'ol';
import 'ol/source';
import 'ol/proj';
import 'proj4';
import 'ol/proj/proj4';

// Тут пишем бизнес-логику, в зависимости от того что нам нужно

class Popup {
  constructor(form, Vue, popups) {
    this.form = form;
    this.popups = popups;
    this.popup = this.form.getComponentByName("EPCSPopup").component;
    this.$Vue = Vue;
    this.nameFilters = {
      shipFilterPopup : "shipsStore/settingsFilter",
      filterPopup : "dispStore/settingsFilter"
    };
    this.createBusForPopups();
    this.$Vue.$bus.$on('checkDeleteShip',()=> this.checkDeleteShip());
  }

  createBusForPopups() {
    Object.keys(this.popups).forEach((popup) => {
      this.$Vue.$bus.$on(popup, () => {
        let propsPopup = this.popups[popup].getFormPopupForVue();
        if (propsPopup.filter) {
          this.checkFilterProps(popup);
        } else {
          this.activatePopup(propsPopup);
        }
      });
    });
  }

  activatePopup(props) {
    this.popup.setProps(props);
    this.$Vue.$bus.$emit("showPopup");
  }

  checkDeleteShip() {
    let {status} = this.form.metaData,
    props;
    console.log("🚀 ~ file: Popup.js ~ line 41 ~ Popup ~ checkDeleteShip ~ status", this.popups);

    if(status === "Подтверждено") {
      props = this.popups.deleteСonfirmPopup.getFormPopupForVue();
    } else {
      props = this.popups.deleteShipPopup.getFormPopupForVue();
    }
    this.activatePopup(props);
  }

  checkFilterProps(popup) {
    let propsPopup = this.popups[popup].getFormPopupForVue(),
    getterFilter = this.nameFilters[popup];
    if(getterFilter) {
      let settingsFilter = this.$Vue.store.getters[getterFilter];
      if (Object.keys(settingsFilter).length) {
        propsPopup.components.forEach((elem) => {
          let component = elem.component,
            name = component.name;
          if (settingsFilter[name]) component.props.value = settingsFilter[name];
        });
      }
    }
    this.activatePopup(propsPopup);
  }
}

export { Popup as default };
