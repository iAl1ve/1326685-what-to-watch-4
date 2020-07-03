import React from "react";
import MovieCard from "../movie-card/movie-card.jsx";
import {GENRE_DEFAULT} from "../../const.js";
import {ListMoviesType} from '../../types/index.js';

const MovieList = (listMoviesProps) => {
  const {listMovies, activeCard, currentGenre, onTitleButtonClick, onMovieCardHover, onMouseCardLeave} = listMoviesProps;
  const {title} = activeCard;

  const getMoviesByGenre = (movies, genre) => {
    if (genre === GENRE_DEFAULT) {
      return movies;
    }

    return movies.filter((film) => film.genre === genre && film.title !== title);
  };

  return (
    <div className="catalog__movies-list">
      {getMoviesByGenre(listMovies, currentGenre).map((movie) => (
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
