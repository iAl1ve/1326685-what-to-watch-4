import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";
import {ListMovies} from "../../mock/testing.js";

it(`Render AddReview`, () => {
  const tree = renderer
    .create(<AddReview
      movie = {ListMovies[0]}
      onSubmitReview = {() => {}}
      isFormDisabled = {false}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
