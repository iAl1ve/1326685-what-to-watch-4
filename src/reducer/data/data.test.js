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
      isStatusSend: false,
      isFormDisabled: false,
    });
  });

  it(`Reducer should update films by load films`, () => {
    expect(reducer({
      listMovies: null,
    }, {
      type: ActionType.LOAD_FILMS,
      payload: ListMovies,
    })).toEqual({
      listMovies: ListMovies,
    });
  });

  it(`Reducer should update promoFilm by load promoFilm`, () => {
    expect(reducer({
      promoFilm: null,
    }, {
      type: ActionType.LOAD_PROMO_FILM,
      payload: ListMovies[0],
    })).toEqual({
      promoFilm: ListMovies[0],
    });
  });

  it(`Reducer should update promoFilm by load genres`, () => {
    expect(reducer({
      listGenres: null,
    }, {
      type: ActionType.LOAD_GENRES,
      payload: ListGenres,
    })).toEqual({
      listGenres: ListGenres,
    });
  });

  it(`Reducer should update listReviews by load reviews`, () => {
    expect(reducer({
      listReviews: null,
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: ListReviews,
    })).toEqual({
      listReviews: ListReviews,
    });
  });

  it(`Reducer should change isStatusSend by a given value`, () => {
    expect(reducer({
      isStatusSend: false,
    }, {
      type: ActionType.SUBMIT_REVIEW,
      payload: true,
    })).toEqual({
      isStatusSend: true
    });
  });

  it(`Reducer should change isFormDisabled by a given value`, () => {
    expect(reducer({
      isFormDisabled: false,
    }, {
      type: ActionType.SET_FORM_BLOCKED,
      payload: true,
    })).toEqual({
      isFormDisabled: true
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

  /* it(`Should make a correct API call to /comments/id`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadReviewsLoader = Operation.loadReviews(42);

    apiMock
      .onGet(`/comments/42`)
      .reply(200, {fake: true});

    return loadReviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: getAdaptedComments({fake: true}),
        });
      });
  });

  it(`Should make a correct API call review to /comments`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const submitReview = Operation.submitReview({fake: true});

    apiMock
      .onPost(`/comments/42`)
      .reply(200, {fake: true});
    return submitReview(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SUBMIT_REVIEW,
          payload: {fake: true},
        });
      });
  }); */
});
