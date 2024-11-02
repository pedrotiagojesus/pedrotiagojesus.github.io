import { useTranslation } from "react-i18next";

// CSS
import "./I18n.css";

const languageArr = [
    { label: "pt", value: "pt-PT" },
    { label: "en", value: "en-US" },
];

export const getVocabularyTranslation = (path: string): string => {
    const { t } = useTranslation("vocabulary");
    return t(path, { ns: "vocabulary" });
};

export const getContentTranslation = (path: string) => {
    const { t } = useTranslation("content");
    return t(path, { ns: "content", returnObjects: true });
};

const I18n = () => {
    const { i18n } = useTranslation();

    return (
        <div className="dropdown" id="language-picker">
            <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img src={buildFlag(i18n.languages[1].toLocaleUpperCase())} />
                {i18n.languages[1]}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                {languageArr.map((language) => (
                    <li
                        key={language.value}
                        className="dropdown-item"
                        onClick={() => i18n.changeLanguage(language.value)}
                    >
                        <img
                            src={buildFlag(language.label.toLocaleUpperCase())}
                        />
                        {language.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const buildFlag = (iso2: string) => {
    const urlCfg = {
        country_code: iso2,
        style: "flat",
        size: 24,
    };

    if (urlCfg.country_code == "EN") {
        urlCfg.country_code = "US";
    }

    const url = `https://flagsapi.com/${urlCfg.country_code}/${urlCfg.style}/${urlCfg.size}.png`;
    return url;
};

export default I18n;
