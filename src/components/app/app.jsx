import React from "react";
import Main from "../main/main.jsx";
import {appType} from '../../types/index.js';

const titleButtonHandler = () => {};

const App = (appProps) => {
  const {title, genre, year, src, background, listMovies} = appProps;

  return (
    <Main
      title = {title}
      genre = {genre}
      year = {year}
      src = {src}
      background = {background}
      listMovies = {listMovies}
      onTitleButtonClick = {titleButtonHandler}
    />
  );
};

App.propTypes = {
  appProps: appType,
};

export default App;

