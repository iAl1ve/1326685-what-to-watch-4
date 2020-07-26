import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";

it(`Test Render Header`, () => {
  const tree = renderer
    .create(
        <Header
          isMain = {false}
          isAuthorization = {false}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
