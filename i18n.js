import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';
import uk from './locales/uk.json';
import { setStore } from './store/asyncstore';

const resources = {
  en,
  ru,
  uk
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    compatibilityJSON: 'v3',
    //lng: 'uk'/* setStore("language") */,
    fallbackLng: 'uk',
    supportedLngs: ['en', 'ru', 'uk'],
    interpolation: {
      escapeValue: false
    }
  })

export default i18n;