import { getImgUrl } from "../utils/images";
import Favorite from "./favorite";

const Card = ({ collection, item }) => {
  const { thumbnail, title, name, description } = item;
  // Comic or character ?
  const header = collection === "comics" ? title : name;

  const imgUrl = getImgUrl(thumbnail, {
    format: "portrait",
    format: "standard",

    size: "medium",
  });

  return (
    <div className="card">
      <img src={imgUrl} alt={header} />

      <div className="card-text">
        <h3>
          {header}
          <Favorite collection={collection} item={item} />
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
