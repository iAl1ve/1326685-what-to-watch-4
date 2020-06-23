import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import ListMovies from "../../mock/testing.js";

const onTitleButtonClick = () => {};

describe(`Test Render App`, () => {
  it(`Render App`, () => {
    const tree = renderer
      .create(<App
        movie = {ListMovies[0]}
        listMovies = {ListMovies}
        onTitleButtonClick = {onTitleButtonClick}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
