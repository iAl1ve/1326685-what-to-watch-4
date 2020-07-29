import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getFilms = (state) => {
  return state[NAME_SPACE].listMovies;
};

export const getPromoFilm = (state) => {
  return state[NAME_SPACE].promoFilm;
};

export const getGenres = (state) => {
  return state[NAME_SPACE].listGenres;
};

export const getReviews = (state) => {
  return state[NAME_SPACE].listReviews;
};

export const getStatusSend = (state) => {
  return state[NAME_SPACE].isStatusSend;
};

export const getIsFormDisabled = (state) => {
  return state[NAME_SPACE].isFormDisabled;
};
