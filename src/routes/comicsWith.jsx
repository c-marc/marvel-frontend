import { Link, useLoaderData, useNavigation } from "react-router-dom";

import { getCharacter, getComicsWith } from "../services/data";

export async function loader({ params }) {
  const { characterId } = params;
  const character = await getComicsWith(characterId);
  console.log("Fetched character and related comics");
  return { character };
}

export default function ComicsWith() {
  const navigation = useNavigation();
  const { character } = useLoaderData();
  console.log(character);
  return (
    <>
      <h1>Comics with {character.name}</h1>

      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        {character.comics.map((comic) => {
          return (
            <div key={comic._id}>
              <Link to={`/comic/${comic._id}`}>{comic.title}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
