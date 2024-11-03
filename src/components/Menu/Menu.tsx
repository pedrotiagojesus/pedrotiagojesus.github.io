import { Link } from "react-router-dom";

// CSS
import "./Menu.css";

import CV from "./../../assets/CV.pdf";

// Translation
import { getVocabularyTranslation } from "../I18n/I18n.js";

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
                <Link className="link " to={"/"}>
                    <span className="icon-holder">
                        <i className="fa-solid fa-house"></i>
                    </span>
                    <span className="nav-text">
                        {getVocabularyTranslation("menu.homepage")}
                    </span>
                </Link>
                <Link className="link " to={"contact"}>
                    <span className="icon-holder">
                        <i className="fa-solid fa-address-card"></i>
                    </span>
                    <span className="nav-text">
                        {getVocabularyTranslation("menu.contact")}
                    </span>
                </Link>
                <a className="link" href={CV} target="_blank">
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
