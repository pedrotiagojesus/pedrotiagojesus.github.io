// CSS
import "./About.css";

// Utils
import { useVocabularyText } from "@utils/vocabulary";

// Hooks
import { useContents } from "@hooks/useContents";

// Config
import { SITE_URL } from "@config/site";

// Components
import Block from "@components/Block/Block";
import Loading from "@components/Loading/Loading";
import Seo from "@components/Seo";

// Types
import type { About } from "@typesLocal/index";
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
        title: useVocabularyText("pages.about.title"),
        summary: useVocabularyText("pages.about.summary"),
        skills: useVocabularyText("pages.about.sections.skills"),
        softSkills: useVocabularyText("pages.about.sections.softSkills"),
        interests: useVocabularyText("pages.about.sections.interests"),
        education: useVocabularyText("pages.about.sections.education"),
        certificates: useVocabularyText("pages.about.sections.certificates"),
        hobbies: useVocabularyText("pages.about.sections.hobbies"),
    };

    const { data, isLoading, isError } = useContents(["profile", "seo"]);

    // Profile
    const profile = data?.profile;

    if (isLoading) return <Loading />;
    if (isError) return <p>Erro ao carregar informações do perfil.</p>;

    const aboutMe = profile?.aboutMe || DEFAULT_ABOUT;
    const skillArr = profile?.skill || [];
    const skillSoftArr = profile?.softSkill || [];
    const educationArr = profile?.education || [];
    const certificationArr = profile?.certifications || [];

    // Seo
    const seo = data?.seo?.profile;

    return (
        <>
            <Seo title={seo?.title} description={seo?.description} url={SITE_URL + "/about"} />
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
                    {educationArr.map((item, index) => (
                        <Card
                            key={`education-${index}`}
                            htmlElement="article"
                            title={item.organization}
                            description={
                                <>
                                    <p className="degree">{item.degree}</p>
                                    <p className="time">
                                        <time dateTime={String(item.dateStart)}>{item.dateStart}</time>|
                                        <time dateTime={String(item.dateEnd)}>{item.dateEnd}</time>
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
