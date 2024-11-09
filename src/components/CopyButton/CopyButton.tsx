// CSS
import "./CopyButton.css";

import { useEffect, useState } from "react";

interface Props {
    value: string;
    className: string;
    text: string;
}

const CopyButton = ({ value, className, text }: Props) => {
    const [buttonText, setButtonText] = useState<string>(text);

    useEffect(() => {
        setButtonText(text);
    }, [text]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setButtonText("Copied");

            setTimeout(() => setButtonText(text), 2000);
        } catch (error) {
            console.error("Failed to copy the value:", error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={`btn ${className}`}
        >
            <i className="fa-regular fa-copy"></i>
            {buttonText}
        </button>
    );
};

export default CopyButton;
