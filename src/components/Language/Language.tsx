import { languageArr } from "../../Data.js";

// CSS
import "./Language.css";

// Components
import Item from "./Item";

const Language = () => {
    return (
        languageArr &&
        languageArr.length && (
            <section id="language">
                <h4>Languages</h4>
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
