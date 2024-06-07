import { skillArr } from "../../Data.js";

// CSS
import "./Skill.css";

// Components
import Item from "./Item.jsx";

const Skill = () => {
    return (
        skillArr &&
        skillArr.length && (
            <div id="skill">
                <h4 data-tpl="title">Skills</h4>

                <div data-tpl="list">
                    {skillArr.map((skill) => (
                        <Item
                            key={skill.name}
                            name={skill.name}
                            percentage={skill.percentage}
                        />
                    ))}
                </div>
            </div>
        )
    );
};

export default Skill;
