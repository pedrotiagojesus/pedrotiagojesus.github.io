// CSS
import "./Certification.css";

const Item = ({ name, description, date, url }) => {
    return (
        <div className="item">
            <div className="heading">
                <span className="fa-solid fa-square" data-tpl="icon"></span>
                <a target="_blank" href={url}>
                    {name}
                </a>
            </div>
            <p className="small">{date}</p>
            <div data-tpl="description" className="small">
                {description}
            </div>
        </div>
    );
};

export default Item;
