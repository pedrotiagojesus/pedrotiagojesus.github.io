import { experienceArr } from "../../Data.js";

// CSS
import "./Experience.css";

// Components
import Item from "./Item.jsx";

const Experience = () => {
    return (
        experienceArr &&
        experienceArr.length && (
            <div data-tpl="experience">
                <h2 data-tpl="title">Experience</h2>

                <div data-tpl="resume-timeline">
                    {experienceArr.map((experience, i) => (
                        <Item
                            key={i}
                            company={experience.company}
                            role={experience.role}
                            date={experience.date}
                            contentArr={experience.content}
                        />
                    ))}
                </div>
            </div>
        )
    );
};

export default Experience;
