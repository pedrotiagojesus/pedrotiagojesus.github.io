import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// CSS
import "./NotFound.css";

// Components
import Seo from "@components/Seo/Seo";
import Button from "@components/Button/Button";

// Same in both languages: it reads as an error code, not as copy.
const TITLE = "404/ NOT_FOUND";

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <>
            <Seo title={TITLE} description={t("pages.notFound.seoDescription")} noIndex={true} />
            <section id="not-found-content">
                {/* --chars drives the typing animation's width and steps */}
                <h1 className="page-title" style={{ "--chars": TITLE.length } as CSSProperties}>
                    {TITLE}
                </h1>
                <p className="page-summary">{t("pages.notFound.summary")}</p>
                <div>
                    <p>{t("pages.notFound.warning")}</p>
                    <p>{t("pages.notFound.description")}</p>
                </div>
                <Button as={Link} to="/">
                    {t("pages.notFound.backHome")}
                </Button>
            </section>
        </>
    );
};

export default NotFound;
