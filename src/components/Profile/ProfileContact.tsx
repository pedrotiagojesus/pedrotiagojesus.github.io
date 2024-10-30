import "./ProfileContact.css";

function ProfileContact() {
    return (
        <section id="profile-contact">
            <h1 className="nocontent outline d-none">Profile Contact</h1>
            <address>
                <i className="fas fa-phone icon"></i>
                <span>+351 910 746 466</span>
            </address>
            <address>
                <i className="fas fa-at icon"></i>
                <a href="mailto:pedrotiagojesus1995@gmail.com">
                    pedrotiagojesus1995@gmail.com
                </a>
            </address>
            <address>
                <i className="fas fa-globe icon"></i>
                <a href="https://pedrotiagojesus.github.io" target="_blank">
                    https://pedrotiagojesus.github.io
                </a>
            </address>
        </section>
    );
}

export default ProfileContact;
