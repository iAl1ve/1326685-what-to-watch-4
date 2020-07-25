import React from "react";
import renderer from "react-test-renderer";
import ErrorScreen from "./error-screen.jsx";

describe(`Test render ErrorScreen`, () => {
  it(`should render correctly ErrorScreen component`, () => {
    const tree = renderer.create(
        <ErrorScreen/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
