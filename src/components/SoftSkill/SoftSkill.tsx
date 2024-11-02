// CSS
import "./SoftSkill.css";

// Components
import Item from "./Item.js";

// Translation
import { getVocabularyTranslation, getContentTranslation } from "../I18n/I18n";

const SoftSkill = () => {
    const softSkillArr = getContentTranslation("softSkill") as [];

    return (
        softSkillArr &&
        softSkillArr.length && (
            <section id="skill-topic">
                <h4>{getVocabularyTranslation("title.softSkills")}</h4>
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
