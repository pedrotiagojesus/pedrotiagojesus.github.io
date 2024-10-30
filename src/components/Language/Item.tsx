import "./Language.css";

interface Props {
    name: string;
    level: number;
}

const Item = ({ name, level }: Props) => {
    let levelHtml = [];

    const levelName = [
        "A1 - Beginner",
        "A2 - Elementary",
        "B1 - Intermediate",
        "B2 - Upper-Intermediate",
        "C1 - Advanced",
        "C2 - Proficiency",
        "Native",
    ];

    for (let index = 0; index < 7; index++) {
        levelHtml.push(
            <div key={index} className={index > level ? "empty" : "full"}></div>
        );
    }

    return (
        <li title={levelName[level]}>
            <div className="name">{name}</div>
            <div className="indicator">{levelHtml}</div>
        </li>
    );
};

export default Item;
