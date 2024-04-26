import ApiService from "@/services/api";

const state = () => ({
  loading: false,
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
  globalErrors: []
});

const getters = {
  isLoading: (state) => state.loading,
  accessToken: (state) => state.accessToken,
  refreshToken: (state) => state.refreshToken,
  user: (state) => state.user,
  globalErrors: (state) => state.globalErrors
};

const mutations = {
  setLoading: (state, value) => (state.loading = value),
  setAccessToken: (state, value) => (state.accessToken = value),
  setRefreshToken: (state, value) => (state.refreshToken = value),
  unsetTokens: (state) => {
    state.accessToken = undefined;
    state.refreshToken = undefined;
  },
  setUser: (state, value) => (state.user = value),
  addError: (state, value) => state.globalErrors.push(value),
  removeError: (state, value) => state.globalErrors.pop(value),
  clearGlobalErrors: (state, value) => (state.globalErrors = [])
};

const actions = {
  setIsLoading: ({ commit }) => commit("setLoading", true),
  unsetLoading: ({ commit }) => commit("setLoading", false),
  unsetErrorLoading: ({ commit }) => {
    commit("setLoading", false);
    commit("clearGlobalErrors");
  },
  login: ({ commit }, payload) => {
    commit("setAccessToken", payload.access_token);
    commit("setRefreshToken", payload.refresh_token);
    ApiService.setAccessToken(payload.access_token);
  },
  logout: ({ commit }) => commit("unsetTokens"),
  setUser: ({ commit }, payload) => commit("setUser", payload),
  addError: ({ commit }, error) => commit("addError", error),
  removeError: ({ commit }, error) => commit("removeError", error),
  clearGlobalErrors: ({ commit }) => commit("clearGlobalErrors")
};

export default {
  namespaced: false,
  state,
  actions,
  getters,
  mutations
};
