import React, {PureComponent, createRef} from "react";
import {Link} from "react-router-dom";
import history from "../../history.js";
import {connect} from "react-redux";
import {getUserInfo} from "../../reducer/user/selectors.js";
import {MIN_LENGTH_TEXT_REVIEW, MAX_LENGTH_TEXT_REVIEW, DEFAULT_CHECKED_STAR, COUNT_STARS, AppRoute} from "../../const.js";
import {getCurrentFilm} from "../../utils.js";
import {addReviewType} from '../../types/index.js';

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.reviewRef = createRef();
    this.formRef = createRef();
    this._movie = null;
    this._id = Number(this.props.match.params.id);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmitReview} = this.props;

    evt.preventDefault();

    onSubmitReview(this._id, {
      rating: this.formRef.current.rating.value,
      comment: this.reviewRef.current.value,
    });
  }

  componentDidUpdate() {
    const {isStatusSend} = this.props;
    const id = this._id;

    if (isStatusSend) {
      history.push(`${AppRoute.FILM_PAGE}/${id}`);
    }
  }

  render() {
    const movie = getCurrentFilm(this.props.listMovies, this._id);
    const {id, title, src, background} = movie;
    const {isFormDisabled, userInfo} = this.props;
    const {avatarUrl} = userInfo;

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
              <Link to = {AppRoute.ROOT} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`${AppRoute.FILM_PAGE}/${id}`} className="breadcrumbs__link">
                    {title}
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src={avatarUrl} alt="User avatar" width="63" height="63" />
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

const mapStateToProps = (state) => ({
  userInfo: getUserInfo(state),
});

export {AddReview};

export default connect(mapStateToProps)(AddReview);
