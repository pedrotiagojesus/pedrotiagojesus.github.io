// CSS
import "./Card.css";

// Utils
import { slugify } from "@utils/text";

// Types
import { Card as CardProps } from "@typesLocal/index";

const Card = ({ htmlElement, title, description, image, link, linkCover }: CardProps) => {
    const Element = htmlElement || "div";
    return (
        <Element className={`card ${linkCover ? "link-cover" : ""}`}>
            {image && (
                <div className="card-image-wrapper">
                    <img src={image} alt={`image - ${slugify(title)}`} />
                </div>
            )}
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <div className="card-description">{description}</div>
            </div>
            {link && linkCover && <a href={link} className="card-link cover"></a>}
        </Element>
    );
};

export default Card;
