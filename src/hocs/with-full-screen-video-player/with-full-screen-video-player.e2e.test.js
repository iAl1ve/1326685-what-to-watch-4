import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFullScreenVideoPlayer from "./with-full-screen-video-player";
import {ListMovies} from "../../mock/testing.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockPlayer = (props) => {
  const {children, onPlayPauseButtonClick} = props;
  return (
    <div>
      <button onClick={onPlayPauseButtonClick}></button>
      {children}
    </div>
  );
};

MockPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onPlayPauseButtonClick: PropTypes.func.isRequired,
};

const MockPlayerWrapped = withFullScreenVideoPlayer(MockPlayer);

describe(`WithFullScreenVideoPlayer HOC e2e tests`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
  });

  it(`Should turn on video play() when Component Did Mount`, () => {
    const wrapper = mount(
        <MockPlayerWrapped
          movie = {ListMovies[0]}
          onPlayerExitClick = {() => {}}
        />
    );

    const {_videoRef} = wrapper.instance();
    const spy = jest.spyOn(_videoRef.current, `play`);

    wrapper.instance().componentDidMount();
    wrapper.instance().componentDidUpdate();

    expect(wrapper.state().isPlaying).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`Should call video pause() on PlayPauseButton click`, () => {
    const wrapper = mount(
        <MockPlayerWrapped
          movie = {ListMovies[0]}
          onPlayerExitClick = {() => {}}
        />
    );

    const {_videoRef} = wrapper.instance();
    const spy = jest.spyOn(_videoRef.current, `pause`);

    wrapper.instance().componentDidMount();

    const playButton = wrapper.find(`button`);
    playButton.simulate(`click`);

    expect(wrapper.state().isPlaying).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`Should call video play() on the second PlayPauseButton click`, () => {
    const wrapper = mount(
        <MockPlayerWrapped
          movie = {ListMovies[0]}
          onPlayerExitClick = {() => {}}
        />
    );

    const {_videoRef} = wrapper.instance();
    const spy = jest.spyOn(_videoRef.current, `play`);

    wrapper.instance().componentDidMount();
    wrapper.instance().componentDidUpdate();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().isPlaying).toBeTruthy();

    const playButton = wrapper.find(`button`);
    playButton.simulate(`click`);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().isPlaying).toBeFalsy();

    playButton.simulate(`click`);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(wrapper.state().isPlaying).toBeTruthy();
  });
});
