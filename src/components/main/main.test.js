import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const ListMovies = [
  {title: `Midnight Special`},
  {title: `Dardjeeling Limited`},
  {title: `Mindhunter`},
];

const onTitleButtonClick = () => {};

describe(`Test Render Main`, () => {
  it(`Render Main`, () => {
    const tree = renderer
      .create(<Main
        title = {`Seven Years in Tibet`}
        genre = {`documentary`}
        year = {2000}
        listMovies = {ListMovies}
        onTitleButtonClick = {onTitleButtonClick}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
