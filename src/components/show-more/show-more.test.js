import React from "react";
import renderer from "react-test-renderer";
import ShowMore from "./show-more.jsx";

describe(`Test Render ShowMore button`, () => {
  it(`Render ShowMore button`, () => {
    const tree = renderer
      .create(<ShowMore
        onShowMoreClick = {() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
