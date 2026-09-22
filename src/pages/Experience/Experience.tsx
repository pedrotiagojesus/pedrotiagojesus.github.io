// CSS
import "./Experience.css";

// Utils
import { useVocabularyText } from "@utils/vocabulary";

// Components
import Block from "@components/Block/Block";
import Loading from "@components/Loading/Loading";
import Seo from "@components/Seo";

// Hooks
import { useContents } from "@hooks/useContents";

// Config
import { SITE_URL } from "@config/site";

const Experience = () => {
    // Vocabulary
    const i18n = {
        title: useVocabularyText("pages.experience.title"),
        summary: useVocabularyText("pages.experience.summary"),
    };

    const { data, isLoading, isError } = useContents(["experiences", "seo"]);

    // Experience
    const safeExperience = data?.experience ?? [];

    if (isLoading) return <Loading />;
    if (isError) return <p>Erro ao carregar experiências.</p>;

    // Seo
    const seo = data?.seo?.experience;

    return (
        <>
            <Seo title={seo?.title} description={seo?.description} url={SITE_URL + "/experience"} />
            <section id="experience-content">
                <h1 className="page-title">{i18n.title}</h1>
                <p className="page-summary">{i18n.summary}</p>
                <div className="experience-list">
                    {safeExperience.map((exp) => (
                        <article key={exp.id} className="experience-card">
                            <h2 className="experience-role">{exp.role}</h2>
                            <div className="experience-meta">
                                <span className="company">{exp.company}</span>
                                <span className="separator">•</span>
                                <span className="date">
                                    <time dateTime={String(exp.dateStart)}>{exp.dateStart}</time>
                                    {" — "}
                                    <time dateTime={String(exp.dateEnd)}>{exp.dateEnd}</time>
                                </span>
                            </div>
                            <ul>
                                {exp.content.map((item, index) => (
                                    <li key={`${item}-${index}`}>{item}</li>
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
