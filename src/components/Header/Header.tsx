import I18n from "../I18n/I18n";
import "./Header.css";

const Header = () => {
    return (
        <header className="top-bar">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg bg-transparent position-relative">
                    <h1 className="nocontent outline d-none">
                        Main Navigation
                    </h1>
                    <button
                        className="btn menu-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#menu-navigation"
                        aria-labelledby="menu-navigation"
                    >
                        <i className="fa-solid fa-bars fa-fw"></i>
                    </button>

                    <div id="social-list">
                        <a
                            href="https://github.com/pedrotiagojesus"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Github"
                        >
                            <i className="fa-brands fa-github fa-fw"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/pedro-jesus-7a1654140/"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="LinkedIn"
                        >
                            <i className="fa-brands fa-linkedin-in fa-fw"></i>
                        </a>
                    </div>

                    <I18n />
                </nav>
            </div>
        </header>
    );
};

export default Header;
