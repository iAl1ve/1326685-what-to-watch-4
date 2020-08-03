import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import history from "../../history.js";
import AddReview from "./add-review.jsx";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus, GENRE_DEFAULT, MAX_SHOW_MORE_FILMS} from "../../const.js";
import {ListMovies, listGenres, ListReviews} from "../../mock/testing.js";

const match = {
  params: {
    id: 1,
  }
};

const mockStore = configureStore([]);

it(`Render AddReview`, () => {
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
            history={history}
          >
            <AddReview
              match = {match}
              listMovies = {ListMovies}
              onSubmitReview = {() => {}}
              isFormDisabled = {false}
              isStatusSend = {false}
            />
          </Router>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
        .toJSON();

  expect(tree).toMatchSnapshot();
});
