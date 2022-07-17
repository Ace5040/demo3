var actions = {
  saveNewDisp({ commit }, formDataDisp) {
    commit("saveNewDisp", formDataDisp);
  },
  getShips({ commit }) {
    return api.getShips().then((res) => {
      if (res.status === 200) commit("saveShips", res.data);
    });
  },
  getDisp({ commit }, data) {
      return api.getDisp(data).then((res) => {
        commit("createFormWithId", res.data);
      });
  },
  getDispList({ commit }) {
    return api.getDispList().then((res) => {
      commit("createStructureForm", res.data);
    });
  },
  deleteDisp({ commit }, data) {
    return api.deleteDisp(data).then((res) => {
      // if (res.status === 204) commit("deleteDisp", data);
      return res
    });
  },
  saveDisp({ commit }, data) {
    if(data.nameEvent === 'edit') {
       return api.saveDisp(data).then((res) => {
      // if (res.status === 204) commit("deleteDisp", id);
      });
    } else {
      return api.saveNewDisp(data).then((res) => {
        // if (res.status === 204) commit("deleteDisp", id);
        });
    }
    // return api.saveNewDisp(data).then((res) => {
    //   // if (res.status === 204) commit("deleteDisp", id);
    // });
  },
  setGmiloUrl({commit}, url) {
    commit('setGmiloUrl', url);
  }
};

export { actions as default };
