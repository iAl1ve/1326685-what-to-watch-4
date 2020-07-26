import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";
import {getAdaptedFilm, getAdaptedFilms} from "../../adapter/adapter.js";
import {ListMovies, listGenres as ListGenres, ListReviews} from "../../mock/testing.js";

const api = createAPI(() => {});

describe(`Testing work Reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      listMovies: null,
      promoFilm: null,
      listGenres: null,
      listReviews: null,
    });
  });

  it(`Reducer should update films by load films`, () => {
    expect(reducer({
      listMovies: null,
      promoFilm: null,
      listGenres: null,
      listReviews: null,
    }, {
      type: ActionType.LOAD_FILMS,
      payload: ListMovies,
    })).toEqual({
      listMovies: ListMovies,
      promoFilm: null,
      listGenres: null,
      listReviews: null,
    });
  });

  it(`Reducer should update promoFilm by load promoFilm`, () => {
    expect(reducer({
      listMovies: null,
      promoFilm: null,
      listGenres: null,
      listReviews: null,
    }, {
      type: ActionType.LOAD_PROMO_FILM,
      payload: ListMovies[0],
    })).toEqual({
      listMovies: null,
      promoFilm: ListMovies[0],
      listGenres: null,
      listReviews: null,
    });
  });

  it(`Reducer should update promoFilm by load genres`, () => {
    expect(reducer({
      listMovies: null,
      promoFilm: null,
      listGenres: null,
      listReviews: null,
    }, {
      type: ActionType.LOAD_GENRES,
      payload: ListGenres,
    })).toEqual({
      listMovies: null,
      promoFilm: null,
      listGenres: ListGenres,
      listReviews: null,
    });
  });

  it(`Reducer should update listReviews by load reviews`, () => {
    expect(reducer({
      listMovies: null,
      promoFilm: null,
      listGenres: null,
      listReviews: null,
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: ListReviews,
    })).toEqual({
      listMovies: null,
      promoFilm: null,
      listGenres: null,
      listReviews: ListReviews,
    });
  });
});

describe(`Operation work data load correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, ListMovies);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: getAdaptedFilms(ListMovies),
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_GENRES,
          payload: ListGenres,
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoFilmLoader = Operation.loadPromoFilm();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, ListMovies[0]);

    return promoFilmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: getAdaptedFilm(ListMovies[0]),
        });
      });
  });
});
