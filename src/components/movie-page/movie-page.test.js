import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {ListMovies} from "../../mock/testing.js";
import {GENRE_DEFAULT} from "../../const.js";

const onTitleButtonClick = () => {};

describe(`Test Render MoviePage`, () => {
  it(`Render MoviePage`, () => {
    const tree = renderer
      .create(<MoviePage
        movie = {ListMovies[0]}
        listMovies = {ListMovies}
        onTitleButtonClick = {onTitleButtonClick}
        currentGenre = {GENRE_DEFAULT}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
