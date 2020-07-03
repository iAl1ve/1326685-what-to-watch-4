import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {ListMovies} from "../../mock/testing.js";
import {GENRE_DEFAULT} from "../../const.js";

describe(`Test Render MoviesList`, () => {
  it(`Should MoviesList render correctly`, () => {
    const tree = renderer
      .create(<MoviesList
        listMovies={ListMovies}
        activeCard={ListMovies[0]}
        currentGenre={GENRE_DEFAULT}
        onTitleButtonClick={() => {}}
        onMovieCardHover={() => {}}
        onMouseCardLeave={() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });


});
