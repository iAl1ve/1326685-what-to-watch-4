import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import history from "../../history.js";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus, GENRE_DEFAULT, MAX_SHOW_MORE_FILMS} from "../../const.js";
import {ListMovies, listGenres, ListReviews} from "../../mock/testing.js";
import MyList from "./my-list.jsx";

const mockStore = configureStore([]);

it(`Test Render MyList`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      listMovies: ListMovies,
      promoFilm: ListMovies[0],
      listGenres,
      listReviews: ListReviews,
      isStatusSend: false,
      isFormDisabled: false,
    },
    [NameSpace.APP_STATE]: {
      currentGenre: GENRE_DEFAULT,
      countShowMovies: MAX_SHOW_MORE_FILMS,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      userInfo: {},
      favoritesFilms: [],
    }
  });

  const tree = renderer
    .create(
        <Provider store = {store}>
          <Router
            history = {history}
          >
            <MyList
              listMovies = {ListMovies}
              onTitleButtonClick = {() => {}}
            />
          </Router>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
