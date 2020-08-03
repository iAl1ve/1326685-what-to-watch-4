import React from "react";
import renderer from "react-test-renderer";
import history from "../../history.js";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {ListMovies, listGenres, ListReviews} from "../../mock/testing.js";
import {GENRE_DEFAULT, MAX_SHOW_MORE_FILMS, AuthorizationStatus} from "../../const.js";
import Main from "./main.jsx";

const mockStore = configureStore([]);

describe(`Test Render Main`, () => {
  it(`Render Main`, () => {
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
              <Main
                movie = {ListMovies[0]}
                listMovies = {ListMovies}
                favoritesFilms = {[]}
                listGenres = {listGenres}
                countShowMovies = {MAX_SHOW_MORE_FILMS}
                currentGenre = {GENRE_DEFAULT}
                onTitleButtonClick = {() => {}}
                onGenreItemClick = {() => {}}
                onShowMoreClick = {() => {}}
                onAddMoviesToWatch = {() => {}}
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
