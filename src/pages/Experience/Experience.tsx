// CSS
import "./Experience.css";

// Hooks
import { getContent, getVocabulary } from "@hooks/useTranslationHelpers";

// Components
import Block from "@components/Block/Block";

type Experience = {
    company: string;
    role: string;
    dateStart: number;
    dateEnd: number | string;
    content: [];
};

const Experience = () => {
    // Experience
    const experienceArr = getContent("experience") as Experience[];

    return (
        <>
            <section id="experience-content">
                <h1 className="page-title">{getVocabulary("experience.title")}</h1>
                <p className="page-summary">{getVocabulary("experience.summary")}</p>
                <div className="experience-block">
                    {experienceArr.map((experience, index) => (
                        <article key={index}>
                            <h2>{experience.role}</h2>
                            <div className="info">
                                <p>{experience.company}</p>
                                <span>|</span>
                                <div className="date">
                                    <time dateTime={experience.dateStart.toString()}>{experience.dateStart}</time>-
                                    <time dateTime={experience.dateEnd.toString()}>{experience.dateEnd}</time>
                                </div>
                            </div>
                            <ul>
                                {experience.content.map((content, i) => (
                                    <li key={i}>{content}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>
            <Block />
        </>
    );
};

export default Experience;
