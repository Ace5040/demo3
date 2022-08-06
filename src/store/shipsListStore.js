import api from "../api";
import { getUniq } from "../js/tools/tools";


export default {
    namespaced: true,
    state: {
        filter: {},
        data: [],
        list: [],
        uniqShipNames: [],
    },
    getters: {
        filter: (state) => state.filter,
        list: (state) => state.list,
        hasFilter: (state) => Object.values(state.filter).some((item) => item),
        uniqShipNames: (state) => state.uniqShipNames,
    },
    actions: {
        async loadList({ dispatch }) {
            const data = await api.loadShips();
            dispatch("setData", data);
        },
        setData({ commit, dispatch }, allData) {
            const result = allData
                .map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        flag: item.flag ? item.flag.alpha2 : null,
                        imo: item.imo,
                        registerNumber: item.registerNumber,
                        shipType: item.shipType ? item.shipType.name : item.shipType,
                        iceClass: item.iceClass,
                    }
                })
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

                const inFilter = (item, field) => {

                    if (!filter[field]) {
                        //Все
                        return true;
                    }

                    if (filter[field] === "null") {
                        //Не указан
                        return !item[field];
                    }

                    return item[field] === filter[field];
                };

                list = data.filter((item) => {
                    return inFilter(item, "name")
                        && inFilter(item, "iceClass");
                })
            }
            commit("setList", list);
        },
        refreshUniq({ commit, state }) {
            const data = state.data;

            const uniqShipNames = getUniq(data, "name");
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
    }
}