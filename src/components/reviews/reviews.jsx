import React from "react";
import {ReviewsType} from '../../types/index.js';
import {formatDate} from '../../util.js';

const Reviews = (reviewsProps) => {
  const {reviews} = reviewsProps;

  return (
    <React.Fragment>
      <div className="movie-card__reviews-col">
        {reviews.map((review, index) => {
          return (
            <div
              key = {review.author + index}
              className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.text}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.author}</cite>
                  <time className="review__date" dateTime="{review.date}">{formatDate(review.date)}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

Reviews.propTypes = {
  reviewsProps: ReviewsType,
};

export default Reviews;
