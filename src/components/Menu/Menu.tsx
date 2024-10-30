import "./Menu.css";

import CV from "./../../assets/CV.pdf";

const Menu = () => {
    return (
        <aside
            className="offcanvas show"
            tabIndex={-1}
            id="menu-navigation"
            data-bs-backdrop="false"
            data-bs-scroll="true"
            aria-label="Menu Navigation"
        >
            <h1 className="nocontent outline d-none">Menu</h1>
            <div className="offcanvas-body">
                <a className="link active" href={CV} target="_blank">
                    <span className="icon-holder">
                        <i className="fa-solid fa-circle-user"></i>
                    </span>
                    <span className="nav-text">CV</span>
                </a>
            </div>
        </aside>
    );
};

export default Menu;
