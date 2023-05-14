import { useLoaderData, useNavigation } from "react-router-dom";
import { getComic } from "../services/data";
import Favorite from "../components/favorite";
import { updateFavorite } from "../services/favorite";
import { getImgUrl } from "../utils/images";
import Loading from "../components/loading";

export const loader =
  (token) =>
  async ({ params }) => {
    console.log("loader token", token);
    const comic = await getComic(token, params.comicId);
    console.log(comic);
    return { comic };
  };

export async function action({ request }) {
  let formData = await request.formData();
  console.log("action", formData.get("token"));
  return updateFavorite(
    formData.get("token"),
    formData.get("collection"),
    formData.get("itemId"),
    formData.get("favorite") === "true"
  );
}

export default function Comic() {
  const { comic } = useLoaderData();
  const navigation = useNavigation();

  const imgUrl = getImgUrl(comic.thumbnail, {
    format: "standard",
    size: "xlarge",
  });

  return (
    <>
      {navigation.state === "loading" ? (
        <Loading message="Fetching comic..." />
      ) : (
        <div className="result">
          <div className="title">
            <Favorite collection="comics" item={comic} />
            <h1>{comic.title}</h1>
          </div>

          <div className="columns">
            <img src={imgUrl} alt={comic.title} />
            <div className="description">{comic.description}</div>
          </div>
        </div>
      )}
    </>
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
