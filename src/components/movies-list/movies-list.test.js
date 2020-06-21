import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

const MovieСards = [
  {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    src: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  }, {
    title: `Bohemian Rhapsody`,
    src: `img/bohemian-rhapsody.jpg`,
  }, {
    title: `Macbeth`,
    src: `img/macbeth.jpg`,
  }, {
    title: `Aviator`,
    src: `img/aviator.jpg`,
  }, {
    title: `Moonrise Kingdom`,
    src: `img/moonrise-kingdom.jpg`,
  }, {
    title: `Midnight Special`,
    src: `img/midnight-special.jpg`,
  }, {
    title: `War of the Worlds`,
    src: `img/war-of-the-worlds.jpg`,
  }, {
    title: `Shutter Island`,
    src: `img/shutter-island.jpg`,
  }
];

describe(`Test Render MoviesList`, () => {
  it(`Should MoviesList render correctly`, () => {
    const tree = renderer
      .create(<MoviesList
        listMovies={MovieСards}
        onTitleButtonClick={() => {}}
        onMovieCardHover={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
