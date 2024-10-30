// CSS
import "./Skill.css";

// Utils
import { slugify } from "../../utils/Text";

interface Props {
    name: string;
    percentage: string;
}

const Item = ({ name, percentage }: Props) => {
    return (
        <li className="item" title={name}>
            <img
                height="32"
                width="32"
                src={`https://cdn.simpleicons.org/${slugify(name)}`}
                alt={slugify(name)}
            />
            <div className="content">
                <div className="name">{name}</div>
                <div
                    className="progress"
                    role="progressbar"
                    aria-label={`level-${name}`}
                >
                    <div
                        className="progress-bar"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        </li>
    );
};

export default Item;