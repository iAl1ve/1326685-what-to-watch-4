import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player.jsx";
import withFullScreenVideoPlayer from "../../hocs/with-full-screen-video-player/with-full-screen-video-player.js";
import {getGenres, getPromoFilm, getFilms, getErrorState} from "../../reducer/data/selectors.js";
import {getCurrentGenre, getActiveFilm, getIsPlaying, getСountShowMovies} from "../../reducer/app-state/selectors.js";
import LoaderScreen from "../loader-screen/loader-screen.jsx";
import ErrorScreen from "../error-screen/error-screen.jsx";
import {AppType} from '../../types/index.js';

const FullScreenVideoPlayerWrapped = withFullScreenVideoPlayer(FullScreenVideoPlayer);

class App extends PureComponent {
  _renderAppScreen() {
    const {listMovies, currentGenre, activeFilm, promoFilm, listGenres, countShowMovies, isPlaying, onTitleButtonClick, onGenreItemClick, onShowMoreClick, onPlayButtonClick, onPlayerExitClick} = this.props;

    if (listMovies === null || promoFilm === null || listGenres === null) {
      return this._renderLoader();
    }

    if (isPlaying) {
      let currentFilm = activeFilm ? activeFilm : listMovies[0];

      return (
        <FullScreenVideoPlayerWrapped
          movie = {currentFilm}
          onPlayerExitClick = {onPlayerExitClick}
        />
      );
    }

    if (activeFilm === null) {
      return (
        <Main
          movie = {promoFilm}
          listMovies = {listMovies}
          countShowMovies = {countShowMovies}
          currentGenre = {currentGenre}
          listGenres = {listGenres}
          onGenreItemClick = {onGenreItemClick}
          onShowMoreClick = {onShowMoreClick}
          onTitleButtonClick = {onTitleButtonClick}
          onPlayButtonClick = {onPlayButtonClick}
        />
      );
    }

    if (activeFilm) {
      return (
        <MoviePage
          movie = {activeFilm}
          listMovies = {listMovies}
          onTitleButtonClick = {onTitleButtonClick}
          currentGenre = {currentGenre}
          onPlayButtonClick = {onPlayButtonClick}
        />
      );
    }

    return null;
  }

  _renderLoader() {
    return (
      <LoaderScreen />
    );
  }

  render() {
    const {currentGenre, listMovies, onTitleButtonClick, onPlayButtonClick, onPlayerExitClick, isErrorLoading} = this.props;

    if (isErrorLoading) {
      return (
        <ErrorScreen />
      );
    }

    if (listMovies === null) {
      return this._renderLoader();
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderAppScreen()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage
              movie = {listMovies[0]}
              listMovies = {listMovies}
              onTitleButtonClick = {onTitleButtonClick}
              currentGenre = {currentGenre}
              onPlayButtonClick = {onPlayButtonClick}
            />
          </Route>
          <Route exact path="/dev-player">
            <FullScreenVideoPlayerWrapped
              movie = {listMovies[0]}
              onPlayerExitClick = {onPlayerExitClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = AppType;

const mapStateToProps = (state) => ({
  currentGenre: getCurrentGenre(state),
  activeFilm: getActiveFilm(state),
  promoFilm: getPromoFilm(state),
  listMovies: getFilms(state),
  listGenres: getGenres(state),
  countShowMovies: getСountShowMovies(state),
  isPlaying: getIsPlaying(state),
  isErrorLoading: getErrorState(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTitleButtonClick(film) {
    dispatch(ActionCreator.setActiveMovie(film));
  },
  onGenreItemClick(genre) {
    dispatch(ActionCreator.changeCurrentGenre(genre));
    dispatch(ActionCreator.setDefaultCountShowMovies());
  },
  onShowMoreClick() {
    dispatch(ActionCreator.setCountShowMovies());
  },
  onPlayerExitClick() {
    dispatch(ActionCreator.setExitPlayMovie());
  },
  onPlayButtonClick() {
    dispatch(ActionCreator.setPlayActiveMovie());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

