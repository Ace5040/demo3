class FilterPeriodController {

    constructor(popup, periodFromStructure, periodToStructure, Vue) {
        this.popup = popup;
        this.periodFromStructure = periodFromStructure;
        this.periodToStructure = periodToStructure;

        this.$Vue = Vue;

        Vue.$bus.$on(periodFromStructure.props.event, () => this.onFromChange());
        Vue.$bus.$on(periodToStructure.props.event, () => this.onToChange());
    }

    _getComponent(structure) {
        return this.popup.getAllComponents()[structure.componentName].component;
    }

    onFromChange() {
        this.periodFrom = this._getComponent(this.periodFromStructure);
        this.periodTo = this._getComponent(this.periodToStructure);

        let from = this.periodFrom.getValue();
        let to = this.periodTo.getValue();

        if (from && to && to < from) {
            this.periodTo.setValue(null);
            to = null; //TODO не обновляется
        }
        if (!to) {
            this.periodTo.setCalendarValue(from);
        }
    }

    onToChange() {
        this.periodFrom = this._getComponent(this.periodFromStructure);
        this.periodTo = this._getComponent(this.periodToStructure);

        let from = this.periodFrom.getValue();
        let to = this.periodTo.getValue();

        if (from && to && to < from) {
            this.periodFrom.setValue(null);
            from = null; //TODO не обновляется
        }
        if (!from) {
            this.periodFrom.setCalendarValue(to);
        }
    }
}

export default FilterPeriodController;