import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import ListMovies from "../../mock/testing.js";

describe(`Test Render MoviePage`, () => {
  it(`Render MoviePage`, () => {
    const tree = renderer
      .create(<MoviePage
        movie = {ListMovies[0]}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
