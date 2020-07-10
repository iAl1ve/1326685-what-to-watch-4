import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {AppType} from '../../types/index.js';

class App extends PureComponent {
  _renderAppScreen() {
    const {listMovies, currentGenre, activeFilm, listGenres, countShowMovies, onTitleButtonClick, onGenreItemClick, onShowMoreClick} = this.props;

    if (activeFilm === null) {
      return (
        <Main
          movie = {listMovies[0]}
          listMovies = {listMovies}
          countShowMovies = {countShowMovies}
          currentGenre = {currentGenre}
          listGenres = {listGenres}
          onGenreItemClick = {onGenreItemClick}
          onShowMoreClick = {onShowMoreClick}
          onTitleButtonClick = {onTitleButtonClick}
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
        />
      );
    }

    return null;
  }

  render() {
    const {currentGenre, listMovies, onTitleButtonClick} = this.props;

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
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = AppType;

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  activeFilm: state.activeFilm,
  listMovies: state.listMovies,
  listGenres: state.listGenres,
  countShowMovies: state.countShowMovies
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
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

