import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

// CSS
import "./Homepage.css";

// Components
import Block from "@components/Block/Block";
import ProjectList from "@components/ProjectList/ProjectList";
import Seo from "@components/Seo";
import Button from "@components/Button/Button";

// Utils
import { useVocabularyText } from "@utils/vocabulary";

// Hooks
import { useContents } from "@hooks/useContents";

// Config
import { SITE_URL } from "@config/site";

const Homepage = () => {
    // Vocabulary
    const i18n = {
        heroTitle: useVocabularyText("pages.home.hero.title"),
        heroSubtitle: useVocabularyText("pages.home.hero.subtitle"),
        about: useVocabularyText("navigation.about"),
        projects: useVocabularyText("navigation.projects"),
    };

    const defaultText = useVocabularyText("common.copyEmail");
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
            <Seo title={seo?.title} description={seo?.description} url={SITE_URL + "/"} />
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
                        <FontAwesomeIcon icon={faCopy} /> {buttonText}
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
