import "./Language.css";

const Item = ({ name, level }) => {
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
            <div key={index} data-tpl={index > level ? "empty" : "full"}></div>
        );
    }

    console.log(levelName[level]);

    return (
        <li title={levelName[level]}>
            <div data-tpl="name">{name}</div>
            <div data-tpl="indicator">{levelHtml}</div>
        </li>
    );
};

export default Item;
