// This was the localStorage approach

// favComics and favCharcters stored as arrays and used as sets

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

// Same for characters
// There's place for refactoring here
// But separation might be easier for debugging or to implement external DB
export const getFavoriteCharacters = () => {
  const favoriteCharacters = new Set(
    JSON.parse(localStorage.getItem("favCharacters"))
  );
  return favoriteCharacters;
};

export const setFavoriteCharacters = (favSet) => {
  localStorage.setItem("favCharacters", JSON.stringify([...favSet]));
};

export const updateFavoriteCharacters = (characterId, { favorite }) => {
  const favoriteCharacters = getFavoriteCharacters();

  if (favorite) {
    favoriteCharacters.add(characterId);
  } else {
    favoriteCharacters.delete(characterId);
  }
  setFavoriteCharacters(favoriteCharacters);

  // return for action
  return favorite;
};

// This might end up in the backend
//

// Augment Marvel data with favorite data
// Comics
export const addFavoriteToComic = (comic) => {
  const favorites = getFavoriteComics();
  comic.favorite = favorites.has(comic._id);
  return comic;
};

export const addFavoriteToComics = (comics) => {
  const favorites = getFavoriteComics();
  comics.forEach((comic) => {
    comic.favorite = favorites.has(comic._id);
  });
  return comics;
};

// Augment Marvel data with favorite data
// Characters
export const addFavoriteToCharacter = (character) => {
  const favorites = getFavoriteCharacters();
  character.favorite = favorites.has(character._id);
  return character;
};

export const addFavoriteToCharacters = (characters) => {
  const favorites = getFavoriteCharacters();
  characters.forEach((character) => {
    character.favorite = favorites.has(character._id);
  });
  return characters;
};
