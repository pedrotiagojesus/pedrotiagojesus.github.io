import { useState, useRef, useEffect } from "react";

// CSS
import "./Project.css";

const Item = ({ name, description, url }) => {
    const [showAll, setShowAll] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const descriptionRef = useRef(null);

    useEffect(() => {
        const verifyLine = () => {
            const element = descriptionRef.current;
            if (element) {
                const lineHeight = parseFloat(
                    getComputedStyle(element).lineHeight
                );

                const maxHeight = lineHeight * 3;

                if (element.scrollHeight > maxHeight) {
                    setShowButton(true);
                }
            }
        };

        verifyLine();
        window.addEventListener("resize", verifyLine);
        return () => window.removeEventListener("resize", verifyLine);
    }, []);

    return (
        <div className="item">
            <div className="heading">
                <span className="fa-solid fa-square" data-tpl="icon"></span>
                <a target="_blank" href={url}>
                    {name}
                </a>
            </div>
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
                    ver mais
                </button>
            )}
        </div>
    );
};

export default Item;
