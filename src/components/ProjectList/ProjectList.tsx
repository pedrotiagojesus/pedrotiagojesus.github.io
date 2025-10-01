import { Link } from "react-router-dom";

// CSS
import "./ProjectList.css";

// Components
import ProjectItem from "@components/ProjectItem/ProjectItem";

// Types
import type { Project } from "@typesLocal/project";

// Hooks
import { getContent, getVocabulary } from "@hooks/useTranslationHelpers";

type ProjectListProps = {
    title: string;
    limit?: number;
    showViewAllButton?: boolean;
    viewAllLink?: string;
};

const ProjectList = ({ title, limit, showViewAllButton = true, viewAllLink = "/project" }: ProjectListProps) => {

    const projectArr = getContent("project") as Project[];
    const projectsToShow = limit ? projectArr.slice(0, limit) : projectArr;

    return (
        <section id="project-list" aria-label={title}>
            <h3>{title}</h3>
            <div className="list">
                {projectsToShow.map((project) => (
                    <ProjectItem
                        key={project.name}
                        name={project.name}
                        description={project.description}
                        image={project.coverImage}
                    />
                ))}
            </div>
            {showViewAllButton && (
                <Link to={viewAllLink} className="btn btn-secondary view-all-button">
                    {getVocabulary("project.seeAll")}
                </Link>
            )}
        </section>
    );
};

export default ProjectList;
