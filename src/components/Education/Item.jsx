// CSS
import "./Education.css";

const ProjectItem = ({ organization, degree, time, description }) => {
    return (
        <li data-tpl="item">
            <div data-tpl="organization">{organization}</div>
            <div data-tpl="degree">{degree}</div>
            <div data-tpl="time">{time}</div>
            <div data-tpl="description">{description}</div>
        </li>
    );
};

export default ProjectItem;
