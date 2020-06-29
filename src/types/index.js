import PropTypes from 'prop-types';

const {shape, number, string, arrayOf, bool, func} = PropTypes;

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
  preview: string.isRequired,
});

export const ListMoviesType = shape({
  movie: arrayOf(MovieType).isRequired,
  isPlaying: bool.isRequired,
  onTitleButtonClick: func.isRequired,
  onMovieCardHover: func.isRequired,
  onMouseCardLeave: func.isRequired,
});

export const AppProps = shape({
  movie: MovieType.isRequired,
  listMovies: arrayOf(MovieType).isRequired,
  onTitleButtonClick: func.isRequired,
});

export const VideoType = shape({
  src: string.isRequired,
  preview: string.isRequired,
});
