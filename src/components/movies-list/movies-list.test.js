import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import ListMovies from "../../mock/testing.js";

describe(`Test Render MoviesList`, () => {
  it(`Should MoviesList render correctly`, () => {
    const tree = renderer
      .create(<MoviesList
        listMovies={ListMovies}
        onTitleButtonClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
