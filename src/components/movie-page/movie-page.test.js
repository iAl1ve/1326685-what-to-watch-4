import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import MoviePage from "./movie-page.jsx";
import {ListMovies, ListReviews} from "../../mock/testing.js";
import {GENRE_DEFAULT} from "../../const.js";

const mockStore = configureStore([]);

describe(`Test Render MoviePage`, () => {
  it(`Render MoviePage`, () => {
    const store = mockStore({
      listReviews: ListReviews,
    });

    const tree = renderer
      .create(
          <Provider store = {store}>
            <MoviePage
              movie = {ListMovies[0]}
              listMovies = {ListMovies}
              onTitleButtonClick = {() => {}}
              currentGenre = {GENRE_DEFAULT}
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
