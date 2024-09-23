// CSS
import "./Project.css";

const Item = ({ name, description, url }) => {
    return (
        <div className="item">
            <div className="heading">
                <span className="fa-solid fa-square" data-tpl="icon"></span>
                <a target="_blank" href={url}>
                    {name}
                </a>
            </div>
            <div className="description">{description}</div>
        </div>
    );
};

export default Item;
