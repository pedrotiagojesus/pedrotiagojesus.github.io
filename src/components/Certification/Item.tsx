// CSS
import "./Certification.css";

interface Props {
    name: string;
    description: string;
    date: string;
    url: string;
}

const Item = ({ name, description, date, url }: Props) => {
    return (
        <article>
            <header>
                <i className="fa-solid fa-square icon"></i>
                <a target="_blank" href={url}>
                    {name}
                </a>
            </header>
            <time className="small" dateTime={date}>
                {date}
            </time>
            <div className="description">{description}</div>
        </article>
    );
};

export default Item;
