import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";
import Footer from "./footer.jsx";

it(`Test Render Footer`, () => {
  const tree = renderer
    .create(
        <Router
          history = {history}
        >
          <Footer
            isMain = {false}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        })
        .toJSON();

  expect(tree).toMatchSnapshot();
});
