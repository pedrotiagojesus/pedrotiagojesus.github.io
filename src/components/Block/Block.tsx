import { Link } from "react-router-dom";

// CSS
import "./Block.css";

// Components
import Light from "@components/BackgrounAnimation/Light/Light";

// Utils
import { vocabulary } from "@utils/vocabulary";
import Button from "@components/Button/Button";

const Block = () => {

    // Vocabulary
    const i18n = {
        title: vocabulary("sections.projectsPreview.title"),
        summary: vocabulary("sections.projectsPreview.summary"),
        cta: vocabulary("sections.projectsPreview.cta"),
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
