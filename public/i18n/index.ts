import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './translate';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi', // use vi if detected lng is not available
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
