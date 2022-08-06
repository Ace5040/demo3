class PeriodController {
    constructor(periodFrom, periodTo, Vue) {

        this.periodFrom = periodFrom;
        this.periodTo = periodTo;
        this.minDate = null;

        this.$Vue = Vue;

        Vue.$bus.$on(this.periodFrom.props.event, () => this.onFromChange());
        Vue.$bus.$on(this.periodTo.props.event, () => this.onToChange());
    }

    setMinDate(value) {
        this.minDate = value;
        this.periodFrom.setDateMin(this.minDate);
        this.periodTo.setDateMin(this.minDate);
    }

    onFromChange() {
        let from = this.periodFrom.getValue();
        let to = this.periodTo.getValue();
        if (from && to && to < from) {
            this.periodTo.setValue(null);
            to = null;
        }
        if (!to) {
            this.periodTo.setCalendarValue(from);
        }
        this.$Vue.$bus.$emit("selectPeriod");
    }

    onToChange() {
        let from = this.periodFrom.getValue();
        let to = this.periodTo.getValue();
        if (from && to && to < from) {
            this.periodFrom.setValue(null);
            from = null;
        }
        if (!from) {
            this.periodFrom.setCalendarValue(to);
        }
        this.$Vue.$bus.$emit("selectPeriod");
    }
}

export default PeriodController;