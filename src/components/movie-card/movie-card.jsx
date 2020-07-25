import React from "react";
import {ListMoviesType} from '../../types/index.js';
import VideoPlayer from '../video-player/video-player.jsx';

const MovieCard = (props) => {
  const {movie, isPlaying, onTitleButtonClick, onMovieCardHover, onMouseCardLeave} = props;
  const {title, src, previewImage, preview} = movie;

  return (
    <React.Fragment>
      <article className="small-movie-card catalog__movies-card">
        <div className="small-movie-card__image"
          onClick={() => onTitleButtonClick(movie)}
          onMouseEnter={() => onMovieCardHover(movie)}
          onMouseLeave={() => onMouseCardLeave()} >
          {isPlaying ? (
            <VideoPlayer
              src = {previewImage}
              preview = {preview}
            />
          ) : (
            <img src={src} alt={title} width="280" height="175" />
          )}


        </div>
        <h3 className="small-movie-card__title">
          <a onClick={(evt) => {
            evt.preventDefault();
            onTitleButtonClick(movie);
          }}
          className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    </React.Fragment>
  );
};

MovieCard.propTypes = ListMoviesType;

export default MovieCard;
