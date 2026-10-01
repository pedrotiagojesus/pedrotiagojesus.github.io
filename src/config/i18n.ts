import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// UI copy. Both languages are bundled (a few KB each) so i18next initializes
// synchronously and nothing has to wait on a request before rendering.
import pt from "../locales/pt.json";
import en from "../locales/en.json";

i18n.use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: "pt",
    supportedLngs: ["pt", "en"],
    load: "languageOnly", // treat "en-US", "pt-BR", etc. as "en"/"pt" instead of falling back
    resources: {
        pt: { translation: pt },
        // `satisfies` fails the build if en is missing a key that pt has
        en: { translation: en satisfies typeof pt },
    },
    interpolation: { escapeValue: false }, // React already escapes rendered strings
});

export default i18n;
