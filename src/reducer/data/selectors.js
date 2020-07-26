import NameSpace from "../name-space.js";

export const getFilms = (state) => {
  return state[NameSpace.DATA].listMovies;
};

export const getPromoFilm = (state) => {
  return state[NameSpace.DATA].promoFilm;
};

export const getGenres = (state) => {
  return state[NameSpace.DATA].listGenres;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].listReviews;
};
