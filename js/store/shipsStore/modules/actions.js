var actions = {
  getShips({ commit }) {
    return api.getShips().then((res) => {
      if (res.status === 200) commit("saveShips", res.data);
    });
  },
  getIceClasses({commit}) {
    return api.getIceClasses().then((res) => {
      if (res.status === 200) commit("saveIceClasses", res.data);
    });
  }
};

export { actions as default };
