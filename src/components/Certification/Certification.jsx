import { certificationArr } from "../../Data.js";

// CSS
import "./Certification.css";

// Components
import Item from "./Item.jsx";

// Translation
import { getVocabularyTranslation } from "../I18n/I18n";

const Certification = () => {
    return (
        certificationArr &&
        certificationArr.length && (
            <div id="certification">
                <h4>{getVocabularyTranslation("title.certifications")}</h4>
                {certificationArr.map((certification) => (
                    <Item
                        key={certification.name}
                        name={certification.name}
                        description={certification.description}
                        date={certification.date}
                        url={certification.url}
                    />
                ))}
            </div>
        )
    );
};

export default Certification;
