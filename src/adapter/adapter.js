import {BASE_URL} from "../const.js";

export const getAdaptedFilm = (film) => {
  return {
    id: film.id,
    title: film.name,
    src: film.poster_image,
    genre: film.genre,
    year: film.released,
    runTime: film.run_time,
    background: film.background_image,
    ratingScore: film.rating,
    ratingCount: film.scores_count,
    movieDescription: film.description,
    movieDirector: film.director,
    movieStarring: film.starring,
    preview: film.preview_video_link,
    videoLink: film.video_link,
    isFavorite: film.is_favorite,
    backgroundColor: film.background_color,
    previewImage: film.preview_image,
  };
};

export const getAdaptedFilms = (films) => films.map((film) => getAdaptedFilm(film));

export const getAdaptComment = (comment) => {
  return {
    id: comment.id,
    text: comment.comment,
    date: comment.date,
    rating: comment.rating,
    author: comment.user.name,
    idUser: comment.user.id,
  };
};

export const getAdaptedAuthInfo = (authInfo) => {
  return {
    id: authInfo.id,
    email: authInfo.email,
    name: authInfo.name,
    avatarUrl: BASE_URL + authInfo.avatar_url,
  };
};
