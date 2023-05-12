import { Form, useLoaderData } from "react-router-dom";
import { getCharacter } from "../services/data";
import {
  getFavoriteCharacters,
  updateFavoriteCharacters,
} from "../services/favorite";

export async function loader({ params }) {
  const character = await getCharacter(params.characterId);

  // Add fav key to character
  const favoriteCharacters = getFavoriteCharacters();
  character.favorite = favoriteCharacters.has(character._id);

  return { character };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateFavoriteCharacters(params.characterId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Character() {
  const { character } = useLoaderData();

  return (
    <div id="character">
      <h1>
        {character.name}

        <Favorite character={character} />
      </h1>

      <div>{character.description}</div>
    </div>
  );
}

const Favorite = ({ character }) => {
  let favorite = character.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
};
