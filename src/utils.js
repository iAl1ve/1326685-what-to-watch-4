import {MONTH_NAMES} from "./const.js";

export const formatDate = (date) => {
  date = new Date(date);
  return `${MONTH_NAMES[date.getMonth()]}
    ${date.getDate()},
    ${date.getFullYear()}`;
};

export const extend = (ob1, ob2) => {
  return Object.assign({}, ob1, ob2);
};

export const getSimilarGenreFilms = (listMovies, genre, title) => {
  return listMovies.filter((film) => film.genre === genre && film.title !== title);
};
