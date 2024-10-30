import { educationArr } from "../../Data.js";

// CSS
import "./Education.css";

// Components
import Item from "./Item";

const Education = () => {
    return (
        educationArr &&
        educationArr.length && (
            <section id="education">
                <h4>Education</h4>
                <div className="list">
                    {educationArr.map((education) => (
                        <Item
                            key={education.organization}
                            organization={education.organization}
                            degree={education.degree}
                            dateStart={education.dateStart}
                            dateEnd={education.dateEnd}
                            description={education.description}
                        />
                    ))}
                </div>
            </section>
        )
    );
};

export default Education;
