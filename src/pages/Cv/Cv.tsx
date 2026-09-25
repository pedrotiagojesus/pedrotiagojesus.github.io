// CSS
import "./Cv.css";

// Components
import Seo from "@components/Seo/Seo";
import Loading from "@components/Loading/Loading";

// Config
import { SITE_URL } from "@config/site";

// Hooks
import { useContents } from "@hooks/useContents";

// Utils
import { useVocabularyText } from "@utils/vocabulary";

const Cv = () => {
    const { data, isLoading, isError } = useContents(["profile", "experiences", "seo"]);

    // Vocabulary (reusing the section titles already used on the About/Experience pages)
    const i18n = {
        experience: useVocabularyText("pages.experience.title"),
        skills: useVocabularyText("pages.about.sections.skills"),
        softSkills: useVocabularyText("pages.about.sections.softSkills"),
        education: useVocabularyText("pages.about.sections.education"),
        certificates: useVocabularyText("pages.about.sections.certificates"),
    };

    if (isLoading) return <Loading />;
    if (isError) return <p>Erro ao carregar o CV.</p>;

    const profile = data?.profile;
    const aboutMe = profile?.aboutMe;
    const skillArr = profile?.skill ?? [];
    const softSkillArr = profile?.softSkill ?? [];
    const educationArr = profile?.education ?? [];
    const certificationArr = profile?.certifications ?? [];
    const experienceArr = data?.experience ?? [];

    // Seo
    const seo = data?.seo?.cv;

    return (
        <>
            <Seo title={seo?.title} description={seo?.description} url={SITE_URL + "/cv"} />
            <div className="cv-page">
                <header className="cv-header">
                    <div className="cv-heading">
                        <h1 className="cv-name">Pedro Jesus</h1>
                        <p className="cv-role">Full Stack Developer</p>
                    </div>
                    <ul className="cv-contacts">
                        <li>pedrotiagojesus1995@gmail.com</li>
                        <li>pedrotiagojesus.github.io</li>
                        <li>Lousã, Coimbra, Portugal</li>
                        <li>linkedin.com/in/pedro-jesus-7a1654140</li>
                        <li>github.com/pedrotiagojesus</li>
                    </ul>
                </header>

                {aboutMe?.summary && (
                    <section className="cv-section">
                        <p className="cv-summary">{aboutMe.summary}</p>
                    </section>
                )}

                {experienceArr.length > 0 && (
                    <section className="cv-section">
                        <h2 className="cv-section-title">{i18n.experience}</h2>
                        {experienceArr.map((exp) => (
                            <article key={exp.id} className="cv-entry">
                                <div className="cv-entry-head">
                                    <h3>{exp.role}</h3>
                                    <span className="cv-entry-date">
                                        {exp.dateStart} — {exp.dateEnd}
                                    </span>
                                </div>
                                <p className="cv-entry-subtitle">{exp.company}</p>
                                <ul className="cv-entry-list">
                                    {exp.content.map((item, index) => (
                                        <li key={`${item}-${index}`}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </section>
                )}

                <div className="cv-columns">
                    {educationArr.length > 0 && (
                        <section className="cv-section">
                            <h2 className="cv-section-title">{i18n.education}</h2>
                            {educationArr.map((item, index) => (
                                <article key={index} className="cv-entry">
                                    <div className="cv-entry-head">
                                        <h3>{item.organization}</h3>
                                        <span className="cv-entry-date">
                                            {item.dateStart} — {item.dateEnd}
                                        </span>
                                    </div>
                                    <p className="cv-entry-subtitle">{item.degree}</p>
                                </article>
                            ))}
                        </section>
                    )}

                    {certificationArr.length > 0 && (
                        <section className="cv-section">
                            <h2 className="cv-section-title">{i18n.certificates}</h2>
                            {certificationArr.map((cert) => (
                                <article key={cert.id} className="cv-entry">
                                    <div className="cv-entry-head">
                                        <h3>{cert.name}</h3>
                                        <span className="cv-entry-date">{cert.date}</span>
                                    </div>
                                </article>
                            ))}
                        </section>
                    )}
                </div>

                <div className="cv-columns">
                    {skillArr.length > 0 && (
                        <section className="cv-section">
                            <h2 className="cv-section-title">{i18n.skills}</h2>
                            <ul className="cv-pill-list">
                                {skillArr.map((skill) => (
                                    <li key={skill.id}>{skill.name}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {softSkillArr.length > 0 && (
                        <section className="cv-section">
                            <h2 className="cv-section-title">{i18n.softSkills}</h2>
                            <ul className="cv-pill-list">
                                {softSkillArr.map((item, index) => (
                                    <li key={`${item}-${index}`}>{item}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cv;
