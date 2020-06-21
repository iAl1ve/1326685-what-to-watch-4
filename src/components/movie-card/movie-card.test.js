import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

const onTitleButtonClick = () => {};
const onMovieCardHover = () => {};
const movie = {
  title: `Moonrise Kingdom`,
  src: `img/moonrise-kingdom.jpg`,
};

describe(`Test Render MovieCard`, () => {
  it(`Render MovieCard`, () => {
    const tree = renderer
      .create(<MovieCard
        movie = {movie}
        onTitleButtonClick = {onTitleButtonClick}
        onMovieCardHover = {onMovieCardHover}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
