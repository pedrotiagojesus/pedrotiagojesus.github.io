import { languageArr } from "../../Data.js";

// CSS
import "./Language.css";

// Components
import Item from "./Item";

// Translation
import { getTranslation } from "../I18n/I18n";

const Language = () => {
    return (
        languageArr &&
        languageArr.length && (
            <section id="language">
                <h4>{getTranslation("title.languages")}</h4>
                <ul className="list">
                    {languageArr.map((language) => (
                        <Item
                            key={language.name}
                            name={language.name}
                            level={language.level}
                        />
                    ))}
                </ul>
            </section>
        )
    );
};

export default Language;
