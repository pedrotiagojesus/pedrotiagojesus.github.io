// CSS
import "./Experience.css";

const Item = ({ company, role, date, contentArr }) => {
    let descriptionHtml = [];

    contentArr.map((content, i) => {
        descriptionHtml.push(<li key={i}>{content}</li>);
    });

    return (
        <article data-tpl="item">
            <div data-tpl="header">
                <span data-tpl="time">{date}</span>
                <span data-tpl="company-name">{company}</span>
            </div>

            <h3 data-tpl="role">{role}</h3>

            <div data-tpl="description">
                <ul>{descriptionHtml}</ul>
            </div>
        </article>
    );
};

export default Item;
