import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  title: `Moonrise Kingdom`,
  src: `img/moonrise-kingdom.jpg`,
};

describe(`MovieCard e2e tests`, () => {
  it(`Should title be clicked`, () => {
    const onTitleButtonClick = jest.fn();
    const onMovieCardHover = jest.fn();

    const filmsComponent = shallow(
        <MovieCard
          movie = {movie}
          onTitleButtonClick = {onTitleButtonClick}
          onMovieCardHover = {onMovieCardHover}
        />
    );

    const movieTitle = filmsComponent.find(`h3.small-movie-card__title`);
    const movieImage = filmsComponent.find(`.small-movie-card__image`);

    movieTitle.simulate(`click`);
    movieImage.simulate(`mouseenter`);

    expect(onTitleButtonClick).toHaveBeenCalledTimes(1);
    expect(onMovieCardHover.mock.calls.length).toBe(1);
    expect(onMovieCardHover).toHaveBeenCalledWith(movie);
  });
});
