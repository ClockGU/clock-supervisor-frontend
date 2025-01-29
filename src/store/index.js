import { createStore, createLogger } from "vuex";
import i18n, { selectedLocale, switchDateFnsLocale } from "@/plugins/i18n";
import general from "@/store/modules/general";
import ApiService from "@/services/api";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  state: {
    locale: selectedLocale,

  },
  getters: {
    locale: (state) => state.locale,
  },
  actions: {
    changeLocale({ commit }, locale) {
      i18n.locale = locale;
      switchDateFnsLocale(locale);
      commit("updateLocale", locale);
    },

  },
  mutations: {
    updateLocale(state, locale) {
      state.locale = locale;
    },
  },
  modules: {
    general
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
