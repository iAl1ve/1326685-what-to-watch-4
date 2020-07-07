import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {AppType} from '../../types/index.js';

class App extends PureComponent {
  _getCommentsById(id) {
    const {listReviews} = this.props;
    return listReviews.filter((review) => review.idFilm === id);
  }

  _renderAppScreen() {
    const {listMovies, currentGenre, activeFilm, listGenres, onTitleButtonClick, onGenreItemClick} = this.props;

    if (activeFilm === null) {
      return (
        <Main
          movie = {listMovies[0]}
          listMovies = {listMovies}
          onTitleButtonClick = {onTitleButtonClick}
          currentGenre = {currentGenre}
          listGenres = {listGenres}
          onGenreItemClick = {onGenreItemClick}
        />
      );
    }

    if (activeFilm) {
      return (
        <MoviePage
          movie = {activeFilm}
          listMovies = {listMovies}
          listReviews = {this._getCommentsById(activeFilm.id)}
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
              listReviews = {this._getCommentsById(listMovies[0].id)}
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
  listReviews: state.listReviews,
  listGenres: state.listGenres,
});

const mapDispatchToProps = (dispatch) => ({
  onTitleButtonClick(film) {
    dispatch(ActionCreator.setActiveMovie(film));
  },
  onGenreItemClick(genre) {
    dispatch(ActionCreator.changeCurrentGenre(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

