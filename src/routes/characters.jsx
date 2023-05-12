import { useEffect } from "react";

import {
  Link,
  useLoaderData,
  useNavigation,
  useSubmit,
  Form,
} from "react-router-dom";

import Page from "../components/page";

import { getCharacters } from "../services/data";
import { getFavoriteCharacters } from "../services/favorite";
import Favorite from "../components/favorite";
import { updateFavoriteCharacters } from "../services/favorite";

export async function loader({ request }) {
  // Read current searchParams
  const url = new URL(request.url);
  const skip = Number(url.searchParams.get("skip")) || 0;
  const limit = Number(url.searchParams.get("limit")) || 100;
  const name = url.searchParams.get("name") || "";

  // Fetch data
  const characters = await getCharacters({ skip, limit, name });

  // This is moving to backend
  // Get favorites
  // const favoriteCharacters = getFavoriteCharacters();
  // Merge
  // characters.results.forEach((character) => {
  //   character.favorite = favoriteCharacters.has(character._id);
  // });

  return { characters, skip, limit, name };
}

export async function action({ request }) {
  let formData = await request.formData();
  console.log(formData.get("itemId"));
  return updateFavoriteCharacters(formData.get("itemId"), {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Characters() {
  const { characters, skip, limit, name } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

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

      <Form id="search-form" role="search">
        <input
          id="name"
          className={searching ? "loading" : ""}
          aria-label="Search characters"
          placeholder="Search"
          type="search"
          name="name"
          defaultValue={name}
          onChange={(event) => {
            // replace the current entry in the history stack with the next page
            const isFirstSearch = name == null;
            submit(event.currentTarget.form, {
              replace: !isFirstSearch,
            });
          }}
        />
        <div id="search-spinner" aria-hidden hidden={true} />
        <div className="sr-only" aria-live="polite"></div>
      </Form>

      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <p>{characters.count} results</p>
        <Page
          route="/characters"
          count={characters.count}
          params={{ skip, limit, name }}
        />
        {characters.results.map((character) => {
          return (
            <div key={character._id}>
              <Link to={`/character/${character._id}`}>{character.name}</Link>
              <Favorite item={character} />
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
