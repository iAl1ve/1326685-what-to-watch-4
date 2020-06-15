import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const MovieInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: `2016`,
};

const ListMovies = [
  {title: `Fantastic Beasts`},
  {title: `Bohemian Rhapsody`},
  {title: `Macbeth`},
];

ReactDOM.render(
    <App
      title = {MovieInfo.title}
      genre = {MovieInfo.genre}
      year = {MovieInfo.year}
      listMovies = {ListMovies}
    />,
    document.querySelector(`#root`)
);
