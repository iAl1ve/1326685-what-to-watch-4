import React, {Fragment} from "react";
import {connect} from "react-redux";
import Reviews from "../reviews/reviews.jsx";
import {formatTime, getRatingLevel} from '../../utils.js';
import {Tabs} from '../../const.js';
import {getReviews} from "../../reducer/data/selectors.js";
import {TabsComponentType} from '../../types/index.js';

const TabsComponent = (props) => {
  const {movie: film, listReviews, currentTab, onTabClick} = props;
  const tabs = Object.values(Tabs);

  // Пока сделал чтобы возвращало все моковые коммментарии
  // const getCommentsById = (id, reviews) => {
  const getCommentsById = () => {
    // return reviews.filter((review) => review.idFilm === id);
    return listReviews;
  };

  const getComponentByTab = (tab) => {
    const {genre, year, ratingScore, ratingCount, movieDescription, movieDirector, movieStarring, runTime} = film;
    const starring = movieStarring.join(`, `);

    switch (tab) {
      case Tabs.OVERVIEW:
        return (
          <React.Fragment>
            <div className="movie-rating">
              <div className="movie-rating__score">{ratingScore}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{getRatingLevel(ratingScore)}</span>
                <span className="movie-rating__count">{ratingCount} ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{movieDescription}</p>

              <p className="movie-card__director"><strong>Director: {movieDirector}</strong></p>

              <p className="movie-card__starring">
                <strong>Starring: {starring}
                </strong>
              </p>
            </div>
          </React.Fragment>
        );
      case Tabs.DETAILS:
        return (
          <React.Fragment>
            <div className="movie-card__text movie-card__row">
              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Director</strong>
                  <span className="movie-card__details-value">{movieDirector}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Starring</strong>
                  <span className="movie-card__details-value">
                    {movieStarring.map((actor) => {
                      return (
                        <Fragment key={actor}>
                          {actor} <br/>
                        </Fragment>
                      );
                    })}
                  </span>
                </p>
              </div>
              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Run Time</strong>
                  <span className="movie-card__details-value">{formatTime(runTime)}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Genre</strong>
                  <span className="movie-card__details-value">{genre}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Released</strong>
                  <span className="movie-card__details-value">{year}</span>
                </p>
              </div>
            </div>
          </React.Fragment>
        );
      case Tabs.REVIEWS:
        const reviews = getCommentsById(film.id, listReviews);
        const halfIndex = Math.ceil(reviews.length / 2);

        return (
          <React.Fragment>
            <div className="movie-card__reviews movie-card__row">
              <Reviews
                reviews = {reviews.slice(0, halfIndex)}
              />
              <Reviews
                reviews = {reviews.slice(halfIndex)}
              />
            </div>
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {tabs.map((tab, index) => {
            return (
              <li
                onClick = {(evt) => {
                  evt.preventDefault();
                  onTabClick(tab);
                }}
                key = {tab + index}
                className = {`movie-nav__item`
                + (currentTab === tab ? ` movie-nav__item--active` : ``)}>
                <a className="movie-nav__link" href="#">{tab}</a>
              </li>
            );
          })}
        </ul>
      </nav>
      {getComponentByTab(currentTab)}
    </div>
  );
};

TabsComponent.propTypes = TabsComponentType;

const mapStateToProps = (state) => ({
  listReviews: getReviews(state),
});

export {TabsComponent};
export default connect(mapStateToProps)(TabsComponent);
