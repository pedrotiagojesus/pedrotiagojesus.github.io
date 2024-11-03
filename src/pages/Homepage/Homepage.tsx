// CSS
import "./Homepage.css";

// Components
import Profile from "../../components/Profile/Profile";
import ProfileContact from "../../components/Profile/ProfileContact";
import AboutMe from "../../components/AboutMe/AboutMe";
import Experience from "../../components/Experience/Experience";
import Skill from "../../components/Skill/Skill";
import SoftSkill from "../../components/SoftSkill/SoftSkill";
import Project from "../../components/Project/Project";
import Education from "../../components/Education/Education";
import Language from "../../components/Language/Language";
import Certification from "../../components/Certification/Certification";

const Homepage = () => {
    return (
        <div className="container">
            <div id="homepage" className="card">
                <div className="card-body">
                    <Profile />
                    <ProfileContact />

                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <AboutMe />
                            <Experience />
                        </div>
                        <div className="col-12 col-lg-4">
                            <Skill />
                            <SoftSkill />
                            <Project />
                            <Education />
                            <Certification />
                            <Language />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
