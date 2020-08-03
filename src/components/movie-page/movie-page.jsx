import React from "react";
import {Link} from "react-router-dom";
import TabsComponent from "../tabs/tabs.jsx";
import withTabs from "../../hocs/with-tabs/with-tabs.js";
import MoviesList from "../movies-list/movies-list.jsx";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list.js";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import {MAX_COUNT_SIMILAR_FILMS, AppRoute} from "../../const.js";
import {getSimilarGenreFilms, getCurrentFilm} from "../../utils.js";
import history from "../../history.js";
import {MoviePageType} from '../../types/index.js';

const TabsWrapped = withTabs(TabsComponent);
const MoviesListWrapped = withMoviesList(MoviesList);

const MoviePage = (props) => {
  const {listMovies, favoritesFilms, isAuthorization, onTitleButtonClick, onAddMoviesToWatch} = props;
  const id = Number(props.match.params.id);
  const movie = getCurrentFilm(listMovies, id);
  const {title, genre, year, src, background} = movie;
  let isFavorites = !favoritesFilms.find((film) => film.id === id);
  const similarGenreFilms = getSimilarGenreFilms(listMovies, genre, title).slice(0, MAX_COUNT_SIMILAR_FILMS);

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={background} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header
            isMain = {false}
          />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  onClick = {() => {
                    history.push(`${AppRoute.VIDEO_PLAYER}/${id}`);
                  }}
                  className="btn btn--play movie-card__button"
                  type="button"
                >
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
                {isAuthorization
                  ? (
                    <Link
                      to={`${AppRoute.FILM_PAGE}/${id}${AppRoute.FILM_REVIEW}`}
                      className="btn movie-card__button"
                    >
                    Add review
                    </Link>
                  )
                  : null
                }
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={src} alt={title + `poster`} width="218" height="327" />
            </div>

            <TabsWrapped
              {...props}
              movie = {movie}
            />

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesListWrapped
            listMovies = {similarGenreFilms}
            onTitleButtonClick = {onTitleButtonClick}
          />
          {similarGenreFilms.length === 0
            ? `No related movies found By genre`
            : null
          }
        </section>

        <Footer
          isMain = {false}
        />
      </div>
    </React.Fragment>
  );
};

MoviePage.propTypes = MoviePageType;

export default MoviePage;
