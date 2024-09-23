// CSS
import "./Skill.css";

// Utils
import { slugify } from "../../utils/Text";

const Item = ({ name, percentage }) => {
    return (
        <div className="item" title={name}>
            <img
                height="32"
                width="32"
                src={`https://cdn.simpleicons.org/${slugify(name)}`}
            />
            <div className="content">
                <div className="name">{name}</div>

                <div className="progress" role="progressbar">
                    <div
                        className="progress-bar"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Item;
