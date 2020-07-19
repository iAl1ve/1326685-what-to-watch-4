import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {ListMovies, listGenres} from "../../mock/testing.js";
import {GENRE_DEFAULT, MAX_SHOW_MORE_FILMS} from "../../const.js";

describe(`Test Render Main`, () => {
  it(`Render Main`, () => {
    const tree = renderer
      .create(<Main
        movie = {ListMovies[0]}
        listMovies = {ListMovies}
        listGenres = {listGenres}
        currentGenre = {GENRE_DEFAULT}
        countShowMovies = {MAX_SHOW_MORE_FILMS}
        onTitleButtonClick = {() => {}}
        onGenreItemClick = {() => {}}
        onShowMoreClick = {() => {}}
        onPlayerExitClick = {() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
