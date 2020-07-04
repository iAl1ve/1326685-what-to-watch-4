import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";
import {ListMovies} from "../../mock/testing.js";

const onTitleButtonClick = () => {};
const onMovieCardHover = () => {};
const onMouseCardLeave = () => {};

describe(`Test Render MovieCard`, () => {
  it(`Render MovieCard`, () => {
    const tree = renderer
      .create(<MovieCard
        movie = {ListMovies[0]}
        isPlaying = {false}
        onTitleButtonClick = {onTitleButtonClick}
        onMovieCardHover = {onMovieCardHover}
        onMouseCardLeave = {onMouseCardLeave}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
