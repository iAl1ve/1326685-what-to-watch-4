import {reducer, ActionType} from "./app-state.js";
import {GENRE_DEFAULT, MAX_SHOW_MORE_FILMS} from "../../const.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: GENRE_DEFAULT,
    countShowMovies: MAX_SHOW_MORE_FILMS,
  });
});

it(`Reducer should change the genre to a given value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    countShowMovies: MAX_SHOW_MORE_FILMS,
  }, {
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: `Drama`,
  })).toEqual({
    currentGenre: `Drama`,
    countShowMovies: MAX_SHOW_MORE_FILMS,
  });
});

it(`Reducer should change the count show movie to a given value x2`, () => {
  const count = MAX_SHOW_MORE_FILMS * 2;
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    countShowMovies: MAX_SHOW_MORE_FILMS,
  }, {
    type: ActionType.SET_СOUNT_SHOW_MOVIES,
    payload: MAX_SHOW_MORE_FILMS,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    countShowMovies: count,
  });
});

it(`Reducer should set default value the count show movies`, () => {
  const count = MAX_SHOW_MORE_FILMS * 2;
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    countShowMovies: count,
  }, {
    type: ActionType.SET_DEFAULT_СOUNT_SHOW_MOVIES,
    payload: MAX_SHOW_MORE_FILMS,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    countShowMovies: MAX_SHOW_MORE_FILMS,
  });
});
