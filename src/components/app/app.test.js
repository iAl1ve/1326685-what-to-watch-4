import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {ListMovies, listGenres} from "../../mock/testing.js";
import {GENRE_DEFAULT} from "../../const.js";

const mockStore = configureStore([]);

describe(`Test Render App`, () => {
  it(`Render App`, () => {
    const store = mockStore({
      curretGenre: GENRE_DEFAULT,
      activeFilm: null,
      listMovies: ListMovies,
      listGenres,
    });

    const tree = renderer
      .create(
          <Provider store = {store}>
            <App
              movie = {ListMovies[0]}
              listMovies = {ListMovies}
              onTitleButtonClick = {() => {}}
              onGenreItemClick = {() => {}}
              currentGenre = {GENRE_DEFAULT}
              listGenres = {listGenres}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
