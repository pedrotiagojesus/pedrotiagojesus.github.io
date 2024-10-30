import "./AboutMe.css";

import { aboutMeArr } from "../../Data";

function AboutMe() {
    let aboutMeHtml = new Array();
    aboutMeArr.map((aboutMe, i) => aboutMeHtml.push(<p key={i}>{aboutMe}</p>));

    return (
        <section id="about-me">
            <h2>About me</h2>
            <div className="resume-summary-desc">{aboutMeHtml}</div>
        </section>
    );
}

export default AboutMe;
