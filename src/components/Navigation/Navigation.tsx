import { useState } from "react";
import { Link } from "react-router-dom";

// CSS
import "./Navigation.css";

// Contexts
import { useActivePage } from "@contexts/ActivePageContext";

// Components
import Profile from "@components/Profile/Profile";
import LanguagePicker from "@components/LanguagePicker/LanguagePicker";
import ToggleThemeButton from "@components/ToggleThemeColor/ToggleThemeButton";

// Utils
import { useVocabularyText } from "@utils/vocabulary";

// Config
import { NAV_ITEMS, SOCIAL_ITEMS } from "@config/navigation";

// Analytics
import { trackCVClick } from "@analytics/events";

const Navigation = () => {
    const { activePage } = useActivePage();
    const [navigationCollapse, setNavigationCollapse] = useState(false);

    const navLabels: Record<string, string> = {
        home: useVocabularyText("navigation.home"),
        experience: useVocabularyText("navigation.experience"),
        project: useVocabularyText("navigation.projects"),
        about: useVocabularyText("navigation.about"),
        contact: useVocabularyText("navigation.contact"),
    };

    return (
        <nav id="navigation" className={navigationCollapse ? "collapse" : ""}>
            <button
                type="button"
                id="collapse-navigation"
                className="btn"
                onClick={() => setNavigationCollapse(!navigationCollapse)}
                aria-label={navigationCollapse ? "Expand navigation" : "Collapse navigation"}
                aria-expanded={!navigationCollapse}
            >
                <i className="fa-solid fa-angle-left"></i>
            </button>
            <Profile />
            <hr />
            <div className="navigation-block">
                <ul className="navigation-list">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.to}>
                            <Link to={item.to} className={activePage === item.activeKey ? "active" : ""}>
                                <i className={`${item.icon} fa-fw`}></i>
                                <span className="label">
                                    <span className="label-inner">{navLabels[item.activeKey]}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <a
                            href="/CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Download CV"
                            onClick={() => trackCVClick("navigation")}
                        >
                            <i className="fa-regular fa-file fa-fw"></i>
                            <span className="label">
                                <span className="label-inner">CV</span>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="navigation-block social-media">
                <ul className="navigation-list">
                    {SOCIAL_ITEMS.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.ariaLabel}
                                onClick={() => item.track("navigation")}
                            >
                                <i className={item.icon}></i>
                                <span className="label">{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navigation-block settings">
                <LanguagePicker />
                <ToggleThemeButton />
            </div>
        </nav>
    );
};

export default Navigation;
