import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";
import {Header} from "./header.jsx";
import {adaptedUserInfo} from "../../mock/testing.js";

it(`Test Render Header`, () => {
  const tree = renderer
    .create(
        <Router
          history = {history}
        >
          <Header
            isMain = {false}
            isAuthorization = {false}
            userInfo = {adaptedUserInfo}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
