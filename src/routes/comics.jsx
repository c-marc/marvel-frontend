import { useEffect } from "react";

import {
  Link,
  useLoaderData,
  useNavigation,
  useSubmit,
  Form,
} from "react-router-dom";

import Favorite from "../components/favorite";
import { getComics } from "../services/data";
import { getFavoriteComics, updateFavoriteComics } from "../services/favorite";
import Page from "../components/page";

export async function loader({ request }) {
  // Read current searchParams
  const url = new URL(request.url);
  const skip = Number(url.searchParams.get("skip")) || 0;
  const limit = Number(url.searchParams.get("limit")) || 100;
  const title = url.searchParams.get("title") || "";
  // console.log(page, limit, title);

  // Fetch data
  const comics = await getComics({ skip, limit, title });

  // This is moving to backend
  // Add fav key tom comics
  // const favoriteComics = getFavoriteComics();
  // Merge
  // comics.results.forEach((comic) => {
  //   comic.favorite = favoriteComics.has(comic._id);
  // });

  return { comics, skip, limit, title };
}

export async function action({ request }) {
  let formData = await request.formData();
  return updateFavoriteComics(formData.get("itemId"), {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Comics() {
  const { comics, skip, limit, title } = useLoaderData();
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
        <Page
          route="/comics"
          count={comics.count}
          params={{ skip, limit, title }}
        />
        {comics.results.map((comic) => {
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
