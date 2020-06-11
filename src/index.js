import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const MovieInfo = {
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: `2016`,
};

ReactDOM.render(
    <App
      title = {MovieInfo.title}
      genre = {MovieInfo.genre}
      year = {MovieInfo.year}
    />,
    document.querySelector(`#root`)
);
