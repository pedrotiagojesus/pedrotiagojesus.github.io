import { Link } from "react-router-dom";

// CSS
import "./ProjectItem.css";

// Utils
import { slugify } from "../../utils/Text";

type Props = {
    name: string;
    description: string;
    image: string;
};

const ProjectItem = ({ name, description, image }: Props) => {
    return (
        <article className="project-item">
            <Link to={`/project/${slugify(name)}`}></Link>
            <div className="image-wrapper">
                <img src={`/projects/${image}`} alt={`project - ${name}`} />
            </div>
            <div className="content">
                <h4>{name}</h4>
                <p>{description}</p>
            </div>
        </article>
    );
};

export default ProjectItem;
