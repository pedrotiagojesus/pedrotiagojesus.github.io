// CSS
import "./Experience.css";

interface Props {
    company: string;
    role: string;
    dateStart: number;
    dateEnd: number;
    contentArr: string[];
}

const Item = ({ company, role, dateStart, dateEnd, contentArr }: Props) => {
    let descriptionHtml = new Array();

    contentArr.map((content, i) => {
        descriptionHtml.push(<li key={i}>{content}</li>);
    });

    return (
        <article>
            <header>
                <h3 data-tpl="role">{role}</h3>
                <div className="d-flex justify-content-between">
                    <div className="time">
                        <time dateTime={dateStart.toString()}>{dateStart}</time>{" "}
                        – <time dateTime={dateEnd.toString()}>{dateEnd}</time>
                    </div>
                    <span className="company-name">{company}</span>
                </div>
            </header>
            <ul>{descriptionHtml}</ul>
        </article>
    );
};

export default Item;
