import React from "react";
import MoviesList from "../movies-list/movies-list.jsx";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list.js";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import {getSimilarGenreFilms} from "../../utils.js";
import {GENRE_DEFAULT} from "../../const.js";
import {AppType} from '../../types/index.js';

const MoviesListWrapped = withMoviesList(MoviesList);

const Main = (props) => {
  const {movie, listMovies, currentGenre, listGenres, countShowMovies, onTitleButtonClick, onGenreItemClick, onShowMoreClick, onPlayButtonClick} = props;
  const {title, genre, year, src, background} = movie;
  const similarGenreFilms = getSimilarGenreFilms(listMovies, currentGenre, title);
  const currentListMovies = currentGenre === GENRE_DEFAULT ? listMovies : similarGenreFilms;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={background} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={src} alt={title} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  onClick={() => onPlayButtonClick()}
                  className="btn btn--play movie-card__button"
                  type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            currentGenre = {currentGenre}
            listGenres = {listGenres}
            onGenreItemClick = {onGenreItemClick}
          />

          <MoviesListWrapped
            listMovies = {currentListMovies.slice(0, countShowMovies)}
            onTitleButtonClick = {onTitleButtonClick}
          />

          {countShowMovies < currentListMovies.length ?
            <ShowMore
              onShowMoreClick = {onShowMoreClick}
            />
            : ``
          }

        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

Main.propTypes = AppType;

export default Main;
