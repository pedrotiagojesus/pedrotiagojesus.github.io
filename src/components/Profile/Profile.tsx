import { Link } from "react-router-dom";

// CSS
import "./Profile.css";

// Image
import Avatar from "@assets/img/avatar.webp";

const Profile = () => {
    return (
        <Link id="widget-profile" to="/">
            <div className="avatar-wrapper">
                <img src={Avatar} alt="avatar" />
            </div>
            <div className="info">
                <p className="name">Pedro Jesus</p>
                <p className="role">Web Developer</p>
                <address>Lousã, Coimbra, PT</address>
            </div>
        </Link>
    );
};

export default Profile;
