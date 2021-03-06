import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withFullScreenVideoPlayer from "./with-full-screen-video-player";
import {ListMovies} from "../../mock/testing.js";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const match = {
  params: {
    id: 1,
  }
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withFullScreenVideoPlayer(MockComponent);

it(`withFullScreenVideoPlayer is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      match = {match}
      isPlaying = {true}
      timeElapsed = {0}
      currentProgress = {`0`}
      onPlayPauseButtonClick = {() => {}}
      onFullScreenClick = {() => {}}
      onPlayerExitClick = {() => {}}
      listMovies = {ListMovies}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
