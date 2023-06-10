import { initReactI18next } from 'react-i18next';
import translationTR from './locales/tr.json';
import i18n from "i18next";

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // Set the default language to English
    resources: {
      tr: {
        translation: translationTR, // Load the translation resources for Turkish (tr)
      },
    },
    fallbackLng: 'en', // Set a fallback language in case the requested language is not available
    interpolation: {
      escapeValue: false, // Disable HTML escaping for translations
    },
  });

export default i18n;
