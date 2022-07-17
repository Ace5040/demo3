import 'moment';

var mutations = {
  createStructureForm(state, res) {
    state.actualDataGrid = res;
  },
  clearFilter(state) {
    state.settingsFilter = {};
  },
  saveFilter(state, filter) {
    state.settingsFilter = filter;
  },
  saveIceClasses(state,res) {
    state.iceClasses = res.map(el => el.iceClass);
  }
};

export { mutations as default };
