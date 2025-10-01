// CSS
import "./Project.css";

// Components
import ProjectList from "@components/ProjectList/ProjectList";

// Hooks
import { getVocabulary } from "@hooks/useTranslationHelpers";

type Project = {
    name: string;
    description: string;
    coverImage: string;
};

const Project = () => {
    return (
        <section id="project-list-content">
            <h1 className="page-title">{getVocabulary("project.title")}</h1>
            <p className="page-summary">{getVocabulary("project.summary")}</p>
            <ProjectList title="" showViewAllButton={false} />
        </section>
    );
};

export default Project;
