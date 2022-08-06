import PermitFilter from "../components/PermitFilter";

class PermitListForm {

    constructor(form, Vue, popups) {
        this.form = form;
        this.$Vue = Vue;
        this.dataGrid = this.form.getComponentByName("PermitListDataGrid").component;
        this.header = this.form.getComponentByName("PermitListHeader").component;
        this.isMineToggle = this.form.getComponentByName("isMine").component;
        this.filter = new PermitFilter(popups.permitFilterPopup, Vue);
        this.unsubscribe = null;

        const isMine = this.$Vue.store.getters[this.getStoreName("isMine")];
        this.isMineToggle.setValue(!isMine);

        this.bindData();

        const currentId = this.form.metaData.currentId;
        if (currentId) {
            //сбросить фильтр
            this.$Vue.store.dispatch(this.getStoreName("clearFilter"));
        }

        this.$Vue.store.dispatch(this.getStoreName("loadList")).then(() => {
            if (currentId) {
                // Если фильтр по моим документам и currentId не найден, 
                // сбросить фильтр по моим документам
                if (isMine) {
                    if (this.dataGrid.findRowIndexById(currentId) === null) {
                        this.$Vue.store.dispatch(this.getStoreName("setIsMine"), false).then(() => {
                            this.setCurrentId = currentId;
                        });
                        return;
                    }
                }
                this.dataGrid.selectRow(currentId);
            }
        });

        this.refreshHeader();

        Vue.$bus.$on("permitIsMineChange", (e) => this.isMineChange(e));
    }

    bindData() {
        this.unsubscribe = this.$Vue.store.subscribe((action) => {
            if (action.type === this.getStoreName("setList")) {
                this.dataGrid.setTableData(action.payload);

                if (this.setCurrentId) {
                    this.dataGrid.selectRow(this.setCurrentId);
                    this.setCurrentId = null;
                }
                this.refreshHeader();
            }

            if (action.type === this.getStoreName("setIsMine")) {
                this.isMineToggle.setValue(!action.payload);
            }
        });
    }

    refreshHeader() {
        const activeButtons = ["filter"];
        const hasFilter = this.$Vue.store.getters[this.getStoreName("hasFilter")];
        if (hasFilter) {
            activeButtons.push("clearFilter");
        }

        this.header.setActiveButtons(activeButtons);
        this.header.setPressedButtons(hasFilter ? ["filter"] : []);
    }

    isMineChange(e) {
        const isMine = !e.value;
        this.$Vue.store.dispatch(this.getStoreName("setIsMine"), isMine);
    }

    getStoreName(name) {
        return `permitListStore/${name}`;
    }

    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.filter.destroy();
    }
}

export default PermitListForm;
