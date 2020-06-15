import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const titleButtonHandler = () => {};

const App = (props) => {
  const {title, genre, year, listMovies} = props;

  return (
    <Main
      title = {title}
      genre = {genre}
      year = {year}
      listMovies = {listMovies}
      onTitleButtonClick = {titleButtonHandler}
    />
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  listMovies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      })
  ).isRequired,
  onTitleButtonClick: PropTypes.func.isRequired,
};

export default App;

