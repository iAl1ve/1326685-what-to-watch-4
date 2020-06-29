import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./video-player.jsx";
import ListMovies from "../../mock/testing.js";

describe(`Test Render MovieCard`, () => {
  it(`Render MovieCard`, () => {
    const tree = renderer
      .create(<MovieCard
        src = {ListMovies[0].src}
        preview = {ListMovies[0].preview}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
