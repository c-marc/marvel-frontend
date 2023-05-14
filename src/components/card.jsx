import { getImgUrl } from "../utils/images";
import Favorite from "./favorite";
import { Link } from "react-router-dom";

const Card = ({ collection, item }) => {
  const { thumbnail, title, name, description } = item;
  // Comic or character ?
  const header = collection === "comics" ? title : name;
  const url =
    collection === "comics" ? `/comic/${item._id}` : `/character/${item._id}`;
  const relatedComics =
    collection === "characters" ? (
      <Link className="related" to={`/comics/${item._id}`}>
        Comics she/he/it appears in
      </Link>
    ) : null;

  const imgUrl = getImgUrl(thumbnail, {
    format: "standard",
    size: "medium",
  });

  return (
    <article className="card">
      <Favorite collection={collection} item={item} />

      <h3>
        <Link to={url}>{header}</Link>
      </h3>
      {relatedComics}
      <div className="columns">
        <img src={imgUrl} alt={header} />
        <p>{description}</p>
      </div>
    </article>
  );
};

export default Card;
