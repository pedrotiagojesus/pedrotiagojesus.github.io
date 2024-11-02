// CSS
import "./Education.css";

// Components
import Item from "./Item";

// Translation
import { getVocabularyTranslation, getContentTranslation } from "../I18n/I18n";

type Education = {
    organization: string;
    degree: string;
    dateStart: number;
    dateEnd: number;
    description: string;
};

const Education = () => {
    const educationArr = getContentTranslation("education") as Education[];

    return (
        educationArr &&
        educationArr.length && (
            <section id="education">
                <h4>{getVocabularyTranslation("title.education")}</h4>
                <div className="list">
                    {educationArr.map((education) => (
                        <Item
                            key={education.organization}
                            organization={education.organization}
                            degree={education.degree}
                            dateStart={education.dateStart}
                            dateEnd={education.dateEnd}
                            description={education.description}
                        />
                    ))}
                </div>
            </section>
        )
    );
};

export default Education;
