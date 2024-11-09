import { Link } from "react-router-dom";

// CSS
import "./Block.css";

// Contexts
import { useActivePage } from "../../contexts/ActivePageContext";

// I18N
import { getVocabulary } from "../../components/I18n/I18n";

// Components
import Stars from "../../components/BackgrounAnimation/Stars/Stars";
import Light from "../../components/BackgrounAnimation/Light/Light";

const Block = () => {
    return (
        <section id="block">
            <div className="block-list">
                <article>
                    <i className="fa-solid fa-layer-group"></i>
                    <h3>{getVocabulary("block.title2")}</h3>
                    <p>{getVocabulary("block.summary2")}</p>
                    <Link to="/stack" className="btn">
                        {getVocabulary("block.button2")}
                    </Link>
                    <div className="background">
                        <Stars />
                    </div>
                </article>
                <article>
                    <i className="fa-solid fa-pencil"></i>
                    <h3>{getVocabulary("block.title1")}</h3>
                    <p>{getVocabulary("block.summary1")}</p>
                    <Link to="/project" className="btn">
                        {getVocabulary("block.button1")}
                    </Link>
                    <div className="background">
                        <Light />
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Block;
