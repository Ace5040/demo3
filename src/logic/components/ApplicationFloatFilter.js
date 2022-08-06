import Filter from "../../js/form/Filter";
import SessionStorageManager from "./SessionStorageManager";
import FilterPeriodController from "./FilterPeriodController";
import SelectorHelper from "../helpers/SelectorHelper";


class ApplicationFloatFilter extends Filter {
    constructor(popup, Vue) {
        super(popup);

        this.$Vue = Vue;
        this.unsubscribe = null;

        this.bindData();

        this.periodController = new FilterPeriodController(
            this.popup,
            this.popup.components.find((item) => item.componentName === "dateBefore"),
            this.popup.components.find((item) => item.componentName === "dateAfter"),
            Vue);

        this.sessionManager = new SessionStorageManager(this.$Vue, "applicationFloatFilter");
        this.sessionManager.reestablishFilter(this.getStoreName("setFilter"));

        Vue.$bus.$on("filteringApplicationFloatList", () => this.setFilter());
        Vue.$bus.$on("clearApplicationFloatListFilter", () => this.clearFilter());
    }

    bindData() {
        this.unsubscribe = this.$Vue.store.subscribe((action) => {

            if (action.type === this.getStoreName("setUniqShipNames")) {
                const component = this.popup.components.find((item) => item.componentName === "shipName");
                component.props.searchObject = SelectorHelper.formatFilterSelectorPlainSource(action.payload);
            }

            if (action.type === this.getStoreName("setUniqStatuses")) {
                const component = this.popup.components.find((item) => item.componentName === "statusName");
                component.props.searchObject = SelectorHelper.formatFilterSelectorPlainSource(action.payload);
            }

            if (action.type === this.getStoreName("setUniqOutgoingNumbers")) {
                const component = this.popup.components.find((item) => item.componentName === "outgoingNumber");
                component.props.searchObject = SelectorHelper.formatFilterSelectorPlainSource(action.payload);
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
        return `applicationFloatListStore/${name}`;
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

export default ApplicationFloatFilter;