import { Link } from "react-router-dom";

// CSS
import "./Block.css";

// Components
import Light from "@components/BackgrounAnimation/Light/Light";

// Utils
import { useVocabularyText } from "@utils/vocabulary";
import Button from "@components/Button/Button";

const Block = () => {

    // Vocabulary
    const i18n = {
        title: useVocabularyText("sections.projectsPreview.title"),
        summary: useVocabularyText("sections.projectsPreview.summary"),
        cta: useVocabularyText("sections.projectsPreview.cta"),
    };

    return (
        <section id="block">
            <div className="block-list">
                <article>
                    <i className="fa-solid fa-pencil"></i>
                    <h2>{i18n.title}</h2>
                    <p>{i18n.summary}</p>
                    <Button as={Link} to="/project">
                        {i18n.cta}
                    </Button>
                    <div className="background">
                        <Light />
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Block;
