import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// CSS
import "./LanguagePicker.css";

const LanguagePicker = () => {
    const { i18n } = useTranslation();
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!showPicker) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowPicker(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setShowPicker(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showPicker]);

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

    const languageArr = [
        { label: "pt", value: "pt" },
        { label: "en", value: "en" },
    ];

    const selectLanguage = (value: string) => {
        i18n.changeLanguage(value);
        setShowPicker(false);
    };

    return (
        <div id="language-picker" ref={containerRef}>
            <button
                type="button"
                className="btn"
                onClick={() => setShowPicker(!showPicker)}
                aria-label={`Change language, current: ${i18n.language}`}
                aria-expanded={showPicker}
            >
                <img
                    src={buildFlag(i18n.language.toLocaleUpperCase())}
                    alt={`active-lang-${i18n.language.toLocaleUpperCase()}`}
                />
                <span>{i18n.language}</span>
            </button>
            <ul className={showPicker ? "show" : ""}>
                {languageArr.map((language) => (
                    <li key={language.value}>
                        <button type="button" className="dropdown-item" onClick={() => selectLanguage(language.value)}>
                            <img
                                src={buildFlag(language.label.toLocaleUpperCase())}
                                alt={`option-lang-${language.label.toLocaleUpperCase()}`}
                            />
                            {language.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LanguagePicker;
