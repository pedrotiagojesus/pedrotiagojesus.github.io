import { skillArr } from "../../Data.js";

// CSS
import "./Skill.css";

// Components
import Item from "./Item.js";

const Skill = () => {
    return (
        skillArr &&
        skillArr.length && (
            <section id="skill">
                <h4>Skills</h4>

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
