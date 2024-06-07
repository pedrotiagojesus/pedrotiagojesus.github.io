// CSS
import "./SoftSkill.css";

const Item = ({ name }) => {
    return (
        <li data-tpl="item">
            <span className="badge">{name}</span>
        </li>
    );
};

export default Item;
