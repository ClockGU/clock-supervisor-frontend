const state = () => ({
  loading: false
});

const getters = {
  isLoading: (state) => state.loading
};

const mutations = {
  setLoading: (state, value) => (state.loading = value)
};

const actions = {
  setIsLoading: ({ commit }) => commit("setLoading", true),
  unsetLoading: ({ commit }) => commit("setLoading", false)
};

export default {
  namespaced: false,
  state,
  actions,
  getters,
  mutations
};
