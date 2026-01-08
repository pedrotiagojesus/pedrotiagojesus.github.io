// CSS
import "../Card.css";
import "./CardSkeleton.css";

// Types
import { CardSkeleton as CardSkeletonProps } from "@typesLocal/index";

const CardSkeleton = ({ title, description, image }: CardSkeletonProps) => {
    return (
        <div className="card skeleton">
            {image && <div className="card-image-wrapper"></div>}
            <div className="card-body">
                {title && <h3 className="card-title"></h3>}
                {description && <p className="card-description"></p>}
            </div>
        </div>
    );
};

export default CardSkeleton;
