// CSS
import "./About.css";

// Hooks
import { getContent, getVocabulary } from "@hooks/useTranslationHelpers";

// Components
import Block from "@components/Block/Block";

type About = {
    summary: string;
    content: [];
    interest: string;
    hobby: string;
};

type Skill = {
    name: string;
};

type Education = {
    organization: string;
    degree: string;
    dateStart: number;
    dateEnd: number;
    description: string;
};

type Certification = {
    name: string;
    date: string;
    url: string;
    description: string;
};

const About = () => {
    // About
    const aboutMe = getContent("aboutMe") as About;

    // Skills
    const skillArr = getContent("skill") as Skill[];

    // Soft Skills
    const skillSoftArr = getContent("softSkill") as [];

    // Education
    const educationArr = getContent("education") as Education[];

    // Certification
    const certificationArr = getContent("certification") as Certification[];

    return (
        <>
            <section id="about-content">
                <h1 className="page-title">{getVocabulary("about.title")}</h1>
                <p className="page-summary">{aboutMe.summary}</p>
                <ul>
                    {aboutMe.content.map((aboutMe, index) => (
                        <li key={index}>{aboutMe}</li>
                    ))}
                </ul>
            </section>
            <div className="about-list">
                <section id="about-skill-content">
                    <h3>{getVocabulary("about.title2")}</h3>
                    <div className="list">
                        {skillArr.map((skill, index) => (
                            <span key={index}>{skill.name}</span>
                        ))}
                    </div>
                </section>
                <section id="soft-skill-content">
                    <h3>{getVocabulary("about.title5")}</h3>
                    <div className="list">
                        {skillSoftArr.map((skillSoft, index) => (
                            <span key={index}>{skillSoft}</span>
                        ))}
                    </div>
                </section>
                <section id="interest-content">
                    <h3>{getVocabulary("about.title3")}</h3>
                    <p>{aboutMe.interest}</p>
                </section>
                <section id="hobby-content">
                    <h3>{getVocabulary("about.title4")}</h3>
                    <p>{aboutMe.hobby}</p>
                </section>
            </div>
            <section id="education">
                <h3>{getVocabulary("about.title6")}</h3>
                <div className="list">
                    {educationArr.map((education, index) => (
                        <article key={index}>
                            <h4>{education.organization}</h4>
                            <p className="degree">{education.degree}</p>
                            <p className="time">
                                <time dateTime={education.dateStart.toString()}>
                                    {education.dateStart}
                                </time>
                                |
                                <time dateTime={education.dateEnd.toString()}>
                                    {education.dateEnd}
                                </time>
                            </p>

                            <p className="descripiton">
                                {education.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
            <section id="certification">
                <h3>{getVocabulary("about.title7")}</h3>
                <div className="list">
                    {certificationArr.map((certification, index) => (
                        <article key={index}>
                            <h4>{certification.name}</h4>
                            <time dateTime={certification.date}>
                                {certification.date}
                            </time>
                            <p className="descripiton">
                                {certification.description}
                            </p>
                            <a href={certification.url} target="_blank"></a>
                        </article>
                    ))}
                </div>
            </section>
            <Block />
        </>
    );
};

export default About;
