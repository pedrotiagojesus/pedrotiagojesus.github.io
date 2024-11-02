// CSS
import "./SoftSkill.css";

interface Props {
    name: string;
}

const Item = ({ name }: Props) => {
    return <p className="badge">{name}</p>;
};

export default Item;
