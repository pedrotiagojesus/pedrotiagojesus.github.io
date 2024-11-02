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
                {i18n.languages[1]}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                {languageArr.map((language) => (
                    <li key={language.value}>
                        <a
                            className="dropdown-item"
                            href="javascript:void(0);"
                            onClick={() => i18n.changeLanguage(language.value)}
                        >
                            {language.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default I18n;
