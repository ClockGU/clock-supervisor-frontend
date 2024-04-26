import ApiService from "@/services/api";

const state = () => ({
  loading: false,
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined
});

const getters = {
  isLoading: (state) => state.loading,
  accessToken: (state) => state.accessToken,
  refreshToken: (state) => state.refreshToken
};

const mutations = {
  setLoading: (state, value) => (state.loading = value),
  setAccessToken: (state, value) => (state.accessToken = value),
  setRefreshToken: (state, value) => (state.refreshToken = value),
  unsetTokens: (state) => {
    state.accessToken = undefined;
    state.refreshToken = undefined;
  },
  setUser: (state, value) => (state.user = value)
};

const actions = {
  setIsLoading: ({ commit }) => commit("setLoading", true),
  unsetLoading: ({ commit }) => commit("setLoading", false),
  login: ({ commit }, payload) => {
    commit("setAccessToken", payload.access_token);
    commit("setRefreshToken", payload.refresh_token);
    ApiService.setAccessToken(payload.access_token);
  },
  logout: ({ commit }) => commit("unsetTokens"),
  setUser: ({ commit }, payload) => commit("setUser", payload)
};

export default {
  namespaced: false,
  state,
  actions,
  getters,
  mutations
};
