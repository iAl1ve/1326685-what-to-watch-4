import React from "react";
import PropTypes from "prop-types";

const Films = (props) => {
  const {title, onTitleButtonClick} = props;

  return (
    <React.Fragment>
      <article className="small-movie-card catalog__movies-card">
        <div className="small-movie-card__image">
          <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt={title} width="280" height="175" />
        </div>
        <h3
          onClick={onTitleButtonClick}
          className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    </React.Fragment>
  );
};

Films.propTypes = {
  title: PropTypes.string.isRequired,
  onTitleButtonClick: PropTypes.func.isRequired,
};

export default Films;
