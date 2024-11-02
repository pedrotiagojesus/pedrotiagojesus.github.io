import { useState, useRef, useEffect } from "react";

// CSS
import "./Project.css";

// Translation
import { getVocabularyTranslation } from "../I18n/I18n";

interface Props {
    name: string;
    description: string;
    url: string;
}

const Item = ({ name, description, url }: Props) => {
    const [showAll, setShowAll] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const descriptionRef = useRef<any>(null);

    useEffect(() => {
        const verifyLine = () => {
            const element = descriptionRef.current;
            if (element) {
                const lineHeight = parseFloat(
                    getComputedStyle(element).lineHeight
                );

                const maxHeight = lineHeight * 2;

                if (element.scrollHeight > maxHeight) {
                    setShowButton(true);
                }
            }
        };

        verifyLine();
        window.addEventListener("resize", verifyLine);
        return () => window.removeEventListener("resize", verifyLine);
    }, []);

    const seeMoreLabel = getVocabularyTranslation("common.seeMore");

    return (
        <article>
            <header>
                <i className="fa-solid fa-square" data-tpl="icon"></i>
                <a target="_blank" href={url}>
                    <h5 className="mb-0">{name}</h5>
                </a>
            </header>
            <div
                className={`description ${
                    showButton && !showAll ? "truncate" : ""
                }`}
                ref={descriptionRef}
            >
                {description}
            </div>
            {showButton && !showAll && (
                <button
                    className="btn see-more"
                    onClick={() => setShowAll(!showAll)}
                >
                    {seeMoreLabel}
                </button>
            )}
        </article>
    );
};

export default Item;
