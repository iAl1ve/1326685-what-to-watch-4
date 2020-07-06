import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";
import {ListMovies} from "../../mock/testing.js";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`MovieCard e2e tests`, () => {
  it(`Should title be clicked`, () => {
    const onTitleButtonClick = jest.fn();
    const onMovieCardHover = jest.fn();
    const onMouseCardLeave = jest.fn();

    const filmsComponent = shallow(
        <MovieCard
          movie = {ListMovies[0]}
          isPlaying = {false}
          onTitleButtonClick = {onTitleButtonClick}
          onMovieCardHover = {onMovieCardHover}
          onMouseCardLeave = {onMouseCardLeave}
        />
    );

    const mockEvent = {
      preventDefault() {}
    };

    const movieTitle = filmsComponent.find(`.small-movie-card__link`);
    const movieImage = filmsComponent.find(`.small-movie-card__image`);

    movieTitle.simulate(`click`, mockEvent);
    movieImage.simulate(`click`);

    expect(onTitleButtonClick.mock.calls.length).toBe(2);
    expect(onTitleButtonClick.mock.calls[0][0]).toMatchObject(ListMovies[0]);
  });

  it(`Mouseenter event at the movie card`, () => {
    const onTitleButtonClick = jest.fn();
    const onMovieCardHover = jest.fn();
    const onMouseCardLeave = jest.fn();

    const filmsComponent = shallow(
        <MovieCard
          movie = {ListMovies[0]}
          isPlaying = {false}
          onTitleButtonClick = {onTitleButtonClick}
          onMovieCardHover = {onMovieCardHover}
          onMouseCardLeave = {onMouseCardLeave}
        />
    );

    const movieImage = filmsComponent.find(`.small-movie-card__image`);

    movieImage.simulate(`mouseenter`);

    expect(onMovieCardHover.mock.calls.length).toBe(1);
    expect(onMovieCardHover).toHaveBeenCalledWith(ListMovies[0]);
  });

  it(`Mouseleave event at the movie card`, () => {
    const onTitleButtonClick = jest.fn();
    const onMovieCardHover = jest.fn();
    const onMouseCardLeave = jest.fn();

    const filmsComponent = shallow(
        <MovieCard
          movie = {ListMovies[0]}
          isPlaying = {false}
          onTitleButtonClick = {onTitleButtonClick}
          onMovieCardHover = {onMovieCardHover}
          onMouseCardLeave = {onMouseCardLeave}
        />
    );

    const movieImage = filmsComponent.find(`.small-movie-card__image`);

    movieImage.simulate(`mouseleave`);

    expect(onMouseCardLeave.mock.calls.length).toBe(1);
  });
});
