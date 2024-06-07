import { softSkillArr } from "../../Data.js";

// CSS
import "./SoftSkill.css";

// Components
import Item from "./Item.jsx";

const SoftSkill = () => {
    return (
        softSkillArr &&
        softSkillArr.length && (
            <div data-tpl="skill-topic">
                <h4 data-tpl="title">Soft Skills</h4>
                <ul data-tpl="list">
                    {softSkillArr.map((softSkill) => (
                        <Item key={softSkill} name={softSkill} />
                    ))}
                </ul>
            </div>
        )
    );
};

export default SoftSkill;
