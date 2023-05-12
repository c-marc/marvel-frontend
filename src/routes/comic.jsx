import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getComic } from "../services/data";
import Favorite from "../components/favorite";
import { getFavoriteComics, updateFavoriteComics } from "../services/favorite";

export async function loader({ params }) {
  const comic = await getComic(params.comicId);
  const favoriteComics = getFavoriteComics();
  comic.favorite = favoriteComics.has(comic._id);
  return { comic };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateFavoriteComics(params.comicId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Comic() {
  const { comic } = useLoaderData();

  return (
    <div id="comic">
      <h1>
        {comic.title}

        <Favorite item={comic} />
      </h1>

      <div>{comic.description}</div>
    </div>
  );
}

// const Favorite = ({ comic }) => {
//   // Same as regular mutation but it's not a navigation--the URL doesn't change, the history stack is unaffected.
//   const fetcher = useFetcher();

//   let favorite = comic.favorite;
//   // Optimistic UI
//   // If it's being submitted, formData exists and we can anticipate
//   if (fetcher.formData) {
//     favorite = fetcher.formData.get("favorite") === "true";
//   }

//   return (
//     <fetcher.Form method="post">
//       <button
//         name="favorite"
//         value={favorite ? "false" : "true"}
//         aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </fetcher.Form>
//   );
// };
