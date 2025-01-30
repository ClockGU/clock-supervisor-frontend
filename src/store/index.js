import { createStore, createLogger } from "vuex";
import general from "@/store/modules/general";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  
  modules: {
    general
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
