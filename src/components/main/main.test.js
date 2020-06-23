import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import ListMovies from "../../mock/testing.js";

const onTitleButtonClick = () => {};

describe(`Test Render Main`, () => {
  it(`Render Main`, () => {
    const tree = renderer
      .create(<Main
        movie = {ListMovies[0]}
        listMovies = {ListMovies}
        onTitleButtonClick = {onTitleButtonClick}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
