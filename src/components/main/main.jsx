import React from "react";
import MoviesList from "../movies-list/movies-list.jsx";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list.js";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import {getSimilarGenreFilms} from "../../utils.js";
import {GENRE_DEFAULT, AppRoute} from "../../const.js";
import history from "../../history.js";
import {AppType} from '../../types/index.js';

const MoviesListWrapped = withMoviesList(MoviesList);

const Main = (props) => {
  const {movie, listMovies, favoritesFilms, currentGenre, listGenres, countShowMovies, isAuthorization, onTitleButtonClick, onGenreItemClick, onShowMoreClick, onAddMoviesToWatch} = props;
  const {id, title, genre, year, src, background} = movie;
  const similarGenreFilms = getSimilarGenreFilms(listMovies, currentGenre, title);
  const currentListMovies = currentGenre === GENRE_DEFAULT ? listMovies : similarGenreFilms;
  let isFavorites = !favoritesFilms.find((film) => film.id === id);

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={background} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          isMain = {true}
        />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src={src}
                alt={title + ` poster`}
                width="218" height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  onClick={() => {
                    history.push(`${AppRoute.VIDEO_PLAYER}/${id}`);
                  }}
                  className="btn btn--play movie-card__button"
                  type="button">

                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  onClick = {() => {
                    if (!isAuthorization) {
                      history.push(AppRoute.LOGIN);
                    } else {
                      let status = isFavorites ? 1 : 0;
                      onAddMoviesToWatch(id, status);
                    }
                  }}
                  className="btn btn--list movie-card__button" type="button">
                  {isFavorites
                    ? (<svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>)
                    : (<svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>)
                  }
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

        <Footer
          isMain = {true}
        />
      </div>
    </React.Fragment>
  );
};

Main.propTypes = AppType;

export default Main;
