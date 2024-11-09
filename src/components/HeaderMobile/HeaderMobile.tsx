import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// CSS
import "./HeaderMobile.css";

// Contexts
import { useActivePage } from "../../contexts/ActivePageContext";

// Components
import Profile from "../Profile/Profile";
import I18n from "../I18n/I18n";

// I18N
import { getVocabulary } from "../../components/I18n/I18n";

const HeaderMobile = () => {
    const { activePage } = useActivePage();

    const [navCollapse, setNavCollapse] = useState(true);
    const [collapsing, setCollapsing] = useState(false);
    const [navHeight, setNavHeight] = useState<number | undefined>(0);
    const listNavRef = useRef<HTMLInputElement>(null);
    const [scrolled, setScrolled] = useState(false);

    const handleCollapsing = () => {
        if (listNavRef.current) {
            setNavHeight(listNavRef.current.getBoundingClientRect().height);
        }

        setCollapsing(true);

        setTimeout(() => {
            setCollapsing(false);

            if (navCollapse) {
                setNavHeight(undefined);
            } else {
                setNavHeight(0);
            }

            setNavCollapse(!navCollapse);
        }, 500);
    };

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

        // Limpa o evento de scroll ao desmontar o componente
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header id="header-mobile" className={scrolled ? "scrolled" : ""}>
            <Profile />
            <button
                type="button"
                id="header-collapse"
                className={navCollapse ? "collapsed" : ""}
                onClick={() => {
                    handleCollapsing();
                }}
            >
                <i className="fa-solid fa-bars"></i>
            </button>
            <nav
                className={`collapse nav-collapse ${
                    navCollapse ? "" : "show"
                } ${collapsing ? "collapsing" : ""}`}
                style={{ height: navHeight }}
            >
                <div className="content" ref={listNavRef}>
                    <ul>
                        <li>
                            <Link
                                to="/"
                                className={
                                    activePage === "home" ? "active" : ""
                                }
                            >
                                <i className="fa-regular fa-compass"></i>
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
                                <i className="fa-solid fa-suitcase"></i>
                                <span className="label">
                                    {getVocabulary("navigation.experience")}
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/project"
                                className={
                                    activePage === "project" ? "active" : ""
                                }
                            >
                                <i className="fa-solid fa-pencil"></i>
                                <span className="label">
                                    {getVocabulary("navigation.project")}
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={
                                    activePage === "about" ? "active" : ""
                                }
                            >
                                <i className="fa-regular fa-user"></i>
                                <span className="label">
                                    {getVocabulary("navigation.about")}
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/stack"
                                className={
                                    activePage === "stack" ? "active" : ""
                                }
                            >
                                <i className="fa-solid fa-layer-group"></i>
                                <span className="label">
                                    {getVocabulary("navigation.stack")}
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <ul className="social-network">
                        <li>
                            <a
                                href="https://www.linkedin.com/in/pedro-jesus-7a1654140/"
                                target="_blank"
                            >
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/pedrotiagojesus"
                                target="_blank"
                            >
                                <i className="fa-brands fa-github"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://x.com/PedroJe07463775"
                                target="_blank"
                            >
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:pedrotiagojesus1995@gmail.com"
                                target="_blank"
                            >
                                <i className="fa-regular fa-envelope"></i>
                            </a>
                        </li>
                    </ul>
                    <hr />
                    <I18n />
                </div>
            </nav>
        </header>
    );
};

export default HeaderMobile;
