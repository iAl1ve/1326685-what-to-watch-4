import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const ListMovies = [
  {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    src: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  }, {
    title: `Bohemian Rhapsody`,
    src: `img/bohemian-rhapsody.jpg`,
  }, {
    title: `Macbeth`,
    src: `img/macbeth.jpg`,
  }
];

const onTitleButtonClick = () => {};

describe(`Test Render Main`, () => {
  it(`Render Main`, () => {
    const tree = renderer
      .create(<Main
        title = {`Seven Years in Tibet`}
        genre = {`documentary`}
        year = {2000}
        src = {`img/seven-years-in-tibet.jpg`}
        background = {`bg-the-grand-budapest-hotel`}
        listMovies = {ListMovies}
        onTitleButtonClick = {onTitleButtonClick}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
