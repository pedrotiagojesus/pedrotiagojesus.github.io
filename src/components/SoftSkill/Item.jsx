// CSS
import "./SoftSkill.css";

const Item = ({ name }) => {
    return (
        <li className="item">
            <span className="badge">{name}</span>
        </li>
    );
};

export default Item;
