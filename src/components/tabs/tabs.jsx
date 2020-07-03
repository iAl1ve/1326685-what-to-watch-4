import React, {Fragment} from "react";
import {TabsComponentType} from '../../types/index.js';
import Reviews from "../reviews/reviews.jsx";
import {Tabs} from '../../const.js';

const TabsComponent = (propsTabs) => {
  const {movie, listReviews, currentTab, onTabClick} = propsTabs;
  const tabs = Object.values(Tabs);

  const getComponentByTab = (tab) => {
    const {genre, year, ratingScore, ratingLevel, ratingCount, movieDescription, movieDirector, movieStarring, runTime} = movie;

    switch (tab) {
      case Tabs.OVERVIEW:
        return (
          <React.Fragment>
            <div className="movie-rating">
              <div className="movie-rating__score">{ratingScore}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{ratingLevel}</span>
                <span className="movie-rating__count">{ratingCount} ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{movieDescription}</p>

              <p className="movie-card__director"><strong>Director: {movieDirector}</strong></p>

              <p className="movie-card__starring"><strong>Starring: {movieStarring}</strong></p>
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
                    {movieStarring.split(`,`).map((actor) => {
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
                  <span className="movie-card__details-value">{runTime}</span>
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
        const halfIndex = Math.ceil(listReviews.length / 2);

        return (
          <React.Fragment>
            <div className="movie-card__reviews movie-card__row">
              <Reviews
                reviews = {listReviews.slice(0, halfIndex)}
              />
              <Reviews
                reviews = {listReviews.slice(halfIndex)}
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

TabsComponent.propTypes = {
  propsTabs: TabsComponentType,
};

export default TabsComponent;
