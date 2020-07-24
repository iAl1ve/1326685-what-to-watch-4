import NameSpace from "../name-space.js";

export const getCurrentGenre = (state) => {
  return state[NameSpace.APP_STATE].currentGenre;
};

export const getActiveFilm = (state) => {
  return state[NameSpace.APP_STATE].activeFilm;
};

export const getIsPlaying = (state) => {
  return state[NameSpace.APP_STATE].isPlaying;
};

export const getСountShowMovies = (state) => {
  return state[NameSpace.APP_STATE].countShowMovies;
};
