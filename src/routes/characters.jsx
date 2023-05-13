import { useEffect } from "react";

import { Link, useLoaderData, useNavigation } from "react-router-dom";

import Count from "../components/count";
import Page from "../components/page";
import Limit from "../components/limit";
import Search from "../components/search";
import Favorite from "../components/favorite";

import { getCharacters } from "../services/data";
import { updateFavorite } from "../services/favorite";

export const loader =
  (token) =>
  async ({ request }) => {
    // Read current searchParams
    const url = new URL(request.url);
    const skip = Number(url.searchParams.get("skip")) || 0;
    const limit = Number(url.searchParams.get("limit")) || 100;
    const name = url.searchParams.get("name") || "";

    // Fetch data
    const characters = await getCharacters(token, { skip, limit, name });

    return { characters, skip, limit, name };
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

export default function Characters() {
  const { characters, skip, limit, name } = useLoaderData();
  const navigation = useNavigation();

  // Watch for ongoing change to display spinner
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("name");

  // Solve the go back nav because we don't control the url
  useEffect(() => {
    document.getElementById("name").value = name;
  }, [name]);

  return (
    <>
      <h1>Characters</h1>

      <Search params={{ limit, name }} searching={searching} />

      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Count count={characters.count} />

        <Limit params={{ skip, limit, name }} />

        <Page count={characters.count} params={{ skip, limit, name }} />

        {characters.results.map((character) => {
          return (
            <div key={character._id}>
              <Link to={`/character/${character._id}`}>{character.name}</Link>
              <Favorite collection="characters" item={character} />
              <Link to={`/comics/${character._id}`}>
                Comics she/he appears in
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
