import React, {PureComponent, createRef} from "react";
import {VideoType} from '../../types/index.js';
import {VIDEO_SIZE} from "../../const.js";

class VideoPlayer extends PureComponent {
  constructor(videoProps) {
    super(videoProps);
    this.videoProps = videoProps;

    this._videoRef = createRef();
  }

  componentDidMount() {
    const {src, preview} = this.videoProps;
    const video = this._videoRef.current;

    video.src = preview;
    video.poster = src;
    video.width = VIDEO_SIZE;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.src = null;
    video.poster = null;
    video.width = null;
  }

  render() {
    return (
      <video
        ref = {this._videoRef}
        muted = {true}
        autoPlay = {true}
      />
    );
  }
}

VideoPlayer.propTypes = {
  videoProps: VideoType,
};

export default VideoPlayer;
