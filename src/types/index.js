import PropTypes from 'prop-types';

const {shape, number, string, arrayOf, func} = PropTypes;

export const MovieType = shape({
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
});

export const ListMoviesType = shape({
  movie: arrayOf(MovieType).isRequired,
  onTitleButtonClick: func.isRequired,
  onMovieCardHover: func.isRequired,
});

export const AppProps = shape({
  movie: MovieType.isRequired,
  listMovies: arrayOf(MovieType).isRequired,
  onTitleButtonClick: func.isRequired,
});
