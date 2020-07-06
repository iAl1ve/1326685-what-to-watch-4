import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import listMovies from "./mock/films.js";
import ListReviews from "./mock/reviews.js";
import {GENRE_DEFAULT} from "./const.js";

ReactDOM.render(
    <App
      movie = {listMovies[0]}
      listMovies = {listMovies.slice(1)}
      listReviews = {ListReviews}
      currentGenre = {GENRE_DEFAULT}
    />,
    document.querySelector(`#root`)
);
