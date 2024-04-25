/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
import ApiService from "@/services/api";
// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

ApiService.init(import.meta.env.VITE_API_URL);
ApiService.mountInterceptor();
const app = createApp(App);

registerPlugins(app);

app.mount("#app");
