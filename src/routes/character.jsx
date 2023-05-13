import { useLoaderData } from "react-router-dom";
import Favorite from "../components/favorite";

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

  return (
    <div id="character">
      <h1>
        {character.name}

        <Favorite collectionr="characters" item={character} />
      </h1>

      <div>{character.description}</div>
    </div>
  );
}

// const Favorite = ({ character }) => {
//   let favorite = character.favorite;
//   return (
//     <Form method="post">
//       <button
//         name="favorite"
//         value={favorite ? "false" : "true"}
//         aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </Form>
//   );
// };
