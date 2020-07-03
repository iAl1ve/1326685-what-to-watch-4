import React from "react";
import renderer from "react-test-renderer";
import TabsComponent from "./tabs.jsx";
import {ListMovies} from "../../mock/testing.js";

describe(`Test Render Tabs Component`, () => {
  it(`Render Tabs`, () => {
    const tree = renderer
      .create(<TabsComponent
        movie = {ListMovies[0]}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
