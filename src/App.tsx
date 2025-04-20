/* eslint-disable @cspell/spellchecker */
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { memo, useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { useGetUserFromTokenQuery } from 'src/app/apis/authApi';
import router from 'src/app/routes/Router';
import { setUser } from 'src/app/slices/authSlice/authSlice';

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

const AppComponent = () => {
  console.log('AppComponent render');

  const dispatch = useDispatch();
  const { data, isSuccess } = useGetUserFromTokenQuery();

  useEffect(() => {
    if (isSuccess && data.user) {
      dispatch(setUser(data.user));
    }
  }, [isSuccess, dispatch, data]);

  return <RouterProvider router={router} />;
};

const App = memo(AppComponent);

export default App;
