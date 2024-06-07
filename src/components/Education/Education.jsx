import { educationArr } from "../../Data.js";

// CSS
import "./Education.css";

// Components
import Item from "./Item.jsx";

const Education = () => {
    return (
        educationArr &&
        educationArr.length && (
            <div data-tpl="education">
                <h4 data-tpl="title">Education</h4>
                <ul data-tpl="list">
                    {educationArr.map((education) => (
                        <Item
                            key={education.organization}
                            organization={education.organization}
                            degree={education.degree}
                            time={education.time}
                            description={education.description}
                        />
                    ))}
                </ul>
            </div>
        )
    );
};

export default Education;
