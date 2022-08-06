import api from "../api";
import config from "../config/config";


export default {
    namespaced: true,
    state: {
        applicationFloat: {},
        emptyApplicationFloat: {
            "id": null,
            "sendDate": null,
            "reviewPeriod": null,
            "incomingNumber": null,
            "outgoingNumber": null,
            "applicantStatus": 0,
            "departurePlace": null,
            "departureLon": null,
            "departureLat": null,
            "destinationPlace": null,
            "destinationLon": null,
            "destinationLat": null,
            "routeDescription": null,
            "etaNsr": null,
            "etdNsr": null,
            "crew": null,
            "passangers": null,
            "towedObject": null,
            "weight": null,
            "weightDangerous": null,
            "applicantId": null,
            "shipId": null,
            "cargoTypeId": null,
            "hazardClassId": null,
            "statusId": config.statuses.Draft,
            "shipOwnerName": null,
        },
        emptyApplicant: {
            id: null,
            name: null,
            type: 0,
            imo: null,
            telephone: null,
            fax: null,
            email: null,
            website: null,
            directorName: null,
            directorSurname: null,
            directorPatronymic: null,
            responsibleName: null,
            responsibleSurname: null,
            responsiblePatronymic: null,
            responsibleTelephone: null,
            responsibleEmail: null,
            responsiblePost: null,
            responsibleSignature: null
        },
        emptyShip: {
            id: null,
            name: null,
            imo: null,
            registerNumber: null,
            registrationNumber: null,
            boardNumber: null,
            callsign: null,
            iceClass: null,
            overallLength: null,
            breadth: null,
            draught: null,
            deadweight: null,
            grossTonnage: null,
            propulsionMotorPower: null,
            stern: null,
            bulb: null,
            telephone: null,
            fax: null,
            email: null,
            fuelLight: null,
            fuelHeavy: null,
            fuelSpg: null,
            createDate: null,
            flagId: null,
            shipTypeId: null,
            shipownerId: null
        },
    },
    getters: {
        applicationFloat: (state) => state.applicationFloat,
        emptyApplicationFloat: (state) => JSON.parse(JSON.stringify(state.emptyApplicationFloat)),
        emptyApplicant: (state) => JSON.parse(JSON.stringify(state.emptyApplicant)),
        emptyShip: (state) => JSON.parse(JSON.stringify(state.emptyShip)),
    },
    actions: {
        async loadApplicationFloat({ commit, dispatch }, id) {

            const applicationFloat = await api.loadApplicationFloat(id);

            commit("setApplicationFloat", applicationFloat);
            dispatch("_loadApplicationFloatAdditional", applicationFloat);
        },
        async loadCopiedApplicationFloat({ commit, state, dispatch }, id) {

            const copyFrom = await api.loadApplicationFloat(id);
            const applicationFloat = JSON.parse(JSON.stringify(state.emptyApplicationFloat));
            for (let field of [
                "incomingNumber",
                "applicantStatus",
                "departurePlace",
                "departureLon",
                "departureLat",
                "destinationPlace",
                "destinationLon",
                "destinationLat",
                "routeDescription",
                "etaNsr",
                "etdNsr",
                "crew",
                "passangers",
                "towedObject",
                "weight",
                "weightDangerous",
                "applicantId",
                "shipId",
                "cargoTypeId",
                "hazardClassId"]) {
                applicationFloat[field] = copyFrom[field];
            }

            commit("setApplicationFloat", applicationFloat);
            dispatch("_loadApplicationFloatAdditional", { ...applicationFloat, trackId: copyFrom.trackId });
        },
        async _loadApplicationFloatAdditional({ commit, state }, applicationFloat) {

            const results = await Promise.allSettled([
                applicationFloat.id ? api.loadApplicationFloatApplicant(applicationFloat.id) : null,
                applicationFloat.shipId ? api.loadShip(applicationFloat.shipId) : null,
                applicationFloat.id ? api.loadApplicationFloatWorks(applicationFloat.id) : null,
                applicationFloat.trackId ? api.loadRouteTrack(applicationFloat.trackId) : null,
            ]);

            const applicant = results[0].value;
            commit("setApplicationFloatApplicant", applicant);

            const ship = results[1].value;
            commit("setApplicationFloatShip", ship);

            let works = results[2].value;

            if (applicationFloat.id !== state.applicationFloat.id) {
                //при копировании
                works = works.map((item) => {
                    return {
                        ...item,
                        id: undefined,
                        applicatonId: state.applicationFloat.id,
                    };
                });
            }

            commit("setApplicationFloatWorks", works);

            const track = results[3].value;
            console.log("track", track);
            commit("setApplicationFloatTrack", track);
        },
        async loadEmptyApplicationFloat({ commit, state, dispatch }, specimen) {
            setTimeout(() => {
                let applicationFloat = JSON.parse(JSON.stringify(state.emptyApplicationFloat));
                if (specimen) {
                    applicationFloat = { ...applicationFloat, ...specimen };
                }
                commit("setApplicationFloat", applicationFloat);
                dispatch("_loadApplicationFloatAdditional", applicationFloat);
            });
        }
    },
    mutations: {
        setApplicationFloat(state, value) {
            state.applicationFloat = value;
        },
        setApplicationFloatApplicant(state, value) {
            state.applicationFloat.applicant = value;
        },
        setApplicationFloatShip(state, value) {
            state.applicationFloat.ship = value;
        },
        setApplicationFloatWorks(state, value) {
            state.applicationFloat.works = value;
        },
        setApplicationFloatTrack(state, value) {
            state.applicationFloat.track = value;
        },
    }
}