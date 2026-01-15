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
import { vocabulary } from "@utils/vocabulary";

// Analytics
import { trackEmailClick, trackGithubClick, trackLinkedinClick, trackXClick, trackCVClick } from "src/analytics/events";

const Navigation = () => {
    const { activePage } = useActivePage();
    const [navigationCollapse, setNavigationCollapse] = useState(false);

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
                    <li>
                        <Link to="/" className={activePage === "home" ? "active" : ""}>
                            <i className="fa-regular fa-compass fa-fw"></i>
                            <span className="label">
                                <span className="label-inner">{vocabulary("navigation.home")}</span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/experience" className={activePage === "experience" ? "active" : ""}>
                            <i className="fa-solid fa-suitcase fa-fw"></i>
                            <span className="label">
                                <span className="label-inner">{vocabulary("navigation.experience")}</span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/project" className={activePage === "project" ? "active" : ""}>
                            <i className="fa-solid fa-pencil fa-fw"></i>
                            <span className="label">
                                <span className="label-inner">{vocabulary("navigation.projects")}</span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className={activePage === "about" ? "active" : ""}>
                            <i className="fa-regular fa-user fa-fw"></i>
                            <span className="label">
                                <span className="label-inner">{vocabulary("navigation.about")}</span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className={activePage === "contact" ? "active" : ""}>
                            <i className="fa-solid fa-phone fa-fw"></i>
                            <span className="label">
                                <span className="label-inner">{vocabulary("navigation.contact")}</span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download CV"
                            onClick={() => trackCVClick("navigation")}>
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
                    <li>
                        <a
                            href="https://www.linkedin.com/in/pedro-jesus-7a1654140/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn profile"
                            onClick={() => trackLinkedinClick("navigation")}
                        >
                            <i className="fa-brands fa-linkedin-in"></i>
                            <span className="label">LinkedIn</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/pedrotiagojesus"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub profile"
                            onClick={() => trackGithubClick("navigation")}
                        >
                            <i className="fa-brands fa-github"></i>
                            <span className="label">Github</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://x.com/PedroJe07463775"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X (Twitter) profile"
                            onClick={() => trackXClick("navigation")}
                        >
                            <i className="fa-brands fa-x-twitter"></i>
                            <span className="label">X</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="mailto:pedrotiagojesus1995@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Send email"
                            onClick={() => trackEmailClick("navigation")}
                        >
                            <i className="fa-regular fa-envelope"></i>
                            <span className="label">Email</span>
                        </a>
                    </li>
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
