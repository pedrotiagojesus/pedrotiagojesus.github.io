import { aboutMeArr } from "../../Data";

// CSS
import "./AboutMe.css";

// Translation
import { getTranslation } from "../I18n/I18n";

function AboutMe() {
    let aboutMeHtml = new Array();
    aboutMeArr.map((aboutMe, i) => aboutMeHtml.push(<p key={i}>{aboutMe}</p>));

    return (
        <section id="about-me">
            <h2>{getTranslation("title.aboutMe")}</h2>
            <div className="resume-summary-desc">{aboutMeHtml}</div>
        </section>
    );
}

export default AboutMe;
