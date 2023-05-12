import { Link, useLoaderData, useNavigation } from "react-router-dom";

import Favorite from "../components/favorite";

import { getCharacter, getComicsWith } from "../services/data";
import {
  getFavoriteCharacters,
  getFavoriteComics,
  updateFavoriteCharacters,
  updateFavoriteComics,
} from "../services/favorite";

export async function loader({ params }) {
  const { characterId } = params;
  const character = await getComicsWith(characterId);
  console.log("Fetched character and related comics");

  // Add fav key to character
  const favoriteCharacters = getFavoriteCharacters();
  character.favorite = favoriteCharacters.has(character._id);

  // Add fav key tom comics
  const favoriteComics = getFavoriteComics();
  // Merge
  character.comics.forEach((comic) => {
    comic.favorite = favoriteComics.has(comic._id);
  });

  //console.log(character); //ok
  return { character };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  updateFavoriteCharacters(params.characterId, {
    favorite: formData.get("favorite") === "true",
  });

  updateFavoriteComics(formData.get("itemId"), {
    favorite: formData.get("favorite") === "true",
  });

  return true;
}

export default function ComicsWith() {
  const navigation = useNavigation();
  const { character } = useLoaderData();
  console.log(character);
  return (
    <>
      <h1>Comics with {character.name}</h1>
      <Favorite item={character} />
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        {character.comics.map((comic) => {
          return (
            <div key={comic._id}>
              <Link to={`/comic/${comic._id}`}>{comic.title}</Link>
              <Favorite item={comic} />
            </div>
          );
        })}
      </div>
    </>
  );
}
