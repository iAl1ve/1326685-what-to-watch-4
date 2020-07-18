import React from "react";
import {FullScreenVideoType} from '../../types/index.js';

const formatVideoTime = (time) => {
  let hours = Math.floor(time / 60 / 60);
  let timeLeft = time - hours * 60 * 60;
  let minutes = Math.floor(time / 60) - (hours * 60);
  let seconds = timeLeft - minutes * 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};

const FullScreenVideoPlayer = (props) => {
  const {title, isPlaying, timeElapsed, currentProgress, onPlayPauseButtonClick, onFullScreenClick, onPlayerExitClick, children} = props;

  return (
    <div className="player">
      {children}

      <button
        type="button"
        onClick={() => onPlayerExitClick()}
        className="player__exit"
      >Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={currentProgress}
              max="100">
            </progress>
            <div className="player__toggler"
              style={{left: currentProgress + `%`}}
            >Toggler</div>
          </div>
          <div className="player__time-value">
            {formatVideoTime(timeElapsed)}
          </div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            onClick={() => onPlayPauseButtonClick()}
            className="player__play">
            {isPlaying ? (
              <React.Fragment>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </React.Fragment>
            )}
          </button>
          <div className="player__name">{title}</div>

          <button
            type="button"
            onClick={() => onFullScreenClick()}
            className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

FullScreenVideoPlayer.propTypes = FullScreenVideoType;

export default FullScreenVideoPlayer;
