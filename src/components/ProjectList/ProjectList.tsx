import { Link } from "react-router-dom";

// CSS
import "./ProjectList.css";

// Components
import CardSkeleton from "@components/Card/Skeleton/CardSkeleton";

// Types
import type { ProjectList as ProjectListProps } from "@typesLocal/index";

// Utils
import { vocabulary } from "@utils/vocabulary";
import Button from "@components/Button/Button";
import Card from "@components/Card/Card";
import { getProjectImage } from "@utils/image";
import { slugify } from "@utils/text";

const SkeletonList = ({ count }: { count: number }) => (
    <div className="list">
        {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} title={true} description={true} image={true} />
        ))}
    </div>
);

const ProjectList = ({
    title = "",
    projects = [],
    showViewAllButton = true,
    isLoading,
    itemLimit,
    keyPrefix = "project",
}: ProjectListProps) => {
    // Vocabulary
    const seeAll = vocabulary("common.seeAll");
    const skeletonCount = itemLimit ?? 4;

    if (isLoading) {
        return (
            <section id="project-list" aria-labelledby="project-list-title">
                {title && <h2 id="project-list-title">{title}</h2>}
                <SkeletonList count={skeletonCount} />
            </section>
        );
    }

    return (
        <section id="project-list" aria-labelledby="project-list-title">
            {title && <h2 id="project-list-title">{title}</h2>}
            <div className="list">
                {projects.map((project, index) => (
                    <Card
                        key={`${keyPrefix}-${project.id}`}
                        htmlElement="article"
                        title={project.name}
                        description={project.description}
                        image={getProjectImage(project.coverImage)}
                        link={`/project/${slugify(project.name)}`}
                        linkCover={true}
                        isLcp={index === 0}
                    />
                ))}
            </div>
            {showViewAllButton && projects.length > 0 && (
                <Button variant="secondary" as={Link} to="/project" className="view-all-button">
                    {seeAll}
                </Button>
            )}
        </section>
    );
};

export default ProjectList;
