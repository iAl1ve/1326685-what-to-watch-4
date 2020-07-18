import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FullScreenVideoPlayer from "./full-screen-video-player.jsx";
import {ListMovies} from "../../mock/testing.js";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`FullScreenVideoPlayer e2e tests`, () => {
  it(`Click by Play button calls callback`, () => {
    const handlePlayPauseButtonClick = jest.fn();
    const wrapper = shallow(<FullScreenVideoPlayer
      isPlaying = {true}
      timeElapsed = {0}
      currentProgress = {`0`}
      onPlayPauseButtonClick = {handlePlayPauseButtonClick}
      onFullScreenClick = {() => {}}
      onPlayerExitClick = {() => {}}
      title = {ListMovies[0].title}>
      <video></video>
    </FullScreenVideoPlayer>);

    wrapper.find(`.player__play`).simulate(`click`);
    expect(handlePlayPauseButtonClick).toHaveBeenCalledTimes(1);
  });

  it(`Click by Full Screen button calls callback`, () => {
    const handleFullScreenClick = jest.fn();
    const wrapper = shallow(<FullScreenVideoPlayer
      isPlaying = {true}
      timeElapsed = {0}
      currentProgress = {`0`}
      onPlayPauseButtonClick = {() => {}}
      onFullScreenClick = {handleFullScreenClick}
      onPlayerExitClick = {() => {}}
      title = {ListMovies[0].title}>
      <video></video>
    </FullScreenVideoPlayer>);

    wrapper.find(`.player__full-screen`).simulate(`click`);
    expect(handleFullScreenClick).toHaveBeenCalledTimes(1);
  });

  it(`Click by Player Exit button calls callback`, () => {
    const handlePlayerExitClick = jest.fn();
    const wrapper = shallow(<FullScreenVideoPlayer
      isPlaying = {true}
      timeElapsed = {0}
      currentProgress = {`0`}
      onPlayPauseButtonClick = {() => {}}
      onFullScreenClick = {() => {}}
      onPlayerExitClick = {handlePlayerExitClick}
      title = {ListMovies[0].title}>
      <video></video>
    </FullScreenVideoPlayer>);

    wrapper.find(`.player__exit`).simulate(`click`);
    expect(handlePlayerExitClick).toHaveBeenCalledTimes(1);
  });
});
