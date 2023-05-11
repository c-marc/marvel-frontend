import { Form, useLoaderData } from "react-router-dom";
import { getCharacter } from "../services/data";

export async function loader({ params }) {
  const character = await getCharacter(params.characterId);
  return { character };
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
