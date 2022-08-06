import Filter from "../../js/form/Filter";
import SessionStorageManager from "./SessionStorageManager";
import SelectorHelper from "../helpers/SelectorHelper";


class PermitFilter extends Filter {
    constructor(popup, Vue) {
        super(popup);

        this.$Vue = Vue;
        this.unsubscribe = null;

        this.bindData();

        this.sessionManager = new SessionStorageManager(this.$Vue, "permitFilter");
        this.sessionManager.reestablishFilter(this.getStoreName("setFilter"));

        Vue.$bus.$on("filteringPermitList", () => this.setFilter());
        Vue.$bus.$on("clearPermitListFilter", () => this.clearFilter());
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
        return `permitListStore/${name}`;
    }

    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

export default PermitFilter;