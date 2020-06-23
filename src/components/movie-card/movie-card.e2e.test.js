import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  src: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  genre: `drama`,
  year: 2013,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  ratingScore: `9.1`,
  ratingLevel: `Very good +`,
  ratingCount: `146`,
  movieDescription: `Fantastic Beasts: The Crimes of Grindelwald movie description text. Fantastic Beasts: The Crimes of Grindelwald movie description text. Fantastic Beasts: The Crimes of Grindelwald movie description text. `,
  movieDirector: `Director: Wes Andreson`,
  movieStarring: `Starring: Bill Murray, Willem Dafoe and other`,
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

    const mockEvent = {
      preventDefault() {}
    };

    const movieTitle = filmsComponent.find(`.small-movie-card__link`);
    const movieImage = filmsComponent.find(`.small-movie-card__image`);

    movieTitle.simulate(`click`, mockEvent);
    movieImage.simulate(`mouseenter`);
    movieImage.simulate(`click`);

    expect(onTitleButtonClick.mock.calls.length).toBe(2);
    expect(onTitleButtonClick.mock.calls[0][0]).toMatchObject(movie);
    expect(onMovieCardHover.mock.calls.length).toBe(1);
    expect(onMovieCardHover).toHaveBeenCalledWith(movie);
  });
});
