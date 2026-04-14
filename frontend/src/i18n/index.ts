import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './locales/zh-CN/common.json';
import en from './locales/en/common.json';

const saved = localStorage.getItem('lang') || 'zh-CN';
i18n.use(initReactI18next).init({ resources: { 'zh-CN': { translation: zh }, en: { translation: en } }, lng: saved, fallbackLng: 'zh-CN' });
export default i18n;
