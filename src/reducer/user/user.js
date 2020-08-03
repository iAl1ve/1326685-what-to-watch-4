import {extend, errorPopup} from "../../utils.js";
import {AuthorizationStatus, ErrorStatus} from "../../const.js";
import {getAdaptedAuthInfo, getAdaptedFilm} from "../../adapter/adapter.js";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: {},
  favoritesFilms: [],
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER_INFO: `SET_USER_INFO`,
  LOAD_FAVORITES_FILMS: `LOAD_FAVORITES_FILMS`,
  ADD_FAVORITES_FILM: `ADD_FAVORITES_FILM`,
  DELETE_FAVORITES_FILM: `DELETE_FAVORITES_FILM`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  setUserInfo: (status) => {
    return {
      type: ActionType.SET_USER_INFO,
      payload: status,
    };
  },
  loadFavoritesFilms: (movies) => {
    return {
      type: ActionType.LOAD_FAVORITES_FILMS,
      payload: movies,
    };
  },
  addFavoritesFilm: (movie) => {
    return {
      type: ActionType.ADD_FAVORITES_FILM,
      payload: movie,
    };
  },
  deleteFavoritesFilm: (movie) => {
    return {
      type: ActionType.DELETE_FAVORITES_FILM,
      payload: movie,
    };
  },
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(({data}) => {
        const authInfo = getAdaptedAuthInfo(data);
        dispatch(ActionCreator.setUserInfo(authInfo));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then(({data}) => {
        const authInfo = getAdaptedAuthInfo(data);
        dispatch(ActionCreator.setUserInfo(authInfo));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch(({response}) => {
        if (response.status === ErrorStatus.BAD_REQUEST) {
          dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.BAD_REQUEST));
        }
        return errorPopup(response);
      });
  },

  loadFavoritesFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then(({data}) => {
        dispatch(ActionCreator.loadFavoritesFilms(data));
      });
  },

  addFilmsToFavorites: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`)
      .then(({data}) => {
        const film = getAdaptedFilm(data);
        if (film.isFavorite) {
          dispatch(ActionCreator.addFavoritesFilm(film));
        } else {
          dispatch(ActionCreator.deleteFavoritesFilm(film));
        }
      })
      .catch((err) => {
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionType.SET_USER_INFO:
      return extend(state, {
        userInfo: action.payload,
      });

    case ActionType.LOAD_FAVORITES_FILMS:
      return extend(state, {
        favoritesFilms: action.payload,
      });

    case ActionType.ADD_FAVORITES_FILM:
      return extend(state, {
        favoritesFilms: [...state.favoritesFilms, action.payload],
      });

    case ActionType.DELETE_FAVORITES_FILM:
      return extend(state, {
        favoritesFilms: [...state.favoritesFilms].filter((movie) => movie.id !== action.payload.id),
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
