import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import NameSpace from "../../reducer/name-space.js";
import {ListMovies, listGenres, ListReviews} from "../../mock/testing.js";
import {GENRE_DEFAULT, MAX_SHOW_MORE_FILMS} from "../../const.js";

const mockStore = configureStore([]);

describe(`Test Render App`, () => {
  it(`Render App`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        listMovies: ListMovies,
        promoFilm: ListMovies[0],
        listGenres,
        listReviews: ListReviews,
        isErrorLoading: false,
      },
      [NameSpace.APP_STATE]: {
        currentGenre: GENRE_DEFAULT,
        activeFilm: null,
        countShowMovies: MAX_SHOW_MORE_FILMS,
        isPlaying: false,
      },
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
      }
    });

    const tree = renderer
      .create(
          <Provider store = {store}>
            <App
              movie = {ListMovies[0]}
              listMovies = {ListMovies}
              listGenres = {listGenres}
              listReviews = {ListReviews}
              activeFilm = {ListMovies[0]}
              currentGenre = {GENRE_DEFAULT}
              countShowMovies = {MAX_SHOW_MORE_FILMS}
              onTitleButtonClick = {() => {}}
              onGenreItemClick = {() => {}}
              onShowMoreClick = {() => {}}
              onPlayerExitClick = {() => {}}
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
