import { Helmet } from "react-helmet-async";

// Types
import { SEOProps } from "@typesLocal/index";

const Seo = ({ title, description, image, url, type = "website", noIndex = false }: SEOProps) => {
    if (!title && !description) return null;

    return (
        <Helmet>
            {/* Basic */}
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}

            {/* Robots */}
            <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

            {/* Open Graph */}
            {title && <meta property="og:title" content={title} />}
            {description && <meta property="og:description" content={description} />}
            {type && <meta property="og:type" content={type} />}
            {url && <meta property="og:url" content={url} />}
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            {title && <meta name="twitter:title" content={title} />}
            {description && <meta name="twitter:description" content={description} />}
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    );
};

export default Seo;
