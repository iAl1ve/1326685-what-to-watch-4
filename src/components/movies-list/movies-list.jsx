import React from "react";
import MovieCard from "../movie-card/movie-card.jsx";
import {ListMoviesType} from '../../types/index.js';

const MovieList = (listMoviesProps) => {
  const {listMovies, activeCard, onTitleButtonClick, onMovieCardHover, onMouseCardLeave} = listMoviesProps;
  const {title} = activeCard;

  return (
    <div className="catalog__movies-list">
      {listMovies.map((movie) => (
        <MovieCard
          key = {movie.title + movie.id}
          movie = {movie}
          isPlaying = {title === movie.title}
          onTitleButtonClick = {onTitleButtonClick}
          onMovieCardHover = {onMovieCardHover}
          onMouseCardLeave = {onMouseCardLeave}
        />)
      )}
    </div>
  );
};

MovieList.propTypes = {
  listMoviesProps: ListMoviesType,
};

export default MovieList;
