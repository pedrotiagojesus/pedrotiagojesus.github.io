import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n.use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: "pt",
    supportedLngs: ["pt", "en"],
    load: "languageOnly", // treat "en-US", "pt-BR", etc. as "en"/"pt" instead of falling back
});

export default i18n;
