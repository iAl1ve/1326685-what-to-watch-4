import {reducer, ActionType, ActionCreator, Operation} from "./user.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {AuthorizationStatus} from "../../const.js";
import {ListMovies} from "../../mock/testing.js";
import {getAdaptedAuthInfo} from "../../adapter/adapter.js";

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    userInfo: {},
    favoritesFilms: [],
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

it(`Reducer should change userInfo by a given value`, () => {
  expect(reducer({
    userInfo: {}
  }, {
    type: ActionType.SET_USER_INFO,
    payload: {fake: true},
  })).toEqual({
    userInfo: {fake: true},
  });
});

it(`Reducer should update favoritesFilms by load favoritesFilms`, () => {
  expect(reducer({
    favoritesFilms: [],
  }, {
    type: ActionType.LOAD_FAVORITES_FILMS,
    payload: ListMovies,
  })).toEqual({
    favoritesFilms: ListMovies,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`Action creator for set user info returns correct action`, () => {
    expect(ActionCreator.setUserInfo({})).toEqual({
      type: ActionType.SET_USER_INFO,
      payload: {},
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call get to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loginLoader = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, {fake: true});
    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER_INFO,
          payload: getAdaptedAuthInfo({fake: true}),
        });
      });
  });

  it(`Should make a correct API call post to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authData = {fake: true};
    const loginLoader = Operation.login(authData);

    apiMock
      .onPost(`/login`)
      .reply(200, {fake: true});
    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER_INFO,
          payload: getAdaptedAuthInfo({fake: true}),
        });
      });
  });

  it(`Should make a correct API call get to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesFilms = {fake: true};
    const loadFavoritesFilms = Operation.loadFavoritesFilms(favoritesFilms);

    apiMock
      .onGet(`/favorite`)
      .reply(200, {fake: true});
    return loadFavoritesFilms(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES_FILMS,
          payload: {fake: true},
        });
      });
  });

});
