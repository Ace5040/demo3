import api from "../api";

export default {
    namespaced: true,
    state: {
        cargoTypes: [],
        hazardClasses: [],
        availableShips: [],
        countries: [],
        shipTypes: [],
        iceClasses: [],
        workTypes: [],
        companies: [],
        statuses: []
    },
    getters: {
        cargoTypes: (state) => state.cargoTypes,
        hazardClasses: (state) => state.hazardClasses,
        availableShips: (state) => state.availableShips,
        countries: (state) => state.countries,
        shipTypes: (state) => state.shipTypes,
        iceClasses: (state) => state.iceClasses,
        workTypes: (state) => state.workTypes,
        companies: (state) => state.companies,
        statuses: (state) => state.statuses,
    },
    actions: {
        async loadCargoTypes({ commit }) {
            const data = await api.loadCargoTypes();
            commit("setCargoTypes", data);
        },
        async loadHazardClasses({ commit }) {
            const data = await api.loadHazardClasses();
            commit("setHazardClasses", data);
        },
        async loadAvailableShips({ commit }) {
            const data = await api.loadAvailableShips();
            commit("setAvailableShips", data);
        },
        async loadCountries({ commit }) {
            const data = await api.loadCountries();
            commit("setCountries", data);
        },
        async loadShipTypes({ commit }) {
            const data = await api.loadShipTypes();
            commit("setShipTypes", data);
        },
        async loadIceClasses({ commit }) {
            const data = await api.loadIceClasses();
            commit("setIceClasses", data);
        },
        async loadUserCompanies({ commit }) {
            const data = await api.loadUserCompanies();
            commit("setCompanies", data);
        },
        async loadWorkTypes({ commit }) {
            const data = await api.loadWorkTypes();
            commit("setWorkTypes", data);
        },
        async loadStatuses({ commit }) {
            const data = await api.loadStatuses();
            commit("setStatuses", data);
        },
    },
    mutations: {
        setCargoTypes(state, value) {
            state.cargoTypes = value;
        },
        setHazardClasses(state, value) {
            state.hazardClasses = value;
        },
        setAvailableShips(state, value) {
            state.availableShips = value;
        },
        setCountries(state, value) {
            state.countries = value;
        },
        setShipTypes(state, value) {
            state.shipTypes = value;
        },
        setIceClasses(state, value) {
            state.iceClasses = value;
        },
        setCompanies(state, value) {
            state.companies = value;
        },
        setWorkTypes(state, value) {
            state.workTypes = value;
        },
        setStatuses(state, value) {
            state.statuses = value;
        },
    }
}