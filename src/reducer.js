import {extend} from "./utils.js";
import {GENRE_DEFAULT, MAX_COUNT_GENRES} from "./const.js";
import listMovies from "./mock/films.js";
import listReviews from "./mock/reviews.js";

const listGenres = [GENRE_DEFAULT, ...new Set(listMovies.map((film) => film.genre).slice(0, MAX_COUNT_GENRES))];

const initialState = {
  currentGenre: GENRE_DEFAULT,
  activeFilm: null,
  listMovies,
  listReviews,
  listGenres,
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE: `CHANGE_FILTER_BY_GENRE`,
  SET_ACTIVE_MOVIE: `SET_ACTIVE_MOVIE`,
};

const ActionCreator = {
  changeCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: genre,
  }),
  setActiveMovie: (movie) => ({
    type: ActionType.SET_ACTIVE_MOVIE,
    payload: movie,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_FILTER_BY_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });
    case ActionType.SET_ACTIVE_MOVIE:
      return extend(state, {
        activeFilm: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
