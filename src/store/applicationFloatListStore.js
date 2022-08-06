import api from "../api";
import { getUniq } from "../js/tools/tools";
import moment from "moment";
import config from "../config/config";


export default {
    namespaced: true,
    state: {
        filter: {},
        data: [],
        list: [],
        uniqShipNames: [],
        uniqOutgoingNumbers: [],
        uniqStatuses: [],
    },
    getters: {
        filter: (state) => state.filter,
        list: (state) => state.list,
        hasFilter: (state) => Object.values(state.filter).some((item) => item),
        uniqShipNames: (state) => state.uniqShipNames,
        uniqOutgoingNumbers: (state) => state.uniqOutgoingNumbers,
    },
    actions: {
        async loadList({ dispatch }) {
            const data = await api.loadApplicationsFloatList();
            dispatch("setData", data);
        },
        setData({ commit, dispatch }, allData) {

            const applicantsListArray = Object.values(allData);
            const applicantsList = applicantsListArray
                .map((item) => {
                    return {
                        id: item.id,
                        outgoingNumber: item.outgoingNumber,
                        shipName: item.shipName,
                        imo: item.imo,
                        registerNumber: item.registerNumber,
                        applicantName: item.applicantName,
                        sendDate: item.sendDate ? moment(item.sendDate).format("DD.MM.YYYY") : item.sendDate,
                        reviewPeriod: item.reviewPeriod ? moment(item.reviewPeriod).format("DD.MM.YYYY") : item.reviewPeriod,
                        statusName: item.statusName,
                        dateCreateDate: item.createDate ? moment(item.createDate).toDate() : null,
                        dateSendDate: item.sendDate ? moment(item.sendDate).toDate() : null,
                        dateReviewPeriod: item.reviewPeriod ? moment(item.reviewPeriod).toDate() : null,
                    }
                })
                .sort((a, b) => {
                    let date1 = a.statusId === config.statuses.Draft ? a.dateCreateDate : a.dateSendDate || a.dateCreateDate;
                    let date2 = b.statusId === config.statuses.Draft ? b.dateCreateDate : b.dateSendDate || b.dateCreateDate;

                    date1 = moment(date1);
                    date2 = moment(date2);

                    return date2.diff(date1);
                })
                .map((item, index) => {
                    return { ...item, rowNumber: index + 1 }
                });

            commit("setData", applicantsList);
            dispatch("applyFilter");
            dispatch("refreshUniq");
        },
        async deleteApplicationFloat({ commit, state, dispatch }, id) {
            const result = await api.deleteApplicationFloat(id);

            if (result) {
                const data = state.data
                    .filter((item) => item.id !== id)
                    .map((item, index) => { return { ...item, rowNumber: index + 1 } });
                commit("setData", data);
                dispatch("applyFilter");
                dispatch("refreshUniq");
            }
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
                        const date = moment(item.sendDate, "DD.MM.YYYY").toDate();
                        return date >= prepareDate(filter.dateBefore);
                    }

                    if (field === "dateAfter") {
                        const date = moment(item.sendDate, "DD.MM.YYYY").toDate();
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
                        && inFilter(item, "outgoingNumber")
                        && inFilter(item, "dateBefore")
                        && inFilter(item, "dateAfter")
                        && inFilter(item, "statusName");
                })
            }
            commit("setList", list);
        },
        async refreshUniq({ commit, state }) {
            const data = state.data;

            const uniqShipNames = getUniq(data, "shipName");
            commit("setUniqShipNames", uniqShipNames);

            const uniqOutgoingNumbers = getUniq(data, "outgoingNumber");
            commit("setUniqOutgoingNumbers", uniqOutgoingNumbers);

            const uniqStatuses = getUniq(data, "statusName");
            commit("setUniqStatuses", uniqStatuses);
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
        setUniqOutgoingNumbers(state, value) {
            state.uniqOutgoingNumbers = value;
        },
        setUniqStatuses(state, value) {
            state.uniqStatuses = value;
        },
    }
}