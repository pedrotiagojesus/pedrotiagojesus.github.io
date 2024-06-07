import "./Header.css";

const Header = () => {
    return (
        <header>
            <div className="container-fluid">
                <div className="top-bar">
                    <nav className="navbar navbar-expand-lg bg-transparent position-relative">
                        <button
                            className="btn menu-toggler"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#menu-navigation"
                            aria-labelledby="menu-navigation"
                        >
                            <span className="fa-solid fa-bars fa-fw"></span>
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
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
