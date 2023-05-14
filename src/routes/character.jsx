import { useLoaderData, Link, useNavigation } from "react-router-dom";
import Favorite from "../components/favorite";
import Loading from "../components/loading";

import { getImgUrl } from "../utils/images";
import { getCharacter } from "../services/data";
import { updateFavorite } from "../services/favorite";

export const loader =
  (token) =>
  async ({ params }) => {
    const character = await getCharacter(token, params.characterId);
    return { character };
  };

export async function action({ request }) {
  let formData = await request.formData();
  return updateFavorite(
    formData.get("token"),
    formData.get("collection"),
    formData.get("itemId"),
    formData.get("favorite") === "true"
  );
}

export default function Character() {
  const { character } = useLoaderData();
  const navigation = useNavigation();

  const imgUrl = getImgUrl(character.thumbnail, {
    format: "standard",
    size: "fantastic",
  });

  return (
    <>
      {navigation.state === "loading" ? (
        <Loading message="Fetching character..." />
      ) : (
        <div className="result">
          <div className="title">
            <Favorite collection="characters" item={character} />
            <div>
              <h1>{character.name}</h1>
              <Link className="related" to={`/comics/${character._id}`}>
                Comics she/he/it appears in
              </Link>
            </div>
          </div>

          <div className="columns">
            <img src={imgUrl} alt={character.name} />
            <div className="description">{character.description}</div>
          </div>
        </div>
      )}
    </>
  );
}
