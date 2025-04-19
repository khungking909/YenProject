/* eslint-disable @cspell/spellchecker */
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
console.log('🟢 i18n initialized');

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: false,
    lng: 'vi',
    fallbackLng: 'vi', // use vi if detected lng is not available
    supportedLngs: ['vi', 'en'],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    backend: {
      loadPath: '/locales/{{lng}}/common.json',
    },
  });

export default i18n;
