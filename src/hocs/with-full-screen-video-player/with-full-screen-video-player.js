import React, {PureComponent, createRef} from 'react';
import {getCurrentFilm} from "../../utils.js";
import {WithFullScreenVideoPlayerType} from '../../types/index.js';

const withFullScreenVideoPlayer = (Component) => {
  class WithFullScreenVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: true,
        timeElapsed: null,
        progress: null,
        duration: null,
      };
      this._videoRef = createRef();
      this._title = null;

      this.handlePlayPauseButtonClick = this.handlePlayPauseButtonClick.bind(this);
      this.handleFullScreenClick = this.handleFullScreenClick.bind(this);
    }

    componentDidMount() {
      const {listMovies} = this.props;

      const id = Number(this.props.match.params.id);
      const movie = getCurrentFilm(listMovies, id);
      this._title = movie.title;

      const {previewImage, videoLink} = movie;
      const video = this._videoRef.current;

      video.poster = previewImage;
      video.src = videoLink;

      video.ontimeupdate = () => this.setState({
        timeElapsed: Math.floor(video.duration - video.currentTime),
        progress: Math.floor(video.currentTime),
        duration: Math.floor(video.duration),
      });

      video.onfullscreenchange = () => {
        video.controls = (document.fullscreenElement && document.fullscreenElement.nodeName === `VIDEO`);
      };
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.poster = null;
      video.src = null;
      video.ontimeupdate = null;
    }

    componentDidUpdate() {
      const {isPlaying} = this.state;
      const video = this._videoRef.current;

      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    handlePlayPauseButtonClick() {
      const {isPlaying} = this.state;

      this.setState({
        isPlaying: !isPlaying,
      });
    }

    handleFullScreenClick() {
      const video = this._videoRef.current;
      const pointer = video.requestFullscreen || video.webkitRequestFullScreen || video.mozRequestFullScreen || video.msRequestFullscreen;
      pointer.call(video);
    }

    render() {
      return (
        <Component
          {...this.props}
          title = {this._title}
          isPlaying = {this.state.isPlaying}
          timeElapsed = {this.state.timeElapsed}
          currentProgress = {Math.floor(this.state.progress * 100 / this.state.duration).toString()}
          onPlayPauseButtonClick = {this.handlePlayPauseButtonClick}
          onFullScreenClick = {this.handleFullScreenClick}
        >
          <video
            ref = {this._videoRef}
            autoPlay = {true}
            className = "player__video"
          />
        </Component>
      );
    }
  }

  WithFullScreenVideoPlayer.propTypes = WithFullScreenVideoPlayerType;

  return WithFullScreenVideoPlayer;
};

export default withFullScreenVideoPlayer;
