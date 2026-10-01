// CSS
import "./Project.css";

// Components
import ProjectList from "@components/ProjectList/ProjectList";
import Seo from "@components/Seo/Seo";

// Utils
import { useTranslation } from "react-i18next";

// Hooks
import { useContents } from "@hooks/useContents";

// Config
import { SITE_URL } from "@config/site";

const Project = () => {
    const { t } = useTranslation();

    // Seo
    const { data, isLoading } = useContents(["seo", "projects"]);
    const projects = data?.projects ?? [];
    const seo = data?.seo?.projects;

    return (
        <>
            <Seo title={seo?.title} description={seo?.description} url={SITE_URL + "/project"} />
            <section id="project-list-content">
                <h1 className="page-title">{t("pages.projects.title")}</h1>
                <p className="page-summary">{t("pages.projects.summary")}</p>
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
