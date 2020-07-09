import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";
import {GENRE_DEFAULT} from "../../const.js";
import {listGenres} from "../../mock/testing.js";

const onGenreItemClick = () => {};

describe(`Test Render GenresList`, () => {
  it(`Render GenresList`, () => {
    const tree = renderer
      .create(<GenresList
        currentGenre = {GENRE_DEFAULT}
        listGenres = {listGenres}
        onGenreItemClick = {onGenreItemClick}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
