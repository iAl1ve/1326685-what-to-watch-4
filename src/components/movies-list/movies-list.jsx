import React, {PureComponent} from "react";
import MovieCard from "../movie-card/movie-card.jsx";
import {ListMoviesType} from '../../types/index.js';


class MovieList extends PureComponent {
  constructor(listMoviesProps) {
    super(listMoviesProps);
    this.listMoviesProps = listMoviesProps;

    this.state = {
      activeCard: {},
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
            onMovieCardHover = {() => {
              this.setState({
                activeCard: movie,
              });
            }}
          />)
        )}
      </div>);
  }
}

MovieList.propTypes = {
  listMoviesProps: ListMoviesType,
};

export default MovieList;
