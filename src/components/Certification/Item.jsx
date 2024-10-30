// CSS
import "./Certification.css";

const Item = ({ name, description, date, url }) => {
    return (
        <div className="item">
            <div className="heading">
                <i className="fa-solid fa-square icon"></i>
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
