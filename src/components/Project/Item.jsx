// CSS
import "./Project.css";

const Item = ({ name, description, url }) => {
    return (
        <div data-tpl="item">
            <div data-tpl="heading">
                <span className="fa-solid fa-square" data-tpl="icon"></span>
                <a target="_blank" href={url}>
                    {name}
                </a>
            </div>
            <div data-tpl="description" className="small">
                {description}
            </div>
        </div>
    );
};

export default Item;
