import { languageArr } from "../../Data.js";

// CSS
import "./Language.css";

// Components
import Item from "./Item.jsx";

const Language = () => {
    return (
        languageArr &&
        languageArr.length && (
            <div id="language">
                <h4 data-tpl="title">Languages</h4>
                <ul data-tpl="list">
                    {languageArr.map((language) => (
                        <Item
                            key={language.name}
                            name={language.name}
                            level={language.level}
                        />
                    ))}
                </ul>
            </div>
        )
    );
};

export default Language;
