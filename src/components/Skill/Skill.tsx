// CSS
import "./Skill.css";

// Components
import Item from "./Item.js";

// Translation
import { getVocabularyTranslation, getContentTranslation } from "../I18n/I18n";

type Skill = {
    name: string;
    percentage: number;
};

const Skill = () => {
    const skillArr = getContentTranslation("skill") as Skill[];

    return (
        skillArr &&
        skillArr.length && (
            <section id="skill">
                <h4>{getVocabularyTranslation("title.skills")}</h4>
                <ul className="list">
                    {skillArr.map((skill) => (
                        <Item
                            key={skill.name}
                            name={skill.name}
                            percentage={skill.percentage}
                        />
                    ))}
                </ul>
            </section>
        )
    );
};

export default Skill;
