// CSS
import "./Experience.css";

// Components
import Item from "./Item";

// Translation
import { getVocabularyTranslation, getContentTranslation } from "../I18n/I18n";

type Experience = {
    company: string;
    role: string;
    dateStart: number;
    dateEnd: number;
    content: [];
};

const Experience = () => {
    const experienceArr = getContentTranslation("experience") as Experience[];

    return (
        experienceArr &&
        experienceArr.length && (
            <section id="experience">
                <h2>{getVocabularyTranslation("title.experience")}</h2>

                <div className="resume-timeline">
                    {experienceArr.map((experience, i) => (
                        <Item
                            key={i}
                            company={experience.company}
                            role={experience.role}
                            dateStart={experience.dateStart}
                            dateEnd={experience.dateEnd}
                            contentArr={experience.content}
                        />
                    ))}
                </div>
            </section>
        )
    );
};

export default Experience;
