import { useParams, Navigate, Link } from "react-router-dom";

// CSS
import "./ProjectItem.css";

// I18N
import { getVocabulary, getContent } from "../../components/I18n/I18n";

// Utils
import { slugify } from "../../utils/Text";

type Project = {
    name: string;
    description: string;
    coverImage: string;
    urlDemo: string;
    urlSource: string;
};

const ProjectItem = () => {
    const { slug } = useParams<{ slug: string }>();

    // Projects
    const projectArr = getContent("project") as Project[];
    let project = projectArr.find((project) => slugify(project.name) == slug);

    if (!project) {
        return <Navigate to="/project" replace />;
    }

    return (
        <section id="project-item-content">
            <Link to="/project" className="all-project-link">
                <i className="fa-solid fa-arrow-left"></i>
                {getVocabulary("project.allProjects")}
            </Link>
            <h1 className="page-title">{project.name}</h1>
            <p className="page-summary">{project.description}</p>
            <img src={`/projects/${project.coverImage}`} alt="" />
            <div className="wrapper-link">
                <div className="text">
                    <h3>{getVocabulary("project.demoCode")}</h3>
                    <p>{getVocabulary("project.demoCodeSummary")}</p>
                </div>
                <div className="links">
                    {project.urlDemo != "" ? (
                        <a
                            href={project.urlDemo}
                            target="_blank"
                            className="btn"
                        >
                            {getVocabulary("project.demo")}
                        </a>
                    ) : (
                        ""
                    )}

                    {project.urlSource != "" ? (
                        <a
                            href={project.urlSource}
                            target="_blank"
                            className="btn btn-secondary"
                        >
                            {getVocabulary("project.source")}
                        </a>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProjectItem;
