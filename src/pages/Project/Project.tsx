// CSS
import "./Project.css";

// Components
import ProjectList from "@components/ProjectList/ProjectList";
import Seo from "@components/Seo";

// Utils
import { vocabulary } from "@utils/vocabulary";

// Hooks
import { useContents } from "@hooks/useContents";

const Project = () => {
    // Seo
    const { data, isLoading } = useContents(["seo", "projects"]);
    const projects = data?.projects ?? [];
    const seo = data?.seo?.projects;

    return (
        <>
            <Seo title={seo?.title} description={seo?.description} />
            <section id="project-list-content">
                <h1 className="page-title">{vocabulary("pages.projects.title")}</h1>
                <p className="page-summary">{vocabulary("pages.projects.summary")}</p>
                <ProjectList
                    title=""
                    projects={projects}
                    isLoading={isLoading}
                    showViewAllButton={false}
                    itemLimit={4}
                    keyPrefix="project-page"
                />
            </section>
        </>
    );
};

export default Project;
