// CSS
import "./Education.css";

const ProjectItem = ({ organization, degree, time, description }) => {
    return (
        <li className="item">
            <div className="organization">{organization}</div>
            <div className="degree">{degree}</div>
            <div className="time">{time}</div>
            <div className="description">{description}</div>
        </li>
    );
};

export default ProjectItem;
