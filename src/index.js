import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import listMovies from "./mock/films.js";

const MovieInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: `2016`,
  src: `img/the-grand-budapest-hotel-poster.jpg`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
};

ReactDOM.render(
    <App
      title = {MovieInfo.title}
      genre = {MovieInfo.genre}
      year = {MovieInfo.year}
      src = {MovieInfo.src}
      background = {MovieInfo.background}
      listMovies = {listMovies}
    />,
    document.querySelector(`#root`)
);
