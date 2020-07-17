import React from "react";
import {GenresItemType} from '../../types/index.js';

const GenreItem = (props) => {
  const {genre, isActive, onGenreItemClick} = props;

  return (
    <li
      className = {`catalog__genres-item ` + (isActive ? `catalog__genres-item--active` : ``)}>
      <a href="#" className="catalog__genres-link"
        onClick = {(evt) => {
          evt.preventDefault();
          onGenreItemClick(genre);
        }}>
        {genre}
      </a>
    </li>
  );
};

GenreItem.propTypes = GenresItemType;

export default GenreItem;
