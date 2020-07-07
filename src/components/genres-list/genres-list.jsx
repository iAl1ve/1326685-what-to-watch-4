import React from "react";
import {GenresType} from '../../types/index.js';

const GenresList = (props) => {
  const {currentGenre, listGenres, onGenreItemClick} = props;

  return (
    <ul className="catalog__genres-list">
      {listGenres.map((genre, index) => {
        return (
          <li
            key={genre + index}
            className={`catalog__genres-item ` + (currentGenre === genre ? `catalog__genres-item--active` : ``)}>
            <a href="#" className="catalog__genres-link"
              onClick = {(evt) => {
                evt.preventDefault();
                onGenreItemClick(genre);
              }}>
              {genre}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

GenresList.propTypes = GenresType;

export default GenresList;
