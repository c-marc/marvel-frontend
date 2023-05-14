import { Link, useLoaderData, useNavigation } from "react-router-dom";

import { getComics, getCharacters } from "../services/data";
import Favorite from "../components/favorite";
import { updateFavorite } from "../services/favorite";
import Count from "../components/count";
import Card from "../components/card";
import Loading from "../components/loading";

export const loader = (token) => async () => {
  // Fetch data
  // Import: getX expect second argument (TODO: give default?)
  let comics = await getComics(token, {});
  comics.results = comics.results.filter((comic) => comic.favorite);
  comics.count = comics.results.length;

  let characters = await getCharacters(token, {});
  characters.results = characters.results.filter(
    (character) => character.favorite
  );
  characters.count = characters.results.length;

  return { comics, characters };
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

export default function Favorites() {
  const { comics, characters } = useLoaderData();
  const navigation = useNavigation();

  return (
    <div id="favorites">
      <h1>Favorites</h1>

      {navigation.state === "loading" ? (
        <Loading message="Fetching favorites..." />
      ) : (
        <div className={navigation.state === "loading" ? "loading" : ""}>
          <section id="comics">
            <h2>Your favorite comics</h2>
            <Count count={comics.count} />

            <div className="results">
              {comics.results.map((comic) => {
                return (
                  // <div key={comic._id}>
                  //   <Link to={`/comic/${comic._id}`}>{comic.title}</Link>
                  //   <Favorite collection="comics" item={comic} />
                  // </div>
                  <Card key={comic._id} collection="comics" item={comic} />
                );
              })}
            </div>
          </section>

          <section id="characters">
            <h2>Your favorite characters</h2>
            <Count count={characters.count} />

            <div className="results">
              {characters.results.map((character) => {
                return (
                  // <div key={character._id}>
                  //   <Link to={`/character/${character._id}`}>
                  //     {character.name}
                  //   </Link>
                  //   <Favorite collection="characters" item={character} />
                  //   <Link to={`/comics/${character._id}`}>
                  //     Comics she/he appears in
                  //   </Link>
                  // </div>
                  <Card
                    key={character._id}
                    collection="characters"
                    item={character}
                  />
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
