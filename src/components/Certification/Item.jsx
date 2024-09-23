// CSS
import "./Certification.css";

const Item = ({ name, description, date, url }) => {
    return (
        <div className="item">
            <div className="heading">
                <span className="fa-solid fa-square icon"></span>
                <a target="_blank" href={url}>
                    {name}
                </a>
            </div>
            <p className="small">{date}</p>
            <div className="description">{description}</div>
        </div>
    );
};

export default Item;
