import {extend, errorPopup, successPopup} from "../../utils.js";
import {getAdaptedFilms, getAdaptedFilm, getAdaptedComments} from "../../adapter/adapter.js";
import {GENRE_DEFAULT, MAX_COUNT_GENRES} from "../../const.js";

const initialState = {
  listMovies: null,
  promoFilm: null,
  listGenres: null,
  listReviews: null,
  isStatusSend: false,
  isFormDisabled: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_GENRES: `LOAD_GENRES`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SUBMIT_REVIEW: `SUBMIT_REVIEW`,
  SET_FORM_BLOCKED: `SET_FORM_BLOCKED`,
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

  submitReview: (status) => {
    return {
      type: ActionType.SUBMIT_REVIEW,
      payload: status,
    };
  },

  setFormBlocked: (status) => {
    return {
      type: ActionType.SET_FORM_BLOCKED,
      payload: status,
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

  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then(({data}) => {
        const comments = getAdaptedComments(data);
        dispatch(ActionCreator.loadReviews(comments));
      }).catch(({response}) => {
        return errorPopup(response);
      });
  },

  submitReview: (id, review) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setFormBlocked(true));
    return api.post(`/comments/${id}`, {
      rating: review.rating,
      comment: review.comment,
    })
      .then(({data}) => {
        const comments = getAdaptedComments(data);

        dispatch(ActionCreator.submitReview(true));
        dispatch(ActionCreator.setFormBlocked(false));
        dispatch(ActionCreator.loadReviews(comments));
        return successPopup();
      })
      .catch(({response}) => {
        dispatch(ActionCreator.setFormBlocked(false));
        return errorPopup(response);
      });
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
    case ActionType.SUBMIT_REVIEW:
      return extend(state, {
        isStatusSend: action.payload,
      });
    case ActionType.SET_FORM_BLOCKED:
      return extend(state, {
        isFormDisabled: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
