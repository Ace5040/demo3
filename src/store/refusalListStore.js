import api from "../api";
import { getUniq } from "../js/tools/tools";
import moment from "moment";


export default {
    namespaced: true,
    state: {
        filter: {},
        data: [],
        list: [],
        uniqShipNames: [],
        isMine: true,
    },
    getters: {
        filter: (state) => state.filter,
        list: (state) => state.list,
        hasFilter: (state) => Object.values(state.filter).some((item) => item),
        uniqShipNames: (state) => state.uniqShipNames,
        isMine: (state) => state.isMine,
    },
    actions: {
        async loadList({ state, dispatch }) {
            const data = await api.loadRefusalList(state.isMine);
            dispatch("setData", data);
        },
        async setIsMine({ commit, dispatch }, value) {
            commit("setIsMine", value);
            dispatch("loadList");
        },
        setData({ commit, dispatch }, allData) {

            let listArray = Object.values(allData);

            const result = listArray
                .map((item) => {
                    return {
                        id: item.afnid || item.id,
                        shipName: item.shipName,
                        imo: item.imo,
                        registerNumber: item.registerNumber,
                        applicantName: item.applicantName,
                        rejectDate: item.rejectDate ? moment(item.rejectDate).format("DD.MM.YYYY") : null,
                        dateRejectDate: item.rejectDate ? moment(item.rejectDate).toDate() : null,
                    }
                })
                .sort((a, b) => {
                    if (a.dateRejectDate && b.dateRejectDate) {
                        return moment(b.dateRejectDate).diff(moment(a.dateRejectDate));
                    }
                    return 0;
                }) //по убыванию даты
                .map((item, index) => {
                    return { ...item, rowNumber: index + 1 }
                });

            commit("setData", result);
            dispatch("applyFilter");
            dispatch("refreshUniq");
        },
        setFilter({ commit, dispatch }, filter) {
            commit("setFilter", filter);
            dispatch("applyFilter");
        },
        clearFilter({ commit, dispatch }) {
            commit("setFilter", {});
            dispatch("applyFilter");
        },
        applyFilter({ commit, state, getters }) {
            const data = state.data;
            let list = data;
            const hasFilter = getters.hasFilter;

            if (hasFilter) {

                const filter = state.filter;

                const prepareDate = (date) => typeof date === "string" && date.length == 10
                    ? moment(date, "YYYY/MM/DD").toDate()
                    : moment(date).startOf("day").toDate();

                const inFilter = (item, field) => {

                    if (!filter[field]) {
                        //Все
                        return true;
                    }

                    if (field === "dateBefore") {
                        const date = moment(item.rejectDate, "DD.MM.YYYY").toDate();
                        return date >= prepareDate(filter.dateBefore);
                    }

                    if (field === "dateAfter") {
                        const date = moment(item.rejectDate, "DD.MM.YYYY").toDate();
                        return date <= prepareDate(filter.dateAfter);
                    }

                    if (filter[field] === "null") {
                        //Не указан
                        return !item[field];
                    }
                    return item[field] === filter[field];
                };

                list = data.filter((item) => {
                    return inFilter(item, "shipName")
                        && inFilter(item, "dateBefore")
                        && inFilter(item, "dateAfter");
                })
            }
            commit("setList", list);
        },
        refreshUniq({ commit, state }) {
            const data = state.data;

            const uniqShipNames = getUniq(data, "shipName");
            commit("setUniqShipNames", uniqShipNames);
        }
    },
    mutations: {
        setFilter(state, filter) {
            state.filter = filter;
        },
        setData(state, value) {
            state.data = value;
        },
        setList(state, value) {
            state.list = value;
        },
        setUniqShipNames(state, value) {
            state.uniqShipNames = value;
        },
        setIsMine(state, value) {
            state.isMine = value;
        },
    }
}