import React from "react";
import GenreItem from "../genre-item/genre-item.jsx";
import {GenresType} from '../../types/index.js';

const GenresList = (props) => {
  const {currentGenre, listGenres, onGenreItemClick} = props;

  return (
    <ul className="catalog__genres-list">
      {listGenres.map((genre, index) => {
        return (
          <GenreItem
            key = {genre + index}
            genre = {genre}
            isActive = {genre === currentGenre}
            onGenreItemClick = {onGenreItemClick}
          />
        );
      })}
    </ul>
  );
};

GenresList.propTypes = GenresType;

export default GenresList;
