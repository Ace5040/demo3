class Popup {
    constructor(form, Vue, popups) {
        this.form = form;
        this.popups = popups;

        this.popup = this.form.getComponentByName("EPCSPopup").component;
        this.$Vue = Vue;
        this.createBusForPopups();
    }

    createBusForPopups() {
        Object.keys(this.popups).forEach((popup) => {
            this.$Vue.$bus.$on(popup, () => {
                let propsPopup = this.popups[popup].getFormPopupForVue();
                this.activatePopup(propsPopup);
            });
        });
    }

    activatePopup(props) {
        this.popup.setProps(props);
        this.$Vue.$bus.$emit("showPopup");
    }
}

export default Popup;