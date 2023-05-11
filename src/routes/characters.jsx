import { useEffect } from "react";

import {
  Link,
  useLoaderData,
  useNavigation,
  useSubmit,
  Form,
} from "react-router-dom";

import { getCharacters } from "../services/data";

export async function loader({ request }) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  const characters = await getCharacters(name);
  console.log(characters);
  return { characters, name };
}

export default function Characters() {
  const { characters, name } = useLoaderData();
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
        {characters.results.map((character) => {
          return (
            <div key={character._id}>
              <Link to={`/comics/${character._id}`}>{character.name}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
