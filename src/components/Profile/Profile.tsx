// CSS
import "./Profile.css";

// Image
import Avatar from "./../../assets/avatar.webp";

// Translation
import { getTranslation } from "../I18n/I18n";

function Profile() {
    return (
        <section id="profile">
            <img
                className="profile-image rounded-circle"
                src={Avatar}
                alt={getTranslation("profile.image")}
            />
            <h1>Pedro Jesus</h1>
            <p>Web Developer</p>
        </section>
    );
}

export default Profile;
