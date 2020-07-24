import React from "react";
import renderer from "react-test-renderer";
import LoaderScreen from "./loader-screen.jsx";

it(`Render LoaderScreen`, () => {
  const tree = renderer
    .create(<
      LoaderScreen
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
