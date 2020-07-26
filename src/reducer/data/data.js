import {extend, errorPopup} from "../../utils.js";
import {getAdaptedFilms, getAdaptedFilm} from "../../adapter/adapter.js";
import ListReviews from "../../mock/reviews.js";
import {GENRE_DEFAULT, MAX_COUNT_GENRES} from "../../const.js";

const initialState = {
  listMovies: null,
  promoFilm: null,
  listGenres: null,
  listReviews: null,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_GENRES: `LOAD_GENRES`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

const ActionCreator = {
  loadFilms: (movies) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: movies,
    };
  },

  loadPromoFilm: (movie) => {
    return {
      type: ActionType.LOAD_PROMO_FILM,
      payload: movie,
    };
  },

  loadGenres: (genres) => {
    return {
      type: ActionType.LOAD_GENRES,
      payload: genres,
    };
  },

  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then(({data}) => {
        const adaptedFilms = getAdaptedFilms(data);
        dispatch(ActionCreator.loadFilms(adaptedFilms));
        const allGenres = [...new Set(adaptedFilms.map((movie) => movie.genre))];
        dispatch(ActionCreator.loadGenres(
            [GENRE_DEFAULT, ...allGenres.slice(0, MAX_COUNT_GENRES)])
        );
      }).catch(({response}) => {
        return errorPopup(response);
      });
  },

  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then(({data}) => {
        dispatch(ActionCreator.loadPromoFilm(getAdaptedFilm(data)));
      }).catch(({response}) => {
        return errorPopup(response);
      });
  },
  // Пока сделал чтобы подгружало моковые коммментарии
  loadReviews: () => (dispatch) => {
    return dispatch(ActionCreator.loadReviews(ListReviews));
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        listMovies: action.payload,
      });
    case ActionType.LOAD_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload,
      });
    case ActionType.LOAD_GENRES:
      return extend(state, {
        listGenres: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        listReviews: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
