import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import listMovies from "./mock/films.js";
import movie from "./mock/film.js";

ReactDOM.render(
    <App
      movie = {movie}
      listMovies = {listMovies}
    />,
    document.querySelector(`#root`)
);
