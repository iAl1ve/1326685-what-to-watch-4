import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import history from "../../history.js";
import NameSpace from "../../reducer/name-space.js";
import {ListMovies, listGenres, ListReviews} from "../../mock/testing.js";
import {GENRE_DEFAULT, MAX_SHOW_MORE_FILMS, AuthorizationStatus} from "../../const.js";
import MoviePage from "./movie-page.jsx";

const mockStore = configureStore([]);

const match = {
  params: {
    id: 1,
  }
};

describe(`Test Render MoviePage`, () => {
  it(`Render MoviePage`, () => {
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
        activeFilm: null,
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
          <Router
            history = {history}
          >
            <Provider store = {store}>
              <MoviePage
                match = {match}
                listMovies = {ListMovies}
                favoritesFilms = {[]}
                onTitleButtonClick = {() => {}}
                onAddMoviesToWatch = {() => {}}
                currentGenre = {GENRE_DEFAULT}
                isAuthorization = {false}
              />
            </Provider>
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
