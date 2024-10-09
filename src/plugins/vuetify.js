/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { mdi, aliases } from "vuetify/iconsets/mdi-svg";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: "light",
    variations: {
      colors: ["primary"],
      darken: 4,
      lighten: 4
    },
    themes: {
      light: {
        dark: false,
        colors: {
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          primary: "#1976D2",
          secondary: "#424242",
          success: "#4CAF50",
          warning: "#FB8C00",
          footerPrimary: "#0064BAFF",
          footerSecondary: "#51B0FFFF"
        }
      }
    }
  }
});
