import React, {PureComponent} from "react";
import MovieCard from "../movie-card/movie-card.jsx";
import {ListMoviesType} from '../../types/index.js';
import {PLAYBACK_DELAY} from "../../const.js";

class MovieList extends PureComponent {
  constructor(listMoviesProps) {
    super(listMoviesProps);
    this.listMoviesProps = listMoviesProps;

    this.state = {
      activeCard: {},
      timerId: null,
    };
  }

  render() {
    const {listMovies, onTitleButtonClick} = this.listMoviesProps;
    const {title: activeTitle} = this.state.activeCard;

    return (
      <div className="catalog__movies-list">
        {listMovies.map((movie) => (
          <MovieCard
            key = {movie.title}
            movie = {movie}
            isPlaying = {activeTitle === movie.title}
            onTitleButtonClick = {onTitleButtonClick}
            onMovieCardHover = {() => {
              const timer = setTimeout(() => {
                this.setState({
                  activeCard: movie,
                });
              }, PLAYBACK_DELAY);

              this.setState({
                timerId: timer,
              });
            }}
            onMouseCardLeave = {() => {
              this.setState({
                activeCard: {},
                timerId: null,
              });
              const {timerId} = this.state.timerId;
              clearTimeout(timerId);
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
