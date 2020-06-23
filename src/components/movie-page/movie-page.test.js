import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

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

describe(`Test Render MoviePage`, () => {
  it(`Render MoviePage`, () => {
    const tree = renderer
      .create(<MoviePage
        movie = {movie}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
