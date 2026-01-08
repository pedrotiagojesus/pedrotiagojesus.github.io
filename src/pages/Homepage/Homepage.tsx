import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

// CSS
import "./Homepage.css";

// Components
import Block from "@components/Block/Block";
import ProjectList from "@components/ProjectList/ProjectList";
import Seo from "@components/Seo";
import Button from "@components/Button/Button";

// Utils
import { vocabulary } from "@utils/vocabulary";

// Hooks
import { useContents } from "@hooks/useContents";

const Homepage = () => {
    // Vocabulary
    const i18n = {
        heroTitle: vocabulary("pages.home.hero.title"),
        heroSubtitle: vocabulary("pages.home.hero.subtitle"),
        about: vocabulary("navigation.about"),
        projects: vocabulary("navigation.projects"),
    };

    const defaultText = vocabulary("common.copyEmail");
    const [buttonText, setButtonText] = useState<string | undefined>(defaultText);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText("pedrotiagojesus1995@gmail.com");
            setButtonText("Copied");
            setTimeout(() => setButtonText(defaultText), 2000);
        } catch (error) {
            console.error("Failed to copy the value:", error);
        }
    };

    // Seo
    const { data, isLoading } = useContents(["seo", "projects"]);
    const projects = data?.projects ?? [];
    const limitedProjects = useMemo(() => {
        return projects.slice(0, 2);
    }, [projects]);

    const seo = data?.seo?.home;

    return (
        <>
            <Seo title={seo?.title} description={seo?.description} noIndex={true} />
            <section id="homepage-about" aria-labelledby="homepage-title">
                <h1 id="homepage-title" className="page-title">
                    {i18n.heroTitle}
                </h1>
                <p className="page-summary">{i18n.heroSubtitle}</p>
                <div className="group-button">
                    <Button as={Link} to="/about">
                        {i18n.about}
                    </Button>
                    <Button variant="secondary" onClick={handleCopy} className="email">
                        <i className="fa-regular fa-copy"></i> {buttonText}
                    </Button>
                </div>
            </section>
            <ProjectList
                title={i18n.projects}
                projects={limitedProjects}
                isLoading={isLoading}
                showViewAllButton={true}
                itemLimit={2}
                keyPrefix="homepage-project"
            />
            <hr className="homepage-hr" />
            <Block />
        </>
    );
};

export default Homepage;
