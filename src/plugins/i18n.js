import { reactive } from "vue";
import { de, enUS as en } from "date-fns/locale";
import { createI18n } from "vue-i18n";
import deLocale from "../locales/de.json";
import enLocale from "../locales/en.json";

const LOCALES = { de, en };

const localeMessages = {
  de: deLocale,
  en: enLocale
};
export const switchDateFnsLocale = (locale) => {
  currentLocale.locale = LOCALES[locale];
};
export const currentLocale = reactive({ locale: de });


function checkDefaultLanguage() {
  let matched = null;
  let languages = Object.getOwnPropertyNames(localeMessages);
  languages.forEach((lang) => {
    if (lang === navigator.language) {
      matched = lang;
    }
  });
  if (!matched) {
    languages.forEach((lang) => {
      let languagePartials = navigator.language.split("-")[0];
      if (lang === languagePartials) {
        matched = lang;
      }
    });
  }
  if (!matched) {
    languages.forEach((lang) => {
      let languagePartials = navigator.language.split("-")[0];
      if (lang.split("-")[0] === languagePartials) {
        matched = lang;
      }
    });
  }
  return matched;
}
export const selectedLocale =
  checkDefaultLanguage() || import.meta.env.VUE_APP_I18N_LOCALE || "de";

// Create the i18n instance  
const i18n = createI18n({  
  locale: "de", // Default locale  
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",  
  messages: localeMessages,  
  allowComposition: true,  
});  

export default i18n;  
