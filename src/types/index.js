import PropTypes from 'prop-types';

const {shape, number, string, arrayOf, func} = PropTypes;

export const appType = shape({
  title: string.isRequired,
  genre: string.isRequired,
  year: number.isRequired,
  src: string.isRequired,
  background: string.isRequired,
  listMovies: arrayOf(
      shape({
        title: string.isRequired,
        src: string.isRequired,
      })
  ).isRequired,
  onTitleButtonClick: func.isRequired,
});

export const listMoviesType = shape({
  movie: arrayOf(
      shape({
        title: string.isRequired,
        src: string.isRequired,
      })
  ).isRequired,
  onTitleButtonClick: func.isRequired,
  onMovieCardHover: func.isRequired,
});
