import PropTypes from 'prop-types';

const {shape, number, string, arrayOf, func} = PropTypes;

export const movieType = shape({
  title: string.isRequired,
  genre: string.isRequired,
  year: number.isRequired,
  src: string.isRequired,
  background: string.isRequired,
  ratingScore: string.isRequired,
  ratingLevel: string.isRequired,
  ratingCount: number.isRequired,
  movieDescription: string.isRequired,
  movieDirector: string.isRequired,
  movieStarring: string.isRequired,
  listMovies: arrayOf(
      shape({
        title: string.isRequired,
        genre: string.isRequired,
        year: number.isRequired,
        src: string.isRequired,
        background: string.isRequired,
        ratingScore: string.isRequired,
        ratingLevel: string.isRequired,
        ratingCount: number.isRequired,
        movieDescription: string.isRequired,
        movieDirector: string.isRequired,
        movieStarring: string.isRequired,
      })
  ).isRequired,
  onTitleButtonClick: func.isRequired,
});

export const listMoviesType = shape({
  movie: shape({
    title: string.isRequired,
    genre: string.isRequired,
    year: number.isRequired,
    src: string.isRequired,
    background: string.isRequired,
    ratingScore: string.isRequired,
    ratingLevel: string.isRequired,
    ratingCount: number.isRequired,
    movieDescription: string.isRequired,
    movieDirector: string.isRequired,
    movieStarring: string.isRequired,
  }).isRequired,
  onTitleButtonClick: func.isRequired,
  onMovieCardHover: func.isRequired,
});
