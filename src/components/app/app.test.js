import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const ListMovies = [
  {title: `Midnight Special`},
  {title: `Dardjeeling Limited`},
  {title: `Mindhunter`},
];

const onTitleButtonClick = () => {};

describe(`Test Render App`, () => {
  it(`Render App`, () => {
    const tree = renderer
      .create(<App
        title = {`Seven Years in Tibet`}
        genre = {`documentary`}
        year = {2000}
        listMovies = {ListMovies}
        onTitleButtonClick = {onTitleButtonClick}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
