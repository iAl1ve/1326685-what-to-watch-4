import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {ListMovies} from "../../mock/testing.js";
import {GENRE_DEFAULT} from "../../const.js";

const onTitleButtonClick = () => {};

describe(`Test Render Main`, () => {
  it(`Render Main`, () => {
    const tree = renderer
      .create(<Main
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
