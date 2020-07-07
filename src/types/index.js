import PropTypes from 'prop-types';

const {shape, number, string, arrayOf, array, bool, func, any} = PropTypes;

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

export const ReviewType = shape({
  id: number.isRequired,
  idFilm: number.isRequired,
  text: string.isRequired,
  author: string.isRequired,
  date: string.isRequired,
  rating: string.isRequired,
});

export const ReviewsType = {
  reviews: arrayOf(ReviewType),
};

export const ListMoviesType = {
  listMovies: arrayOf(MovieType),
  isPlaying: bool,
  onTitleButtonClick: func.isRequired,
  onMovieCardHover: func.isRequired,
  onMouseCardLeave: func.isRequired,
  activeCard: any,
};

export const AppType = {
  movie: MovieType,
  listReviews: arrayOf(ReviewType),
  listMovies: arrayOf(MovieType),
  listGenres: array.isRequired,
  currentGenre: string.isRequired,
  onTitleButtonClick: func.isRequired,
  onGenreItemClick: func.isRequired,
};

export const MoviePageType = {
  movie: MovieType,
  listReviews: arrayOf(ReviewType),
  listMovies: arrayOf(MovieType),
  onTitleButtonClick: func.isRequired,
};

export const WithMoviesListType = {
  activeCard: any,
  onMovieCardHover: func,
  onMouseCardLeave: func,
};

export const VideoType = {
  src: string.isRequired,
  preview: string.isRequired,
};

export const TabsType = {
  currentTab: string,
  onTabClick: func,
};

export const TabsComponentType = {
  movie: MovieType.isRequired,
  listReviews: arrayOf(ReviewType),
  currentTab: string.isRequired,
  onTabClick: func.isRequired,
};

export const GenresType = {
  currentGenre: string.isRequired,
  listGenres: array.isRequired,
  onGenreItemClick: func.isRequired,
};
