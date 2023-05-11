import { useEffect } from "react";

import {
  Link,
  useLoaderData,
  useNavigation,
  useSubmit,
  Form,
} from "react-router-dom";

import { getComics } from "../services/data";

export async function loader({ request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "";
  const comics = await getComics(title);
  console.log(comics);
  return { comics, title };
}

export default function Comics() {
  const { comics, title } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("title");

  // Solve the go back nav because we don't control the url
  useEffect(() => {
    document.getElementById("title").value = title;
  }, [title]);

  return (
    <>
      <h1>Comics</h1>

      <Form id="search-form" role="search">
        <input
          id="title"
          className={searching ? "loading" : ""}
          aria-label="Search comics"
          placeholder="Search"
          type="search"
          name="title"
          defaultValue={title}
          onChange={(event) => {
            // replace the current entry in the history stack with the next page
            const isFirstSearch = title == null;
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
        <p>{comics.count} results</p>
        {comics.results.map((comic) => {
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
