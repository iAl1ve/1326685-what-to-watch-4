import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {ListMovies} from "../../mock/testing.js";
import {GENRE_DEFAULT} from "../../const.js";

const onTitleButtonClick = () => {};

describe(`Test Render App`, () => {
  it(`Render App`, () => {
    const tree = renderer
      .create(<App
        movie = {ListMovies[0]}
        listMovies = {ListMovies}
        listReviews = {[]}
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
