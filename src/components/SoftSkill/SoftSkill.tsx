import { softSkillArr } from "../../Data.js";

// CSS
import "./SoftSkill.css";

// Components
import Item from "./Item.js";

// Translation
import { getTranslation } from "../I18n/I18n";

const SoftSkill = () => {
    return (
        softSkillArr &&
        softSkillArr.length && (
            <section id="skill-topic">
                <h4>{getTranslation("title.softSkills")}</h4>
                <ul className="list">
                    {softSkillArr.map((softSkill) => (
                        <Item key={softSkill} name={softSkill} />
                    ))}
                </ul>
            </section>
        )
    );
};

export default SoftSkill;
