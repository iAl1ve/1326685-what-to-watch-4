import {extend, errorPopup} from "../../utils.js";
import {AuthorizationStatus, ErrorStatus} from "../../const.js";
import {getAdaptedAuthInfo} from "../../adapter/adapter.js";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: {},
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER_INFO: `SET_USER_INFO`,
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
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(({data}) => {
        const authInfo = getAdaptedAuthInfo(data);
        dispatch(ActionCreator.setUserInfo(authInfo));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
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
};

export {reducer, ActionType, ActionCreator, Operation};
