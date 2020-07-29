import React, {PureComponent, createRef} from "react";
import {MIN_LENGTH_TEXT_REVIEW, MAX_LENGTH_TEXT_REVIEW, DEFAULT_CHECKED_STAR, COUNT_STARS} from "../../const.js";
import {addReviewType} from '../../types/index.js';

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.reviewRef = createRef();
    this.formRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmitReview} = this.props;
    const {id} = this.props.movie;

    evt.preventDefault();

    onSubmitReview(id, {
      rating: this.formRef.current.rating.value,
      comment: this.reviewRef.current.value,
    });
  }

  render() {
    const {title, src, background} = this.props.movie;
    const {isFormDisabled} = this.props;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img
              src = {background}
              alt = {title}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">
                    {title}
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img
              src = {src}
              alt = {title}
              width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form
            ref = {this.formRef}
            onSubmit = {this.handleSubmit}
            action="#"
            className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                {new Array(COUNT_STARS).fill(``).map((number, i) => {
                  const index = i + 1;
                  const checkedStarNumber = index - DEFAULT_CHECKED_STAR;
                  return (
                    <React.Fragment key = {index}>
                      <input className="rating__input"
                        id = {`star-${index}`}
                        type="radio"
                        name="rating"
                        defaultValue = {index}
                        defaultChecked = {!checkedStarNumber}
                        disabled = {isFormDisabled}
                      />
                      <label className="rating__label" htmlFor={`star-${index}`}>Rating {index}</label>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                ref = {this.reviewRef}
                required
                minLength = {MIN_LENGTH_TEXT_REVIEW}
                maxLength = {MAX_LENGTH_TEXT_REVIEW}
                disabled = {isFormDisabled}
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"></textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled = {isFormDisabled}
                >
                Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}

AddReview.propTypes = addReviewType;

export default AddReview;
