// CSS
import "./Footer.css";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer>
            <p>© {year} Portfolio. All rights reserved.</p>
            <p>Made with 💓 By Pedro Jesus</p>
        </footer>
    );
};

export default Footer;
