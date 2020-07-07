import {reducer, ActionType} from "./reducer.js";
import {ListMovies, ListReviews, listGenres} from "./mock/testing.js";
import {GENRE_DEFAULT} from "./const.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
  });
});

it(`Reducer should change the genre to a given value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
  }, {
    type: ActionType.CHANGE_FILTER_BY_GENRE,
    payload: `Drama`,
  })).toEqual({
    currentGenre: `Drama`,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
  });
});

it(`Reducer should change the movie to a given value`, () => {
  expect(reducer({
    currentGenre: GENRE_DEFAULT,
    activeFilm: null,
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
  }, {
    type: ActionType.SET_ACTIVE_MOVIE,
    payload: ListMovies[0],
  })).toEqual({
    currentGenre: GENRE_DEFAULT,
    activeFilm: ListMovies[0],
    listMovies: ListMovies,
    listReviews: ListReviews,
    listGenres,
  });
});
