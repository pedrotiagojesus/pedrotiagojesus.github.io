import { Link } from "react-router-dom";

// CSS
import "./Homepage.css";

// Components
import CopyButton from "@components/CopyButton/CopyButton";
import Block from "@components/Block/Block";
import ProjectList from "@components/ProjectList/ProjectList.tsx";

// Hooks
import { getVocabulary } from "@hooks/useTranslationHelpers";

const Homepage = () => {
    return (
        <>
            <section id="homepage-about">
                <h1 className="page-title">{getVocabulary("homepage.about.title")}</h1>
                <p className="page-summary">{getVocabulary("homepage.about.text")}</p>
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
            <ProjectList title={getVocabulary("homepage.project.title")} limit={2} />
            <hr className="homepage-hr" />
            <Block />
        </>
    );
};

export default Homepage;
