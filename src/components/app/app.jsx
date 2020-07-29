import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player.jsx";
import withFullScreenVideoPlayer from "../../hocs/with-full-screen-video-player/with-full-screen-video-player.js";
import {getGenres, getPromoFilm, getFilms, getIsFormDisabled} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import {getCurrentGenre, getActiveFilm, getIsPlaying, getСountShowMovies} from "../../reducer/app-state/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import LoaderScreen from "../loader-screen/loader-screen.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import {AppType} from '../../types/index.js';

const FullScreenVideoPlayerWrapped = withFullScreenVideoPlayer(FullScreenVideoPlayer);

class App extends PureComponent {
  _renderAppScreen() {
    const {
      listMovies,
      currentGenre,
      activeFilm,
      promoFilm,
      listGenres,
      countShowMovies,
      isPlaying,
      isAuthorization,
      onTitleButtonClick,
      onGenreItemClick,
      onShowMoreClick,
      onPlayButtonClick,
      onPlayerExitClick,
    } = this.props;

    switch (true) {
      case listMovies === null || promoFilm === null || listGenres === null:
        return this._renderLoader();
      case isPlaying:
        let currentFilm = activeFilm ? activeFilm : listMovies[0];

        return (
          <FullScreenVideoPlayerWrapped
            movie = {currentFilm}
            onPlayerExitClick = {onPlayerExitClick}
          />
        );
      case activeFilm === null:

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
      case !!activeFilm:
        return (
          <MoviePage
            movie = {activeFilm}
            listMovies = {listMovies}
            onTitleButtonClick = {onTitleButtonClick}
            currentGenre = {currentGenre}
            onPlayButtonClick = {onPlayButtonClick}
            isAuthorization = {isAuthorization}
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
    const {
      currentGenre,
      listMovies,
      isAuthorization,
      isFormDisabled,
      onTitleButtonClick,
      onPlayButtonClick,
      onPlayerExitClick,
      onSubmitReview,
      login
    } = this.props;

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
              isAuthorization = {isAuthorization}
            />
          </Route>
          <Route exact path="/dev-player">
            <FullScreenVideoPlayerWrapped
              movie = {listMovies[0]}
              onPlayerExitClick = {onPlayerExitClick}
            />
          </Route>
          <Route exact path="/sign">
            {isAuthorization ? this._renderAppScreen() :
              <SignIn
                onSubmit = {login}
              /> }
          </Route>
          <Route exact path="/dev-review">
            <AddReview
              movie = {listMovies[0]}
              onSubmitReview = {onSubmitReview}
              isFormDisabled = {isFormDisabled}
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
  isAuthorization: getAuthorizationStatus(state),
  isFormDisabled: getIsFormDisabled(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTitleButtonClick(film) {
    dispatch(ActionCreator.setActiveMovie(film));
    dispatch(DataOperation.loadReviews(film.id));
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
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onSubmitReview(id, review) {
    dispatch(DataOperation.submitReview(id, review));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

