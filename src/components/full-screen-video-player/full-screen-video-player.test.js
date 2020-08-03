import React from "react";
import renderer from "react-test-renderer";
import FullScreenVideoPlayer from "./full-screen-video-player.jsx";
import {ListMovies} from "../../mock/testing.js";

it(`Test Render FullScreenVideoPlayer`, () => {
  const tree = renderer
    .create(<FullScreenVideoPlayer
      isPlaying = {true}
      timeElapsed = {0}
      currentProgress = {`0`}
      onPlayPauseButtonClick = {() => {}}
      onFullScreenClick = {() => {}}
      title = {ListMovies[0].title}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
