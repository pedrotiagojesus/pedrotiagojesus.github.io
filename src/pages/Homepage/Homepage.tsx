import { Link } from "react-router-dom";

// CSS
import "./Homepage.css";

// Contexts
import { useActivePage } from "../../contexts/ActivePageContext";

// I18N
import { getVocabulary, getContent } from "../../components/I18n/I18n";

// Components
import CopyButton from "../../components/CopyButton/CopyButton";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import Block from "../../components/Block/Block";

type Project = {
    name: string;
    description: string;
    coverImage: string;
};

const Homepage = () => {
    // Projects
    const projectArr = getContent("project") as Project[];

    return (
        <>
            <section id="homepage-about">
                <h1 className="page-title">
                    {getVocabulary("homepage.about.title")}
                    <br />
                    {getVocabulary("homepage.about.title2")}
                    <span>{getVocabulary("homepage.about.title3")}</span>
                </h1>
                <p className="page-summary">
                    {getVocabulary("homepage.about.text")}
                </p>
                <div className="group-button">
                    <Link to="/about" className="btn">
                        {getVocabulary("navigation.about")}
                    </Link>
                    <CopyButton
                        value="pedrotiagojesus1995@gmail.com"
                        className="btn-secondary email"
                        text={getVocabulary("common.copyEmail")}
                    />
                </div>
            </section>
            <section id="last-project">
                <h3>{getVocabulary("homepage.project.title")}</h3>
                <div className="project-list">
                    {projectArr.slice(0, 2).map((project, index) => (
                        <ProjectItem
                            name={project.name}
                            description={project.description}
                            image={project.coverImage}
                            key={index}
                        />
                    ))}
                </div>
            </section>
            <hr className="homepage-hr" />
            <Block />
        </>
    );
};

export default Homepage;
