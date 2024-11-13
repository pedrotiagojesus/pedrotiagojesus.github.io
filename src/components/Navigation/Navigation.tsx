import { useState } from "react";
import { Link } from "react-router-dom";

// CSS
import "./Navigation.css";

// Contexts
import { useActivePage } from "../../contexts/ActivePageContext";

// Components
import Profile from "../Profile/Profile";
import I18n from "../I18n/I18n";

// I18N
import { getVocabulary } from "../../components/I18n/I18n";
import ToggleThemeButton from "../ToggleThemeColor/ToggleThemeButton";

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
            >
                <i className="fa-solid fa-angle-left"></i>
            </button>
            <Profile />
            <hr />
            <div className="navigation-block">
                <ul className="navigation-list">
                    <li>
                        <Link
                            to="/"
                            className={activePage === "home" ? "active" : ""}
                        >
                            <i className="fa-regular fa-compass fa-fw"></i>
                            <span className="label">
                                {getVocabulary("navigation.homepage")}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/experience"
                            className={
                                activePage === "experience" ? "active" : ""
                            }
                        >
                            <i className="fa-solid fa-suitcase fa-fw"></i>
                            <span className="label">
                                {getVocabulary("navigation.experience")}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/project"
                            className={activePage === "project" ? "active" : ""}
                        >
                            <i className="fa-solid fa-pencil fa-fw"></i>
                            <span className="label">
                                {getVocabulary("navigation.project")}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className={activePage === "about" ? "active" : ""}
                        >
                            <i className="fa-regular fa-user fa-fw"></i>
                            <span className="label">
                                {getVocabulary("navigation.about")}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/stack"
                            className={activePage === "stack" ? "active" : ""}
                        >
                            <i className="fa-solid fa-layer-group fa-fw"></i>
                            <span className="label">
                                {getVocabulary("navigation.stack")}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <a href="/CV.pdf" target="_blank">
                            <i className="fa-regular fa-file fa-fw"></i>
                            <span className="label">CV</span>
                        </a>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="navigation-block">
                <ul className="navigation-list">
                    <li>
                        <a
                            href="https://www.linkedin.com/in/pedro-jesus-7a1654140/"
                            target="_blank"
                        >
                            <i className="fa-brands fa-linkedin-in"></i>
                            <span className="label">LinkedIn</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/pedrotiagojesus"
                            target="_blank"
                        >
                            <i className="fa-brands fa-github"></i>
                            <span className="label">Github</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://x.com/PedroJe07463775" target="_blank">
                            <i className="fa-brands fa-x-twitter"></i>
                            <span className="label">X</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="mailto:pedrotiagojesus1995@gmail.com"
                            target="_blank"
                        >
                            <i className="fa-regular fa-envelope"></i>
                            <span className="label">Email</span>
                        </a>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="navigation-block">
                <I18n />
                <ToggleThemeButton />
            </div>
        </nav>
    );
};

export default Navigation;
