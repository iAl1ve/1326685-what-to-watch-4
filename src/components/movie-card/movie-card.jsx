import React from "react";
import {listMoviesType} from '../../types/index.js';

const MovieCard = (listMoviesProps) => {
  const {movie, onTitleButtonClick, onMovieCardHover} = listMoviesProps;
  const {title, src} = movie;

  return (
    <React.Fragment>
      <article className="small-movie-card catalog__movies-card">
        <div className="small-movie-card__image"
          onClick={() => onTitleButtonClick(movie)}
          onMouseEnter={() => onMovieCardHover(movie)}
          onMouseLeave={() => onMovieCardHover({})} >
          <img src={src} alt={title} width="280" height="175" />
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

MovieCard.propTypes = {
  listMoviesProps: listMoviesType,
};

export default MovieCard;
