import {reducer, ActionType} from "./reducer.js";
import {ListMovies, ListReviews, listGenres} from "./mock/testing.js";
import {GENRE_DEFAULT, MAX_SHOW_MORE_FILMS} from "./const.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: MAX_SHOW_MORE_FILMS,
    isPlaying: false,
  });
});

it(`Reducer should change the genre to a given value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: MAX_SHOW_MORE_FILMS,
    isPlaying: false,
  }, {
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: `Drama`,
  })).toEqual({
    currentGenre: `Drama`,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: MAX_SHOW_MORE_FILMS,
    isPlaying: false,
  });
});

it(`Reducer should change the movie to a given value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: MAX_SHOW_MORE_FILMS,
    isPlaying: false,
  }, {
    type: ActionType.SET_ACTIVE_MOVIE,
    payload: ListMovies[0],
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: ListMovies[0],
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: MAX_SHOW_MORE_FILMS,
    isPlaying: false,
  });
});

it(`Reducer should change the count show movie to a given value x2`, () => {
  const count = MAX_SHOW_MORE_FILMS * 2;
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: MAX_SHOW_MORE_FILMS,
    isPlaying: false,
  }, {
    type: ActionType.SET_СOUNT_SHOW_MOVIES,
    payload: MAX_SHOW_MORE_FILMS,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: count,
    isPlaying: false,
  });
});

it(`Reducer should set default value the count show movies`, () => {
  const count = MAX_SHOW_MORE_FILMS * 2;
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: count,
    isPlaying: false,
  }, {
    type: ActionType.SET_DEFAULT_СOUNT_SHOW_MOVIES,
    payload: MAX_SHOW_MORE_FILMS,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: MAX_SHOW_MORE_FILMS,
    isPlaying: false,
  });
});

it(`Reducer should play the movie`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: MAX_SHOW_MORE_FILMS,
    isPlaying: false,
  }, {
    type: ActionType.PLAY_ACTIVE_MOVIE,
    payload: true,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: MAX_SHOW_MORE_FILMS,
    isPlaying: true,
  });
});

it(`Reducer should stop play the movie`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: MAX_SHOW_MORE_FILMS,
    isPlaying: true,
  }, {
    type: ActionType.EXIT_PLAY_MOVIE,
    payload: false,
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
    countShowMovies: MAX_SHOW_MORE_FILMS,
    isPlaying: false,
  });
});
