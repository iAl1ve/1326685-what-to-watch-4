import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.APP_STATE;

export const getCurrentGenre = (state) => {
  return state[NAME_SPACE].currentGenre;
};

export const getСountShowMovies = (state) => {
  return state[NAME_SPACE].countShowMovies;
};
