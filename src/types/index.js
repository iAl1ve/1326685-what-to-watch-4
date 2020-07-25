import PropTypes from 'prop-types';

const {shape, number, string, arrayOf, array, bool, func, any, node} = PropTypes;

export const MovieType = shape({
  id: number.isRequired,
  title: string.isRequired,
  genre: string.isRequired,
  year: number.isRequired,
  src: string.isRequired,
  background: string.isRequired,
  ratingScore: number.isRequired,
  ratingCount: number.isRequired,
  movieDescription: string.isRequired,
  movieDirector: string.isRequired,
  movieStarring: array.isRequired,
  preview: string.isRequired,
  runTime: number.isRequired,
  videoLink: string.isRequired,
  isFavorite: bool.isRequired,
  backgroundColor: string.isRequired,
  previewImage: string.isRequired,
});

export const ReviewType = shape({
  id: number.isRequired,
  idUser: number.isRequired,
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
  listMovies: arrayOf(MovieType),
  listGenres: array,
  currentGenre: string.isRequired,
  countShowMovies: number.isRequired,
  onTitleButtonClick: func.isRequired,
  onGenreItemClick: func.isRequired,
  onShowMoreClick: func.isRequired,
};

export const MoviePageType = {
  movie: MovieType,
  listMovies: arrayOf(MovieType),
  onTitleButtonClick: func.isRequired,
};

export const VideoType = {
  src: string.isRequired,
  preview: string.isRequired,
};

export const TabsComponentType = {
  movie: MovieType,
  listReviews: arrayOf(ReviewType),
  currentTab: string.isRequired,
  onTabClick: func.isRequired,
};

export const GenresType = {
  currentGenre: string,
  listGenres: array,
  onGenreItemClick: func.isRequired,
};

export const GenresItemType = {
  genre: string.isRequired,
  isActive: bool.isRequired,
  onGenreItemClick: func.isRequired,
};

export const ShowMoreType = {
  onShowMoreClick: func.isRequired,
};

export const WithFullScreenVideoPlayerType = {
  movie: MovieType,
  onPlayerExitClick: func.isRequired,
};

export const FullScreenVideoType = {
  title: string.isRequired,
  isPlaying: bool,
  timeElapsed: any,
  currentProgress: string,
  onPlayPauseButtonClick: func.isRequired,
  onFullScreenClick: func.isRequired,
  onPlayerExitClick: func.isRequired,
  children: node,
};
