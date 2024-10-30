// CSS
import "./SoftSkill.css";

interface Props {
    name: string;
}

const Item = ({ name }: Props) => {
    return (
        <li className="item">
            <span className="badge">{name}</span>
        </li>
    );
};

export default Item;
