import { useLoaderData, useNavigation } from "react-router-dom";

import Card from "../components/card";
import Loading from "../components/loading";

import { getComicsWith } from "../services/data";
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

      {navigation.state === "loading" ? (
        <Loading message="Fetching comics..." />
      ) : (
        <div
          className={
            navigation.state === "loading" ? "loading results" : "results"
          }
        >
          {character.comics.map((comic) => {
            return (
              // <div key={comic._id}>
              //   <Link to={`/comic/${comic._id}`}>{comic.title}</Link>
              //   <Favorite collection="comics" item={comic} />
              // </div>

              <Card key={comic._id} collection="comics" item={comic} />
            );
          })}
        </div>
      )}
    </>
  );
}
