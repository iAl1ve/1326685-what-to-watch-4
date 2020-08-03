import {extend} from "../../utils.js";
import {GENRE_DEFAULT, MAX_SHOW_MORE_FILMS} from "../../const.js";

const initialState = {
  currentGenre: GENRE_DEFAULT,
  countShowMovies: MAX_SHOW_MORE_FILMS,
};

const ActionType = {
  CHANGE_FILTER_BY_GENRE: `CHANGE_FILTER_BY_GENRE`,
  SET_СOUNT_SHOW_MOVIES: ` SET_СOUNT_SHOW_MOVIES`,
  SET_DEFAULT_СOUNT_SHOW_MOVIES: ` SET_DEFAULT_СOUNT_SHOW_MOVIES`,
  EXIT_PLAY_MOVIE: `EXIT_PLAY_MOVIE`,
};

const ActionCreator = {
  changeCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: genre,
  }),
  setCountShowMovies: () => ({
    type: ActionType.SET_СOUNT_SHOW_MOVIES,
    payload: MAX_SHOW_MORE_FILMS,
  }),
  setDefaultCountShowMovies: () => ({
    type: ActionType.SET_DEFAULT_СOUNT_SHOW_MOVIES,
    payload: MAX_SHOW_MORE_FILMS,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_FILTER_BY_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });
    case ActionType.SET_СOUNT_SHOW_MOVIES:
      return extend(state, {
        countShowMovies: state.countShowMovies + action.payload,
      });
    case ActionType.SET_DEFAULT_СOUNT_SHOW_MOVIES:
      return extend(state, {
        countShowMovies: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
