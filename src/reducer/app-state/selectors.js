import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.APP_STATE;

export const getCurrentGenre = (state) => {
  return state[NAME_SPACE].currentGenre;
};

export const getActiveFilm = (state) => {
  return state[NAME_SPACE].activeFilm;
};

export const getIsPlaying = (state) => {
  return state[NAME_SPACE].isPlaying;
};

export const getСountShowMovies = (state) => {
  return state[NAME_SPACE].countShowMovies;
};
