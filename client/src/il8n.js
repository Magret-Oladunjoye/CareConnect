import { initReactI18next } from 'react-i18next';
import translationTR from './locales/tr.json';
import translationAR from './locales/ar.json';
import i18n from "i18next";

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // Set the default language to English
    resources: {
      tr: {
        translation: translationTR, // Translation resources for Turkish (tr)
      },
      ar: {
        translation: translationAR, // Translation resources for Arabic (ar)
      },
    },
    fallbackLng: 'en', // Set a fallback language in case the requested language is not available
    interpolation: {
      escapeValue: false, // Disable HTML escaping for translations
    },
  });

export default i18n;
