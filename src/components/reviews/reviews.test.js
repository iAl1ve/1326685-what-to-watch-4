import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";
import {ListReviews} from "../../mock/testing.js";

describe(`Test Render Reviews`, () => {
  it(`Render Reviews`, () => {
    const tree = renderer
      .create(<Reviews
        reviews = {ListReviews}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
