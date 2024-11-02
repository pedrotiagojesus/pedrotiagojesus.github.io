// CSS
import "./Language.css";

// Translation
import { getVocabularyTranslation } from "../I18n/I18n";

interface Props {
    name: string;
    level: number;
}

const Item = ({ name, level }: Props) => {
    let levelHtml = [];

    for (let index = 0; index < 7; index++) {
        levelHtml.push(
            <div key={index} className={index > level ? "empty" : "full"}></div>
        );
    }

    return (
        <li title={getVocabularyTranslation(`languageLevel.${level}`)}>
            <p className="name">{name}</p>
            <div className="indicator">{levelHtml}</div>
        </li>
    );
};

export default Item;
