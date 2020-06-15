import React from "react";
import renderer from "react-test-renderer";
import Films from "./films.jsx";

const onTitleButtonClick = () => {};

describe(`Test Render Films`, () => {
  it(`Render Films`, () => {
    const tree = renderer
      .create(<Films
        title = {`Moonrise Kingdom`}
        onTitleButtonClick = {onTitleButtonClick}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
