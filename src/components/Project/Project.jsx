import { projectArr } from "../../Data.js";

// CSS
import "./Project.css";

// Components
import Item from "./Item.jsx";

const Project = () => {
    return (
        projectArr &&
        projectArr.length && (
            <div data-tpl="project">
                <h4 data-tpl="title">Projects</h4>
                {projectArr.map((project) => (
                    <Item
                        key={project.name}
                        name={project.name}
                        description={project.description}
                        url={project.url}
                    />
                ))}
            </div>
        )
    );
};

export default Project;
