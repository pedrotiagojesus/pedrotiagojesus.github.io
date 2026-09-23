import { Link } from "react-router-dom";

// CSS
import "./NotFound.css";

// Components
import Seo from "@components/Seo";
import Button from "@components/Button/Button";

const NotFound = () => {
    return (
        <>
            <Seo title="404/ NOT_FOUND" description="The page you're looking for doesn't exist." noIndex={true} />
            <section id="not-found-content">
                <h1 className="page-title">404/ NOT_FOUND</h1>
                <p className="page-summary">PAGE MISSING</p>
                <div>
                    <p>WARNING: Resource not found.</p>
                    <p>The requested resource does not exist, may have been removed, or the link is broken.</p>
                </div>
                <Button as={Link} to="/">
                    Back to home
                </Button>
            </section>
        </>
    );
};

export default NotFound;
