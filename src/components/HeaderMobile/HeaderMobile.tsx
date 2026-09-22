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
import { useVocabularyText } from "@utils/vocabulary";
import { trackCVClick } from "@analytics/events";

// Config
import { NAV_ITEMS, SOCIAL_ITEMS } from "@config/navigation";

const HeaderMobile = () => {
    const { activePage } = useActivePage();

    const contentRef = useRef<HTMLDivElement>(null);
    const isClosingRef = useRef(false);
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState<number | undefined>(0);
    const [scrolled, setScrolled] = useState(false);

    const navLabels: Record<string, string> = {
        home: useVocabularyText("navigation.home"),
        experience: useVocabularyText("navigation.experience"),
        project: useVocabularyText("navigation.projects"),
        about: useVocabularyText("navigation.about"),
        contact: useVocabularyText("navigation.contact"),
    };

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
                        {NAV_ITEMS.map((item) => (
                            <li key={item.to}>
                                <Link to={item.to} className={activePage === item.activeKey ? "active" : ""}>
                                    <i className={item.icon}></i>
                                    <span className="label">{navLabels[item.activeKey]}</span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a
                                href="/CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Download CV"
                                onClick={() => trackCVClick("header_mobile")}
                            >
                                <i className="fa-regular fa-file"></i>
                                <span className="label">CV</span>
                            </a>
                        </li>
                    </ul>
                    <hr />
                    <ul className="social-network">
                        {SOCIAL_ITEMS.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.ariaLabel}
                                    onClick={() => item.track("header_mobile")}
                                >
                                    <i className={item.icon}></i>
                                </a>
                            </li>
                        ))}
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
