import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const ListMovies = [
  {
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
  }, {
    title: `Bohemian Rhapsody`,
    src: `img/bohemian-rhapsody.jpg`,
    genre: `comedy`,
    year: 2015,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    ratingScore: `4.1`,
    ratingLevel: `Very poor `,
    ratingCount: `195`,
    movieDescription: `Bohemian Rhapsody movie description text. Bohemian Rhapsody movie description text. Bohemian Rhapsody movie description text. `,
    movieDirector: `Director: Bill Murray`,
    movieStarring: `Starring: Edward Norton, Willem Dafoe and other`,
  }, {
    title: `Macbeth`,
    src: `img/macbeth.jpg`,
    genre: `drama`,
    year: 2014,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    ratingScore: `9.3`,
    ratingLevel: `Very poor `,
    ratingCount: `119`,
    movieDescription: `Macbeth movie description text. Macbeth movie description text. Macbeth movie description text. Macbeth movie description text. `,
    movieDirector: `Director: Macbeth`,
    movieStarring: `Starring: Macbeth, Willem Dafoe and other`,
  }
];

const onTitleButtonClick = () => {};

describe(`Test Render Main`, () => {
  it(`Render Main`, () => {
    const tree = renderer
      .create(<Main
        movie = {ListMovies[0]}
        listMovies = {ListMovies}
        onTitleButtonClick = {onTitleButtonClick}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
