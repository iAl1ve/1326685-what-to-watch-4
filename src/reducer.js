import {extend} from "./utils.js";
import {GENRE_DEFAULT, MAX_COUNT_GENRES, MAX_SHOW_MORE_FILMS} from "./const.js";
import listMovies from "./mock/films.js";
import listReviews from "./mock/reviews.js";

const listGenres = [GENRE_DEFAULT, ...new Set(listMovies.map((film) => film.genre).slice(0, MAX_COUNT_GENRES))];

const initialState = {
  currentGenre: GENRE_DEFAULT,
  activeFilm: null,
  listMovies,
  listReviews,
  listGenres,
  countShowMovies: MAX_SHOW_MORE_FILMS,
  isPlaying: false,
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE: `CHANGE_FILTER_BY_GENRE`,
  SET_ACTIVE_MOVIE: `SET_ACTIVE_MOVIE`,
  SET_СOUNT_SHOW_MOVIES: ` SET_СOUNT_SHOW_MOVIES`,
  SET_DEFAULT_СOUNT_SHOW_MOVIES: ` SET_DEFAULT_СOUNT_SHOW_MOVIES`,
  PLAY_ACTIVE_MOVIE: `PLAY_ACTIVE_MOVIE`,
  EXIT_PLAY_MOVIE: `EXIT_PLAY_MOVIE`,
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
  setCountShowMovies: () => ({
    type: ActionType.SET_СOUNT_SHOW_MOVIES,
    payload: MAX_SHOW_MORE_FILMS,
  }),
  setDefaultCountShowMovies: () => ({
    type: ActionType.SET_DEFAULT_СOUNT_SHOW_MOVIES,
    payload: MAX_SHOW_MORE_FILMS,
  }),
  setPlayActiveMovie: () => ({
    type: ActionType.PLAY_ACTIVE_MOVIE,
    payload: true,
  }),
  setExitPlayMovie: () => ({
    type: ActionType.EXIT_PLAY_MOVIE,
    payload: false,
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
    case ActionType.SET_СOUNT_SHOW_MOVIES:
      return extend(state, {
        countShowMovies: state.countShowMovies + action.payload,
      });
    case ActionType.SET_DEFAULT_СOUNT_SHOW_MOVIES:
      return extend(state, {
        countShowMovies: action.payload,
      });
    case ActionType.PLAY_ACTIVE_MOVIE:
      return extend(state, {
        isPlaying: action.payload,
      });
    case ActionType.EXIT_PLAY_MOVIE:
      return extend(state, {
        isPlaying: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
