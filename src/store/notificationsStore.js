import api from "../api";
import { formatDateForNotif } from "../js/tools/tools";
import moment from "moment";


export default {
    namespaced: true,
    state: {
        data: [],
        list: [],
    },
    getters: {
        list: (state) => state.list,
    },
    actions: {
        async loadList({ dispatch }) {
            let data = await api.loadNotifications();
            dispatch("_setData", data);
        },
        pushNotification({ dispatch, state }, notification) {
            const data = state.data;
            data.push(notification);

            dispatch("_setData", data);
        },
        _setData({ commit }, data) {
            commit("setData", data);

            const sortedData = data.sort((a, b) => {
                const date1 = a.reg_date ? moment(a.reg_date) : moment();
                const date2 = b.reg_date ? moment(b.reg_date) : moment();
                return date2.diff(date1);
            });

            const list = sortedData.map((item) => {

                const getNameId = (item) => {
                    switch (item.source_table) {
                        case "applicationFloatNSR": {
                            return "applicationId";
                        }
                        case "permits": {
                            return "permitId";
                        } case "rejects": {
                            return "rejectId";
                        }
                    }
                }

                const getNameForm = (item) => {
                    switch (item.source_table) {
                        case "applicationFloatNSR": {
                            return "ApplicationFloatDetailForm";
                        }
                    }
                }

                const getIcon1 = (item) => {
                    switch (item.source_table) {
                        case "applicationFloatNSR": {
                            return "F001";
                        }
                        default: {
                            return "F001";
                        }
                    }
                }

                const getIcon2 = (item) => {
                    switch (item.source_table) {
                        case "applicationFloatNSR": {
                            return "F01B";
                        }
                        default: {
                            return "F01B";
                        }
                    }
                }

                const res = {
                    id: item.nid,
                    icon1: getIcon1(item),
                    icon2: getIcon2(item),
                    description: item.note,
                    date: item.reg_date ? formatDateForNotif(item.reg_date) : null,
                    isNew: item.done_date ? 0 : 1,
                    nameForm: getNameForm(item),
                }

                if (item.source_uuid) {
                    const fieldName = getNameId(item);
                    if (fieldName) {
                        res[fieldName] = item.source_uuid;
                    }
                }

                return res;
            });

            commit("setList", list);
        },
    },
    mutations: {
        setList(state, value) {
            state.list = value;
        },
        setData(state, value) {
            state.data = value;
        },
    }
}