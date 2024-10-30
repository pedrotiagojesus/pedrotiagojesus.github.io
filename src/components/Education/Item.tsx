// CSS
import "./Education.css";

interface Props {
    organization: string;
    degree: string;
    dateStart: number;
    dateEnd: number;
    description: string;
}

const ProjectItem = ({
    organization,
    degree,
    dateStart,
    dateEnd,
    description,
}: Props) => {
    return (
        <article className="item">
            <h5 className="organization">{organization}</h5>
            <div className="degree">{degree}</div>
            <div className="time">
                <time dateTime={dateStart.toString()}>{dateStart}</time> –{" "}
                <time dateTime={dateEnd.toString()}>{dateEnd}</time>
            </div>
            <div className="description">{description}</div>
        </article>
    );
};

export default ProjectItem;
