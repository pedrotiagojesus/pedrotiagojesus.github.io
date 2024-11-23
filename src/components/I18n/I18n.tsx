import { useTranslation } from "react-i18next";

// CSS
import "./I18n.css";
import { useState } from "react";

const languageArr = [
    { label: "pt", value: "pt-PT" },
    { label: "en", value: "en-US" },
];

export const getVocabulary = (path: string): string => {
    const { t } = useTranslation("vocabulary");
    return t(path, { ns: "vocabulary" });
};

export const getContent = (path: string) => {
    const { t } = useTranslation("content");
    return t(path, { ns: "content", returnObjects: true });
};

const I18n = () => {
    const { i18n } = useTranslation();
    const [showPicker, setShowPicker] = useState<boolean>(false);

    return (
        <div id="language-picker">
            <button
                type="button"
                className="btn"
                onClick={() => setShowPicker(!showPicker)}
            >
                <img
                    src={buildFlag(i18n.languages[1].toLocaleUpperCase())}
                    alt={`active-lang-${i18n.languages[1].toLocaleUpperCase()}`}
                />
                <span>{i18n.languages[1]}</span>
            </button>
            <ul className={showPicker ? "show" : ""}>
                {languageArr.map((language) => (
                    <li
                        key={language.value}
                        className="dropdown-item"
                        onClick={() => {
                            i18n.changeLanguage(language.value);
                            setShowPicker(!showPicker);
                        }}
                    >
                        <img
                            src={buildFlag(language.label.toLocaleUpperCase())}
                            alt={`option-lang-${language.label.toLocaleUpperCase()}`}
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
