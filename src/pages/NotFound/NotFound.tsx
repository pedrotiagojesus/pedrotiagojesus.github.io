// CSS
import "./NotFound.css";

// Components
import Seo from "@components/Seo";

const NotFound = () => {
    return (
        <>
            <Seo title="404/ not_found" description="page missing" />
            <section id="not-found-content">
                <h1 className="page-title">404/ NOT_FOUND</h1>
                <p className="page-summary">PAGE MISSING</p>
                <div>
                    <p>RESOURCE DEPRECATION: The resource may have been</p>
                    <p>RESOURCE DEPRECATION: The resource may have been deprecated or removed from the system.</p>
                </div>
                <div>
                    <p>INFO: Attempting to Locate Resource</p>
                    <p>Resource Path: /pedrotiagojesus.github.io/notfound.html</p>
                    <p>Resource Status: NOT FOUND</p>
                </div>
                <div>
                    <p>WARNING: Resource Not Found</p>
                    <p>The requested resource does not exist.</p>
                    <p>Potential Reasons:</p>
                    <p>Resource may have been removed or renamed.</p>
                    <p>Directory structure may have changed.</p>
                    <p>Permissions issues may restrict access.</p>
                </div>
            </section>
        </>
    );
};

export default NotFound;
