import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import MoviePage from "./movie-page.jsx";
import {ListMovies, ListReviews, listGenres} from "../../mock/testing.js";
import {GENRE_DEFAULT, MAX_SHOW_MORE_FILMS, AuthorizationStatus} from "../../const.js";

const mockStore = configureStore([]);

describe(`Test Render MoviePage`, () => {
  it(`Render MoviePage`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        listMovies: ListMovies,
        promoFilm: ListMovies[0],
        listGenres,
        listReviews: ListReviews,
      },
      [NameSpace.APP_STATE]: {
        currentGenre: GENRE_DEFAULT,
        activeFilm: null,
        countShowMovies: MAX_SHOW_MORE_FILMS,
        isPlaying: false,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userInfo: {},
        isStatusSend: false,
        isFormDisabled: false,
      }
    });

    const tree = renderer
      .create(
          <Provider store = {store}>
            <MoviePage
              movie = {ListMovies[0]}
              listMovies = {ListMovies}
              onTitleButtonClick = {() => {}}
              currentGenre = {GENRE_DEFAULT}
              isAuthorization = {false}
              onPlayButtonClick = {() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
