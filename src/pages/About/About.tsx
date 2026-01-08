// CSS
import "./About.css";

// Utils
import { vocabulary } from "@utils/vocabulary";

// Hooks
import { useContents } from "@hooks/useContents";

// Components
import Block from "@components/Block/Block";
import Loading from "@components/Loading/Loading";
import Seo from "@components/Seo";

// Types
import type { About, Skill, Education, Certification } from "@typesLocal/index";
import Card from "@components/Card/Card";

const DEFAULT_ABOUT: About = {
    summary: "",
    content: [],
    interest: "",
    hobby: "",
};

const About = () => {
    // Vocabulary
    const i18n = {
        title: vocabulary("pages.about.title"),
        summary: vocabulary("pages.about.summary"),
        skills: vocabulary("pages.about.sections.skills"),
        softSkills: vocabulary("pages.about.sections.softSkills"),
        interests: vocabulary("pages.about.sections.interests"),
        education: vocabulary("pages.about.sections.education"),
        certificates: vocabulary("pages.about.sections.certificates"),
        hobbies: vocabulary("pages.about.sections.hobbies"),
    };

    const { data, isLoading, isError } = useContents(["profile", "seo"]);

    // Profile
    const profile = data?.profile;

    if (isLoading) return <Loading />;
    if (isError) return <p>Erro ao carregar informações do perfil.</p>;

    const aboutMe = (profile?.aboutMe as About) || DEFAULT_ABOUT;
    const skillArr = (profile?.skill as Skill[]) || [];
    const skillSoftArr = (profile?.softSkill as string[]) || [];
    const educationArr = (profile?.education as Education[]) || [];
    const certificationArr = (profile?.certifications as Certification[]) || [];

    // Seo
    const seo = data?.seo?.profile;

    return (
        <>
            <Seo title={seo?.title} description={seo?.description} />
            <section id="about-content">
                <h1 className="page-title">{i18n.title}</h1>
                <p className="page-summary">{aboutMe.summary}</p>
                <ul>
                    {aboutMe.content?.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                    ))}
                </ul>
            </section>
            <div className="about-list">
                <section id="about-skill-content" className="about-tags">
                    <h2 className="page-subtitle">{i18n.skills}</h2>
                    <div className="list">
                        {skillArr.map((skill) => (
                            <span key={`skill-${skill.id}`}>{skill.name}</span>
                        ))}
                    </div>
                </section>
                <section id="soft-skill-content" className="about-tags">
                    <h2 className="page-subtitle">{i18n.softSkills}</h2>
                    <div className="list">
                        {skillSoftArr.map((item, index) => (
                            <span key={`${item}-${index}`}>{item}</span>
                        ))}
                    </div>
                </section>
                <section id="interest-content" className="about-text">
                    <h2 className="page-subtitle">{i18n.interests}</h2>
                    <p>{aboutMe.interest}</p>
                </section>
                <section id="hobby-content" className="about-text">
                    <h2 className="page-subtitle">{i18n.hobbies}</h2>
                    <p>{aboutMe.hobby}</p>
                </section>
            </div>
            <section id="education" aria-labelledby="education-title">
                <h2 id="education-title" className="page-subtitle">
                    {i18n.education}
                </h2>
                <div className="list">
                    {educationArr.map((item) => (
                        <Card
                            key={`education-${item.id}`}
                            htmlElement="article"
                            title={item.organization}
                            description={
                                <>
                                    <p className="degree">{item.degree}</p>
                                    <p className="time">
                                        <time dateTime={item.dateStart}>{item.dateStart}</time>|
                                        <time dateTime={item.dateEnd}>{item.dateEnd}</time>
                                    </p>
                                    <p className="description">{item.description}</p>
                                </>
                            }
                        />
                    ))}
                </div>
            </section>
            {certificationArr && certificationArr.length > 0 && (
                <section id="certification">
                    <h2 className="page-subtitle">{i18n.certificates}</h2>
                    <div className="list">
                        {certificationArr.map((certification) => (
                            <Card
                                key={`certification-${certification.id}`}
                                htmlElement="article"
                                title={certification.name}
                                description={
                                    <>
                                        <time dateTime={certification.date}>{certification.date}</time>
                                        <p className="description">{certification.description}</p>
                                    </>
                                }
                                linkCover={true}
                                link={certification.url}
                            />
                        ))}
                    </div>
                </section>
            )}
            <Block />
        </>
    );
};

export default About;
