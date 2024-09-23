import { softSkillArr } from "../../Data.js";

// CSS
import "./SoftSkill.css";

// Components
import Item from "./Item.jsx";

const SoftSkill = () => {
    return (
        softSkillArr &&
        softSkillArr.length && (
            <div id="skill-topic">
                <h4 className="title">Soft Skills</h4>
                <ul className="list">
                    {softSkillArr.map((softSkill) => (
                        <Item key={softSkill} name={softSkill} />
                    ))}
                </ul>
            </div>
        )
    );
};

export default SoftSkill;
