// CSS
import "./Card.css";

// Utils
import { slugify } from "@utils/text";

// Types
import { Card as CardProps } from "@typesLocal/index";

const Card = ({ htmlElement, title, description, image, link, linkCover, isLcp }: CardProps) => {
    const Element = htmlElement || "div";

    // React 18's runtime doesn't recognize the camelCase `fetchPriority` DOM
    // property yet (added in React 19) and warns about it, even though
    // @types/react already declares it. Passing the real lowercase HTML
    // attribute name instead avoids the warning and still sets it correctly.
    const imgPriorityProps: Record<string, string> = { fetchpriority: isLcp ? "high" : "auto" };

    return (
        <Element className={`card ${linkCover ? "link-cover" : ""}`}>
            {image && (
                <div className="card-image-wrapper">
                    <img
                        src={image}
                        alt={`image - ${slugify(title)}`}
                        width="1920"
                        height="1080"
                        {...imgPriorityProps}
                        loading={isLcp ? "eager" : "lazy"}
                        decoding="async"
                    />
                </div>
            )}
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <div className="card-description">{description}</div>
            </div>
            {link && linkCover && (
                <a href={link} className="card-link cover" aria-label={`View ${title}`}>
                    <span className="sr-only">View {title}</span>
                </a>
            )}
        </Element>
    );
};

export default Card;
