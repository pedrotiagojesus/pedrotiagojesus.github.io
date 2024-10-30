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
            <h3>Pedro Jesus</h3>
            <p>Web Developer</p>
        </section>
    );
}

export default Profile;
