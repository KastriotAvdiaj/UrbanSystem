import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "@/locales/en.json";
import sqTranslations from "@/locales/sq.json";

// Define strict typings for intellisense (Optional but highly recommended)
export const defaultNS = "translation";
export const resources = {
  en: { translation: enTranslations },
  sq: { translation: sqTranslations },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "sq"],
    
    // Default namespace used if not passed to useTranslation
    defaultNS,

    interpolation: {
      // React already protects against XSS
      escapeValue: false,
    },
  });

export default i18n;
