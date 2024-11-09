// CSS
import "./Project.css";

// I18N
import { getVocabulary, getContent } from "../../components/I18n/I18n";

// Components
import ProjectItem from "../../components/ProjectItem/ProjectItem";

type Project = {
    name: string;
    description: string;
    coverImage: string;
};

const Project = () => {
    // Projects
    const projectArr = getContent("project") as Project[];

    return (
        <section id="project-list-content">
            <h1 className="page-title">{getVocabulary("project.title")}</h1>
            <p className="page-summary">{getVocabulary("project.summary")}</p>
            <div className="project-list">
                {projectArr.map((project, index) => (
                    <ProjectItem
                        name={project.name}
                        description={project.description}
                        image={project.coverImage}
                        key={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default Project;
