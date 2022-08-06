import Filter from "../../js/form/Filter";
import SessionStorageManager from "./SessionStorageManager";
import SelectorHelper from "../helpers/SelectorHelper";


class ShipFilter extends Filter {
    constructor(popup, Vue) {
        super(popup);

        this.$Vue = Vue;
        this.unsubscribe = null;

        this.bindData();

        this.$Vue.store.dispatch(this.getDictStoreName("loadIceClasses"));

        this.sessionManager = new SessionStorageManager(this.$Vue, "shipFilter");
        this.sessionManager.reestablishFilter(this.getStoreName("setFilter"));

        Vue.$bus.$on("filteringShipsList", () => this.setFilter());
        Vue.$bus.$on("clearShipsListFilter", () => this.clearFilter());
    }

    bindData() {
        this.unsubscribe = this.$Vue.store.subscribe((action) => {

            if (action.type === this.getStoreName("setUniqShipNames")) {
                const filterShip = this.popup.components.find((item) => item.componentName === "name");

                if (filterShip) {
                    filterShip.props.searchObject = SelectorHelper.formatFilterSelectorPlainSource(action.payload);
                }
            }

            if (action.type === this.getDictStoreName("setIceClasses")) {
                const component = this.popup.components.find((item) => item.componentName === "iceClass");
                component.props.searchObject = SelectorHelper.formatFilterSelectorSource({
                    dictionary: action.payload,
                    idField: "iceClass",
                    nameField: "iceClass",
                });
            }

            if (action.type === this.getStoreName("setFilter")) {
                this.sessionManager.saveFilter(action.payload);
                this.setFilterObject(action.payload);
            }
        });
    }

    setFilter() {
        const filterObject = this.createFilterObj();
        this.$Vue.store.dispatch(this.getStoreName("setFilter"), filterObject);
    }

    clearFilter() {
        this.$Vue.store.dispatch(this.getStoreName("clearFilter"));
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
    }
}

export default ShipFilter;