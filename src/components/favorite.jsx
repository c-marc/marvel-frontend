import { useFetcher } from "react-router-dom";
import { useAuth } from "./authProvider";

const Favorite = ({ collection, item }) => {
  // Same as regular mutation but it's not a navigation--the URL doesn't change, the history stack is unaffected.
  const fetcher = useFetcher();
  const { user } = useAuth();

  let favorite = item.favorite;
  // If anonymous visitor, favorite is undefined
  if (favorite === undefined) {
    return <button disabled>NA</button>;
  }

  // Optimistic UI
  // If it's being submitted, formData exists and we can anticipate
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
      <input hidden readOnly name="token" value={user.token} />
      <input hidden readOnly name="collection" value={collection} />
      <input hidden readOnly name="itemId" value={item._id} />
    </fetcher.Form>
  );
};

export default Favorite;
