import axios from "axios";
import { createOptions } from "../utils/url";

const API_URL = "http://localhost:3000";

// Fetch multiple comics
export async function updateFavorite(token, collection, id, value) {
  const url = `${API_URL}/user/favorites/${collection}/${id}`;
  const options = createOptions(token);
  console.log("update", options);
  try {
    if (value) {
      console.log("Add to favorites", url, options);
      const results = await axios.post(url, {}, options);
      return results.data;
    } else {
      console.log("Remove from favorites", url, options);
      await axios.delete(url, options);
      return null;
    }
  } catch (error) {
    // TODO: catch better errors
    console.error(error.message);
  }
}
