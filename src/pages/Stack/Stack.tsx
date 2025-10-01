// CSS
import "./Stack.css";

// Hooks
import { getContent, getVocabulary } from "@hooks/useTranslationHelpers";

// Utils
import { slugify } from "@utils/Text";

type Skill = {
    name: string;
    percentage: number;
};

const Stack = () => {
    // Skills
    const skillArr = getContent("skill") as Skill[];

    return (
        <>
            <section id="skill-content">
                <h1 className="page-title">{getVocabulary("stack.title")}</h1>
                <p className="page-summary">{getVocabulary("stack.summary")}</p>
                <div className="skill-list">
                    {skillArr.map((skill, index) => (
                        <div className="item" key={index}>
                            <div className="image-wrapper">
                                <img
                                    src={`https://cdn.simpleicons.org/${slugify(
                                        skill.name
                                    )}`}
                                    alt={slugify(skill.name)}
                                />
                            </div>
                            <p>{skill.name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Stack;
