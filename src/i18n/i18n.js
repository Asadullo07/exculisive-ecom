import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import uz from './locales/uz.json';
import ru from './locales/ru.json';

const savedLanguage = localStorage.getItem('exclusive_lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uz: { translation: uz },
      ru: { translation: ru }
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

if (typeof window !== 'undefined') {
  window.i18n = i18n;
  window.changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('exclusive_lang', lng);
  };
}

export default i18n;
