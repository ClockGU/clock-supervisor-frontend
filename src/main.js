/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
import ApiService from "@/services/api";
import { de } from "date-fns/locale";
setDefaultOptions({ locale: de });
// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import { setDefaultOptions } from "date-fns";

export const REFERENCE_FIELD_NAME = "";

ApiService.init(import.meta.env.VITE_API_URL);
ApiService.mountInterceptor();
const app = createApp(App);

registerPlugins(app);

app.mount("#app");
