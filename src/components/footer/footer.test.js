import React from "react";
import renderer from "react-test-renderer";
import Footer from "./footer.jsx";

it(`Test Render Footer`, () => {
  const tree = renderer
    .create(
        <Footer
          isMain = {false}
        />, {
          createNodeMock: () => {
            return {};
          }
        })
        .toJSON();

  expect(tree).toMatchSnapshot();
});
