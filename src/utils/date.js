import { format } from "date-fns";
import { currentLocale } from "../plugins/i18n";
export const localizedFormat = (date, fmt, options = {}) => {
    return format(date, fmt, { ...options, ...currentLocale });
  };