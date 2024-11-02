// CSS
import "./Project.css";

// Components
import Item from "./Item";

// Translation
import { getVocabularyTranslation, getContentTranslation } from "../I18n/I18n";

type Project = {
    name: string;
    description: string;
    url: string;
};

const Project = () => {
    const projectArr = getContentTranslation("project") as Project[];

    return (
        projectArr &&
        projectArr.length && (
            <section id="project">
                <h4>{getVocabularyTranslation("title.projects")}</h4>
                {projectArr.map((project) => (
                    <Item
                        key={project.name}
                        name={project.name}
                        description={project.description}
                        url={project.url}
                    />
                ))}
            </section>
        )
    );
};

export default Project;
