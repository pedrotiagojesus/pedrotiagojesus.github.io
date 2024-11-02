// CSS
import "./Certification.css";

// Components
import Item from "./Item.js";

// Translation
import {
    getVocabularyTranslation,
    getContentTranslation,
} from "../I18n/I18n.js";

type Certification = {
    name: string;
    description: string;
    date: string;
    url: string;
};

const Certification = () => {
    const certificationArr = getContentTranslation(
        "certification"
    ) as Certification[];

    return (
        certificationArr &&
        certificationArr.length && (
            <section id="certification">
                <h2 className="title">
                    {getVocabularyTranslation("title.certification")}
                </h2>
                {certificationArr.map((certification) => (
                    <Item
                        key={certification.name}
                        name={certification.name}
                        description={certification.description}
                        date={certification.date}
                        url={certification.url}
                    />
                ))}
            </section>
        )
    );
};

export default Certification;
