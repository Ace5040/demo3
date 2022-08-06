import ShipFilter from "../components/ShipFilter";


class ShipsListForm {

    constructor(form, Vue, popups) {
        this.form = form;
        this.$Vue = Vue;
        this.dataGrid = this.form.getComponentByName("ShipsListDataGrid").component;
        this.header = this.form.getComponentByName("ShipsListHeader").component;
        this.filter = new ShipFilter(popups.shipFilterPopup, Vue);

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

        Vue.$bus.$on("activeRowShip", (e) => this.activateRow(e.data));
        Vue.$bus.$on("loadStateShip", (e) => this.onLoadState(e));
        Vue.$bus.$on("openShip", (e) => this.openShip(e));
        Vue.$bus.$on("createApplicationFloatFromShip", () => this.createApplicationFloatFromShip());
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
        const activeButtons = ["bind", "filter"];
        this.refreshHeader(activeButtons);
    }

    deactivateRow() {
        this.activeRowData = null;
        this.refreshHeader(["filter"]);
    }

    refreshHeader(activeButtons) {
        const hasFilter = this.$Vue.store.getters[this.getStoreName("hasFilter")];
        if (hasFilter) {
            activeButtons.push("clearFilter");
        }

        this.header.setActiveButtons(activeButtons);
        this.header.setPressedButtons(hasFilter ? ["filter"] : []);
    }

    openShip() {
        const payload = {
            id: this.activeRowData.id,
            nameForm: "ShipDetailForm",
            disabled: true,
        };
        this.$Vue.$bus.$emit("getComponent", payload);
    }

    createApplicationFloatFromShip() {
        const payload = {
            nameForm: "ApplicationFloatDetailForm",
            specimen: {
                shipId: this.activeRowData.id,
            },
        };
        this.$Vue.$bus.$emit("getComponent", payload);
    }

    getStoreName(name) {
        return `shipsListStore/${name}`;
    }

    getDictStoreName(name) {
        return `dictionariesStore/${name}`;
    }

    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.filter.destroy();
    }
}

export default ShipsListForm;
