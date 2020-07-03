import PropTypes from 'prop-types';

const {shape, number, string, arrayOf, bool, func, instanceOf} = PropTypes;

export const MovieType = shape({
  id: number.isRequired,
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
  runTime: string.isRequired,
});

export const ReviewsType = shape({
  id: number.isRequired,
  idFilm: number.isRequired,
  text: string.isRequired,
  author: string.isRequired,
  date: instanceOf(Date),
  rating: string.isRequired,
});

export const ListMoviesType = shape({
  listMovies: arrayOf(MovieType).isRequired,
  isPlaying: bool.isRequired,
  onTitleButtonClick: func.isRequired,
  onMovieCardHover: func.isRequired,
  onMouseCardLeave: func.isRequired,
  currentGenre: string.isRequired,
  activeCard: MovieType.isRequired,
});

export const AppType = shape({
  movie: MovieType.isRequired,
  listReviews: arrayOf(ReviewsType).isRequired,
  listMovies: arrayOf(MovieType).isRequired,
  onTitleButtonClick: func.isRequired,
  currentGenre: string.isRequired,
});

export const VideoType = shape({
  src: string.isRequired,
  preview: string.isRequired,
});

export const TabsType = shape({
  currentTab: string.isRequired,
  onTabClick: func.isRequired,
});

export const TabsComponentType = shape({
  movie: MovieType.isRequired,
  listReviews: arrayOf(ReviewsType).isRequired,
  currentTab: string.isRequired,
  onTabClick: func.isRequired,
});

