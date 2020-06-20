import React, {PureComponent} from "react";
import MovieCard from "../movie-card/movie-card.jsx";
import {listMoviesType} from '../../types/index.js';

class MovieList extends PureComponent {
  constructor(listMoviesProps) {
    super(listMoviesProps);
    this.listMoviesProps = listMoviesProps;

    this.state = {
      activeFilm: {},
    };
  }

  render() {
    const {listMovies, onTitleButtonClick} = this.listMoviesProps;

    return (
      <div className="catalog__movies-list">
        {listMovies.map((movie) => (
          <MovieCard
            key = {movie.title}
            movie = {movie}
            onTitleButtonClick = {onTitleButtonClick}
            onMovieCardHover = {(currentFilm) => {
              this.setState({
                activeFilm: currentFilm,
              });
            }}
          />)
        )}
      </div>);
  }
}

MovieList.propTypes = {
  listMoviesProps: listMoviesType,
};

export default MovieList;
