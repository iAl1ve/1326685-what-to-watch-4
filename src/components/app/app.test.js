import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {ListMovies, listGenres} from "../../mock/testing.js";
import {GENRE_DEFAULT, MAX_SHOW_MORE_FILMS} from "../../const.js";

const mockStore = configureStore([]);

describe(`Test Render App`, () => {
  it(`Render App`, () => {
    const store = mockStore({
      curretGenre: GENRE_DEFAULT,
      activeFilm: null,
      listMovies: ListMovies,
      listGenres,
      countShowMovies: MAX_SHOW_MORE_FILMS,
    });

    const tree = renderer
      .create(
          <Provider store = {store}>
            <App
              movie = {ListMovies[0]}
              listMovies = {ListMovies}
              listGenres = {listGenres}
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
