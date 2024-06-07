import "./Skill.css";

const Item = ({ name, percentage }) => {
    return (
        <div data-tpl="item">
            <div data-tpl="name">{name}</div>
            <div className="progress" role="progressbar" title="{name}">
                <div
                    className="progress-bar"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Item;
