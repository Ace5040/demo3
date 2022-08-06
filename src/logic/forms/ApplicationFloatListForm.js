import ApplicationFloatFilter from "../components/ApplicationFloatFilter";
import config from "../../config/config";


class ApplicationFloatListForm {

    constructor(form, Vue, popups) {
        this.form = form;
        this.$Vue = Vue;

        this.dataGrid = this.form.getComponentByName("ApplicationFloatListDataGrid").component;
        this.header = this.form.getComponentByName("ApplicationFloatListHeader").component;
        this.filter = new ApplicationFloatFilter(popups.applicationFloatFilterPopup, Vue);

        this.activeRowData = null;
        this.unsubscribe = null;

        this.bindData();

        const currentId = this.form.metaData.currentId;
        if (currentId) {
            //сбросить фильтр
            this.$Vue.store.dispatch(this.getStoreName("clearFilter"));
        }

        this.$Vue.store.dispatch(this.getStoreName("loadList")).then(() => {
            if (currentId) {
                this.dataGrid.selectRow(currentId);
                const data = this.dataGrid.getRowData(currentId);
                this.activateRow(data);
            }
        });

        Vue.$bus.$on("activeRowApplicationFloat", (e) => this.activateRow(e.data));
        Vue.$bus.$on("loadStateApplicationFloat", (e) => this.onLoadState(e));
        Vue.$bus.$on("openApplicationFloat", () => this.openApplicationFloat());
        Vue.$bus.$on("newApplicationFloat", () => this.newApplicationFloat());
        Vue.$bus.$on("editApplicationFloat", () => this.editApplicationFloat());
        Vue.$bus.$on("copyApplicationFloat", () => this.copyApplicationFloat());
        Vue.$bus.$on("deleteApplicationFloat", () => this.deleteApplicationFloat());
    }

    bindData() {
        this.unsubscribe = this.$Vue.store.subscribe((action) => {
            if (action.type === this.getStoreName("setList")) {
                this.dataGrid.setTableData(action.payload);
                this.deactivateRow();
            }
        });
    }

    onLoadState(e) {
        if (e.selectedRowKeys && e.selectedRowKeys.length) {
            const data = this.dataGrid.getRowData(e.selectedRowKeys[0]);

            if (data) {
                this.activateRow(data);
            }
        }
    }

    activateRow(data) {
        this.activeRowData = data;

        const activeButtons = ["add", "copy", "filter"];
        if (this.activeRowData.statusName === "Черновик") {
            activeButtons.push("delete");
        }

        if (config.editStatuses.includes(this.activeRowData.statusName)) {
            activeButtons.push("edit");
        }

        this.refreshHeader(activeButtons);
    }

    deactivateRow() {
        this.activeRowData = null;
        this.refreshHeader(["add", "filter"]);
    }

    refreshHeader(activeButtons) {
        const hasFilter = this.$Vue.store.getters[this.getStoreName("hasFilter")];
        if (hasFilter) {
            activeButtons.push("clearFilter");
        }

        this.header.setActiveButtons(activeButtons);
        this.header.setPressedButtons(hasFilter ? ["filter"] : []);
    }

    getStoreName(name) {
        return `applicationFloatListStore/${name}`;
    }

    openApplicationFloat() {
        const payload = {
            id: this.activeRowData.id,
            nameForm: "ApplicationFloatDetailForm",
            disabled: true,
        };
        this.$Vue.$bus.$emit("getComponent", payload);
    }

    newApplicationFloat() {
        const payload = {
            nameForm: "ApplicationFloatDetailForm",
        };
        this.$Vue.$bus.$emit("getComponent", payload);
    }

    editApplicationFloat() {
        const payload = {
            id: this.activeRowData.id,
            nameForm: "ApplicationFloatDetailForm",
        };
        this.$Vue.$bus.$emit("getComponent", payload);
    }

    copyApplicationFloat() {
        const payload = {
            copyId: this.activeRowData.id,
            nameForm: "ApplicationFloatDetailForm",
        };
        this.$Vue.$bus.$emit("getComponent", payload);
    }

    deleteApplicationFloat() {
        if (this.activeRowData.statusName !== "Черновик") {
            return;
        }

        const id = this.activeRowData.id;
        this.$Vue.store.dispatch(this.getStoreName("deleteApplicationFloat"), id);
    }

    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.filter.destroy();
    }
}

export default ApplicationFloatListForm;
