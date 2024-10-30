import "./Profile.css";

import Avatar from "./../../assets/avatar.webp";

function Profile() {
    return (
        <section id="profile">
            <img
                className="profile-image rounded-circle"
                src={Avatar}
                alt="Profile Image"
            />
            <h1>Pedro Jesus</h1>
            <p>Web Developer</p>
        </section>
    );
}

export default Profile;
