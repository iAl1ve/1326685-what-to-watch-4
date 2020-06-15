import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = (props) => {
  const {title, genre, year, listMovies} = props;

  return (
    <Main
      title = {title}
      genre = {genre}
      year = {year}
      listMovies = {listMovies}
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
};

export default App;

