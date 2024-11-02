import { projectArr } from "../../Data";

// CSS
import "./Project.css";

// Components
import Item from "./Item";

// Translation
import { getTranslation } from "../I18n/I18n";

const Project = () => {
    return (
        projectArr &&
        projectArr.length && (
            <section id="project">
                <h4>{getTranslation("title.projects")}</h4>
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
