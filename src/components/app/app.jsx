import React, {PureComponent} from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player.jsx";
import withFullScreenVideoPlayer from "../../hocs/with-full-screen-video-player/with-full-screen-video-player.js";
import {getGenres, getPromoFilm, getFilms, getIsFormDisabled, getStatusSend} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator} from "../../reducer/app-state/app-state.js";
import {getCurrentGenre, getСountShowMovies} from "../../reducer/app-state/selectors.js";
import {getAuthorizationStatus, getFavoritesFilms} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import LoaderScreen from "../loader-screen/loader-screen.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import MyList from "../my-list/my-list.jsx";
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import {AppType} from '../../types/index.js';

const FullScreenVideoPlayerWrapped = withFullScreenVideoPlayer(FullScreenVideoPlayer);

class App extends PureComponent {
  render() {
    const {
      listMovies,
      currentGenre,
      promoFilm,
      favoritesFilms,
      listGenres,
      countShowMovies,
      isAuthorization,
      isFormDisabled,
      isStatusSend,
      onTitleButtonClick,
      onGenreItemClick,
      onShowMoreClick,
      onAddMoviesToWatch,
      onSubmitReview,
      login,
    } = this.props;

    if (listMovies === null || promoFilm === null || listGenres === null) {
      return (
        <LoaderScreen />
      );
    }

    return (
      <Router history = {history}>
        <Switch>
          <Route exact path = {AppRoute.ROOT}>
            <Main
              movie = {promoFilm}
              listMovies = {listMovies}
              countShowMovies = {countShowMovies}
              currentGenre = {currentGenre}
              listGenres = {listGenres}
              favoritesFilms = {favoritesFilms}
              isAuthorization = {isAuthorization}
              onGenreItemClick = {onGenreItemClick}
              onShowMoreClick = {onShowMoreClick}
              onTitleButtonClick = {onTitleButtonClick}
              onAddMoviesToWatch = {onAddMoviesToWatch}
            />
          </Route>

          <Route exact path = {`${AppRoute.FILM_PAGE}/:id`}
            render = {(props) => (
              <MoviePage
                {...props}
                listMovies = {listMovies}
                favoritesFilms = {favoritesFilms}
                onTitleButtonClick = {onTitleButtonClick}
                currentGenre = {currentGenre}
                onAddMoviesToWatch = {onAddMoviesToWatch}
                isAuthorization = {isAuthorization}
              />
            )}>
          </Route>
          <Route exact path = {`${AppRoute.VIDEO_PLAYER}/:id`}
            render = {(props) => (
              <FullScreenVideoPlayerWrapped
                {...props}
                listMovies = {listMovies}
              />
            )}>
          </Route>
          <Route exact path = {AppRoute.LOGIN}
            render = {() => !isAuthorization
              ? <SignIn
                onSubmit = {login}
              />
              : <Redirect to = {AppRoute.ROOT} /> }>
          </Route>
          <Route exact path = {`${AppRoute.FILM_PAGE}/:id${AppRoute.FILM_REVIEW}`}
            render = {(props) => isAuthorization
              ? (
                <AddReview
                  {...props}
                  listMovies = {listMovies}
                  onSubmitReview = {onSubmitReview}
                  isFormDisabled = {isFormDisabled}
                  isStatusSend = {isStatusSend}
                />
              )
              : <Redirect to = {AppRoute.ROOT} />}>
          </Route>
          <Route exact path = {AppRoute.MY_LIST}
            render = {() => isAuthorization
              ? (
                <MyList
                  listMovies = {favoritesFilms}
                  onTitleButtonClick = {onTitleButtonClick}
                />
              )
              : <Redirect to = {AppRoute.ROOT} /> }>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = AppType;

const mapStateToProps = (state) => ({
  currentGenre: getCurrentGenre(state),
  promoFilm: getPromoFilm(state),
  listMovies: getFilms(state),
  listGenres: getGenres(state),
  favoritesFilms: getFavoritesFilms(state),
  countShowMovies: getСountShowMovies(state),
  isAuthorization: getAuthorizationStatus(state),
  isFormDisabled: getIsFormDisabled(state),
  isStatusSend: getStatusSend(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTitleButtonClick(film) {
    dispatch(DataOperation.loadReviews(film.id));
  },
  onGenreItemClick(genre) {
    dispatch(ActionCreator.changeCurrentGenre(genre));
    dispatch(ActionCreator.setDefaultCountShowMovies());
  },
  onShowMoreClick() {
    dispatch(ActionCreator.setCountShowMovies());
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onSubmitReview(id, review) {
    dispatch(DataOperation.submitReview(id, review));
  },
  onAddMoviesToWatch(id, status) {
    dispatch(UserOperation.addFilmsToFavorites(id, status));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

