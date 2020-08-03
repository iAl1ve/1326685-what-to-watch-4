import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import NameSpace from "../../reducer/name-space.js";
import {ListMovies, listGenres, ListReviews} from "../../mock/testing.js";
import {AuthorizationStatus, GENRE_DEFAULT, MAX_SHOW_MORE_FILMS} from "../../const.js";

const mockStore = configureStore([]);

describe(`Test Render App`, () => {
  it(`Render App`, () => {
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
            <App
              movie = {ListMovies[0]}
              promoFilm = {ListMovies[0]}
              listMovies = {ListMovies}
              listGenres = {listGenres}
              listReviews = {ListReviews}
              favoritesFilms = {[]}
              currentGenre = {GENRE_DEFAULT}
              countShowMovies = {MAX_SHOW_MORE_FILMS}
              isAuthorization = {false}
              isFormDisabled = {false}
              isStatusSend = {false}
              onTitleButtonClick = {() => {}}
              onGenreItemClick = {() => {}}
              onShowMoreClick = {() => {}}
              login = {() => {}}
              onSubmitReview = {() => {}}
              onAddMoviesToWatch = {() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
