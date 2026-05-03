import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common';
import hiCommon from './locales/hi/common';
import deCommon from './locales/de/common';
import frCommon from './locales/fr/common';

const supportedLanguages = ['en', 'hi', 'de', 'fr'];
const savedLanguage = localStorage.getItem('appLanguage') || 'en';
const defaultLanguage = supportedLanguages.includes(savedLanguage) ? savedLanguage : 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enCommon },
    hi: { translation: hiCommon },
    de: { translation: deCommon },
    fr: { translation: frCommon },
  },
  lng: defaultLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (language) => {
  localStorage.setItem('appLanguage', language);
});

export default i18n;
