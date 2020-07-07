import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {ListMovies, listGenres} from "../../mock/testing.js";
import {GENRE_DEFAULT} from "../../const.js";

describe(`Test Render Main`, () => {
  it(`Render Main`, () => {
    const tree = renderer
      .create(<Main
        movie = {ListMovies[0]}
        listMovies = {ListMovies}
        listGenres = {listGenres}
        onTitleButtonClick = {() => {}}
        onGenreItemClick = {() => {}}
        currentGenre = {GENRE_DEFAULT}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
