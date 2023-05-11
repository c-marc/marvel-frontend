export const getFavoriteComics = () => {
  const favoriteComics = new Set(JSON.parse(localStorage.getItem("favComics")));
  console.log("read", favoriteComics);
  return favoriteComics;
};

export const setFavoriteComics = (favSet) => {
  // Warning ! Stringifying Set does NOT behave as expected
  // console.log(JSON.stringify([...favSet]));
  localStorage.setItem("favComics", JSON.stringify([...favSet]));
};

export const updateFavoriteComics = (comicId, { favorite }) => {
  const favoriteComics = getFavoriteComics();

  if (favorite) {
    favoriteComics.add(comicId);
  } else {
    favoriteComics.delete(comicId);
  }
  setFavoriteComics(favoriteComics);

  // return for action
  return favorite;
};
