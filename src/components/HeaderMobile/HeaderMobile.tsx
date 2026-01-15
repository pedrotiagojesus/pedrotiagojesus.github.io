import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// CSS
import "./HeaderMobile.css";

// Contexts
import { useActivePage } from "@contexts/ActivePageContext";

// Components
import Profile from "@components/Profile/Profile";
import ToggleThemeButton from "@components/ToggleThemeColor/ToggleThemeButton";
import LanguagePicker from "@components/LanguagePicker/LanguagePicker";

// Utils
import { vocabulary } from "@utils/vocabulary";
import { trackCVClick, trackEmailClick, trackGithubClick, trackLinkedinClick, trackXClick } from "@analytics/events";

const HeaderMobile = () => {
    const { activePage } = useActivePage();

    const contentRef = useRef<HTMLDivElement>(null);
    const isClosingRef = useRef(false);
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState<number | undefined>(0);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => {
        if (!contentRef.current) return;

        const contentHeight = contentRef.current.scrollHeight;

        if (!isOpen) {
            // ABRIR
            isClosingRef.current = false;
            setHeight(contentHeight);
            setIsOpen(true);
        } else {
            // FECHAR
            isClosingRef.current = true;
            setHeight(contentHeight); // força ponto inicial
            requestAnimationFrame(() => {
                setHeight(0);
            });
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (!isOpen || isClosingRef.current) return;

        const timeout = setTimeout(() => {
            setHeight(undefined); // height: auto apenas após abrir
        }, 300);

        return () => clearTimeout(timeout);
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [activePage]);

    return (
        <header id="header-mobile" className={scrolled ? "scrolled" : ""}>
            <Profile />
            <button
                type="button"
                id="header-collapse"
                className="btn"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
            >
                <i className="fa-solid fa-bars"></i>
            </button>
            <nav className={`nav-collapse ${isOpen ? "show" : ""}`} style={{ height }}>
                <div className="content" ref={contentRef}>
                    <ul>
                        <li>
                            <Link to="/" className={activePage === "home" ? "active" : ""}>
                                <i className="fa-regular fa-compass"></i>
                                <span className="label">{vocabulary("navigation.home")}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/experience" className={activePage === "experience" ? "active" : ""}>
                                <i className="fa-solid fa-suitcase"></i>
                                <span className="label">{vocabulary("navigation.experience")}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/project" className={activePage === "project" ? "active" : ""}>
                                <i className="fa-solid fa-pencil"></i>
                                <span className="label">{vocabulary("navigation.projects")}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={activePage === "about" ? "active" : ""}>
                                <i className="fa-regular fa-user"></i>
                                <span className="label">{vocabulary("navigation.about")}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className={activePage === "contact" ? "active" : ""}>
                                <i className="fa-solid fa-phone"></i>
                                <span className="label">{vocabulary("navigation.contact")}</span>
                            </Link>
                        </li>
                        <li>
                            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download CV" onClick={() => trackCVClick("header_mobile")}>
                                <i className="fa-regular fa-file"></i>
                                <span className="label">CV</span>
                            </a>
                        </li>
                    </ul>
                    <hr />
                    <ul className="social-network">
                        <li>
                            <a
                                href="https://www.linkedin.com/in/pedro-jesus-7a1654140/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn profile"
                                onClick={() => trackLinkedinClick("header_mobile")}
                            >
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/pedrotiagojesus"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub profile"
                                onClick={() => trackGithubClick("header_mobile")}
                            >
                                <i className="fa-brands fa-github"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://x.com/PedroJe07463775"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X (Twitter) profile"
                                onClick={() => trackXClick("header_mobile")}
                            >
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:pedrotiagojesus1995@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Send email"
                                onClick={() => trackEmailClick("header_mobile")}
                            >
                                <i className="fa-regular fa-envelope"></i>
                            </a>
                        </li>
                    </ul>
                    <hr />
                    <div className="settings">
                        <LanguagePicker />
                        <ToggleThemeButton />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderMobile;
