import { experienceArr } from "../../Data.js";

// CSS
import "./Experience.css";

// Components
import Item from "./Item";

const Experience = () => {
    return (
        experienceArr &&
        experienceArr.length && (
            <section id="experience">
                <h2>Experience</h2>

                <div className="resume-timeline">
                    {experienceArr.map((experience, i) => (
                        <Item
                            key={i}
                            company={experience.company}
                            role={experience.role}
                            dateStart={experience.dateStart}
                            dateEnd={experience.dateEnd}
                            contentArr={experience.content}
                        />
                    ))}
                </div>
            </section>
        )
    );
};

export default Experience;
