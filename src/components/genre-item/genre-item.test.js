import React from "react";
import renderer from "react-test-renderer";
import GenreItem from "./genre-item.jsx";
import {listGenres} from "../../mock/testing.js";

const onGenreItemClick = () => {};

it(`Test Render Genre Item`, () => {
  const tree = renderer
    .create(<GenreItem
      genre = {listGenres[0]}
      isActive = {true}
      onGenreItemClick = {onGenreItemClick}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
