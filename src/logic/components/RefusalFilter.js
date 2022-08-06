import Filter from "../../js/form/Filter";
import SessionStorageManager from "./SessionStorageManager";
import SelectorHelper from "../helpers/SelectorHelper";


class RefusalFilter extends Filter {
    constructor(popup, Vue) {
        super(popup);

        this.$Vue = Vue;
        this.unsubscribe = null;

        this.bindData();

        this.sessionManager = new SessionStorageManager(this.$Vue, "refusalFilter");
        this.sessionManager.reestablishFilter(this.getStoreName("setFilter"));

        Vue.$bus.$on("filteringRefusalList", () => this.setFilter());
        Vue.$bus.$on("clearRefusalListFilter", () => this.clearFilter());
    }

    bindData() {
        this.unsubscribe = this.$Vue.store.subscribe((action) => {

            if (action.type === this.getStoreName("setUniqShipNames")) {
                const filterShip = this.popup.components.find((item) => item.componentName === "shipName");

                if (filterShip) {
                    filterShip.props.searchObject = SelectorHelper.formatFilterSelectorPlainSource(action.payload);
                }
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
        return `refusalListStore/${name}`;
    }

    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

export default RefusalFilter;