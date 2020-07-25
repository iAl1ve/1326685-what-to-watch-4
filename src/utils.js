import {MONTH_NAMES, Rating} from "./const.js";

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

export const formatTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};

export const getRatingLevel = (rating) => {
  let ratingLevel = ``;

  switch (true) {
    case rating >= 0 && rating < 3:
      ratingLevel = Rating.BAD;
      break;
    case rating >= 3 && rating < 5:
      ratingLevel = Rating.NORMAL;
      break;
    case rating >= 5 && rating < 8:
      ratingLevel = Rating.GOOD;
      break;
    case rating >= 8 && rating < 10:
      ratingLevel = Rating.VERY_GOOD;
      break;
    case rating === 10:
      ratingLevel = Rating.AWESOME;
      break;
  }
  return ratingLevel;
};
