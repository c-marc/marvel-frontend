import { useEffect } from "react";

import { Link, useLoaderData, useNavigation } from "react-router-dom";

import Favorite from "../components/favorite";
import { getComics } from "../services/data";
import { updateFavorite } from "../services/favorite";
import Page from "../components/page";
import Count from "../components/count";
import Limit from "../components/limit";
import Search from "../components/search";

export const loader =
  (token) =>
  async ({ request }) => {
    // Read current searchParams
    const url = new URL(request.url);
    const skip = Number(url.searchParams.get("skip")) || 0;
    const limit = Number(url.searchParams.get("limit")) || 100;
    const title = url.searchParams.get("title") || "";

    // Fetch data
    const comics = await getComics(token, { skip, limit, title });

    return { comics, skip, limit, title };
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

export default function Comics() {
  const { comics, skip, limit, title } = useLoaderData();
  const navigation = useNavigation();

  // Watch for ongoing changes to display spinner
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("title");

  // We don't control the url, so inputs need to watch for changes
  useEffect(() => {
    document.getElementById("limit").value = limit;
    document.getElementById("title").value = title;
  }, [limit, title]);

  return (
    <>
      <h1>Comics</h1>

      <Search params={{ limit, title }} searching={searching} />

      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Count count={comics.count} />

        <Limit params={{ skip, limit, title }} />

        <Page count={comics.count} params={{ skip, limit, title }} />

        {comics.results.map((comic) => {
          return (
            <div key={comic._id}>
              <Link to={`/comic/${comic._id}`}>{comic.title}</Link>
              <Favorite collection="comics" item={comic} />
            </div>
          );
        })}
      </div>
    </>
  );
}
