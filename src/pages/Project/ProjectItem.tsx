import { useParams, Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// CSS
import "./ProjectItem.css";

// Utils
import { useTranslation } from "react-i18next";
import { getProjectImage } from "@utils/image";

// Hooks
import { useContents } from "@hooks/useContents";

// Config
import { SITE_URL } from "@config/site";

// Components
import Loading from "@components/Loading/Loading";
import Seo from "@components/Seo/Seo";
import Button from "@components/Button/Button";

const ProjectItem = () => {
    const { t } = useTranslation();

    const i18nAll = t("pages.projects.actions.all");
    const i18nDemo = t("pages.projects.actions.demo");
    const i18nSource = t("pages.projects.actions.source");
    const i18nModalTitle = t("pages.projects.demoModal.title");
    const i18nModalDescription = t("pages.projects.demoModal.description");

    const { slug } = useParams<{ slug: string }>();
    const { data, isLoading, isError } = useContents(["projects", "seo"], [slug!]);

    // Project
    const project = data?.projects?.[0];

    if (isLoading) return <Loading />;
    if (isError) return <p>Erro ao carregar projeto.</p>;

    if (!project) {
        return <Navigate to="/project" replace />;
    }

    // Seo
    const seo = data?.seo?.project;

    return (
        <>
            <Seo
                title={project.name + "" + seo?.title}
                description={seo?.description}
                url={`${SITE_URL}/project/${project.slug}`}
            />
            <section id="project-item-content">
                <Button as={Link} to="/project" className="all-project-link">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    {i18nAll}
                </Button>

                <h1 className="page-title">{project.name}</h1>
                <p className="page-summary">{project.description}</p>
                <img src={getProjectImage(project.coverImage)} alt="" />
                <div className="wrapper-link">
                    <div className="text">
                        <h3>{i18nModalTitle}</h3>
                        <p>{i18nModalDescription}</p>
                    </div>
                    <div className="links">
                        {project.urlDemo != "" ? (
                            <a href={project.urlDemo} target="_blank" className="btn">
                                {i18nDemo}
                            </a>
                        ) : (
                            ""
                        )}
                        {project.urlSource != "" ? (
                            <a href={project.urlSource} target="_blank" className="btn btn-secondary">
                                {i18nSource}
                            </a>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectItem;
