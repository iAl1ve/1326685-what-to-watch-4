import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import {ListMovies, listGenres, ListReviews} from "../../mock/testing.js";
import {GENRE_DEFAULT, MAX_SHOW_MORE_FILMS, AuthorizationStatus} from "../../const.js";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

describe(`Test Render Main`, () => {
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
    }
  });

  it(`Render Main`, () => {
    const tree = renderer
      .create(
          <Provider store = {store}>
            <Main
              movie = {ListMovies[0]}
              listMovies = {ListMovies}
              listGenres = {listGenres}
              countShowMovies = {MAX_SHOW_MORE_FILMS}
              currentGenre = {GENRE_DEFAULT}
              onTitleButtonClick = {() => {}}
              onGenreItemClick = {() => {}}
              onShowMoreClick = {() => {}}
              onPlayerExitClick = {() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
