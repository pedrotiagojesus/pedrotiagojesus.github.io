// CSS
import "./Language.css";

// Components
import Item from "./Item";

// Translation
import { getVocabularyTranslation, getContentTranslation } from "../I18n/I18n";

type Language = {
    name: string;
    level: number;
};

const Language = () => {
    const languageArr = getContentTranslation("language") as Language[];

    return (
        languageArr &&
        languageArr.length && (
            <section id="language">
                <h4>{getVocabularyTranslation("title.languages")}</h4>
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
