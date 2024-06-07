import "./Homepage.css";

import Avatar from "./../../assets/avatar.webp";

import { aboutMeArr } from "../../Data.js";

// Components
import Experience from "../../components/Experience/Experience.jsx";
import Skill from "../../components/Skill/Skill.jsx";
import SoftSkill from "../../components/SoftSkill/SoftSkill.jsx";
import Project from "../../components/Project/Project";
import Language from "../../components/Language/Language.jsx";
import Education from "../../components/Education/Education.jsx";
import Certification from "../../components/Certification/Certification.jsx";

const Homepage = () => {
    // About me
    let aboutMeHtml = [];

    aboutMeArr.map((aboutMe, i) => aboutMeHtml.push(<p key={i}>{aboutMe}</p>));

    return (
        <section className="wrapper-profile" id="resume">
            <div className="container">
                <div className="inner">
                    <img
                        className="profile-image rounded-circle"
                        src={Avatar}
                        alt="Profile Image"
                    />
                    <h3 data-tpl="title">Pedro Jesus</h3>
                    <h4 data-tpl="subtitle">Web Developer</h4>

                    <div data-tpl="contact">
                        <div data-tpl="item">
                            <span
                                className="fas fa-phone"
                                data-tpl="icon"
                            ></span>
                            <span>+351 910 746 466</span>
                        </div>
                        <div data-tpl="item">
                            <span className="fas fa-at" data-tpl="icon"></span>
                            <a href="mailto:pedrotiagojesus1995@gmail.com">
                                pedrotiagojesus1995@gmail.com
                            </a>
                        </div>
                        <div data-tpl="item">
                            <span
                                className="fas fa-globe"
                                data-tpl="icon"
                            ></span>
                            <a
                                href="https://pedrotiagojesus.github.io"
                                target="_blank"
                            >
                                https://pedrotiagojesus.github.io
                            </a>
                        </div>
                    </div>

                    <div className="body">
                        <div className="row" data-tpl="row-main">
                            <div className="col-12 col-lg-8" data-tpl="left">
                                <div data-tpl="summary">
                                    <h2 data-tpl="title">About me</h2>
                                    <div className="resume-summary-desc">
                                        {aboutMeHtml}
                                    </div>
                                </div>

                                <Experience />
                            </div>

                            <div className="col-12 col-lg-4" data-tpl="right">
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
        </section>
    );
};

export default Homepage;
