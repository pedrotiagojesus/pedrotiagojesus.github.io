import { projectArr } from "../../Data";

// CSS
import "./Project.css";

// Components
import Item from "./Item";

const Project = () => {
    return (
        projectArr &&
        projectArr.length && (
            <section id="project">
                <h4>Projects</h4>
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
