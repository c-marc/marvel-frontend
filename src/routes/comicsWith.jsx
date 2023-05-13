import { Link, useLoaderData, useNavigation } from "react-router-dom";

import Favorite from "../components/favorite";

import { getCharacter, getComicsWith } from "../services/data";
import { updateFavorite } from "../services/favorite";

export const loader =
  (token) =>
  async ({ params }) => {
    const { characterId } = params;
    const character = await getComicsWith(token, characterId);
    console.log("Fetched character and related comics");

    return { character };
  };

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateFavorite(
    formData.get("token"),
    formData.get("collection"),
    formData.get("itemId"),
    formData.get("favorite") === "true"
  );
}

export default function ComicsWith() {
  const navigation = useNavigation();
  const { character } = useLoaderData();
  console.log(character);
  return (
    <>
      <h1>Comics with {character.name}</h1>
      <Favorite collection="characters" item={character} />
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        {character.comics.map((comic) => {
          return (
            <div key={comic._id}>
              <Link to={`/comic/${comic._id}`}>{comic.title}</Link>
              <Favorite collection="comics" item={comic} />
            </div>
          );
        })}
      </div>
    </>
  );
}
