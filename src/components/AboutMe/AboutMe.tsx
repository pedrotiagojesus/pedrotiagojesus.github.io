// CSS
import "./AboutMe.css";

// Translation
import { getVocabularyTranslation, getContentTranslation } from "../I18n/I18n";

function AboutMe() {
    const aboutMeArr = getContentTranslation("aboutMe") as [];

    return (
        <section id="about-me">
            <h2>{getVocabularyTranslation("title.aboutMe")}</h2>
            <div className="resume-summary-desc">
                {aboutMeArr.map((aboutMe, i) => (
                    <p key={i}>{aboutMe}</p>
                ))}
            </div>
        </section>
    );
}

export default AboutMe;
