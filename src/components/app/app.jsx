import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {AppType} from '../../types/index.js';
import {UrlPage, MAX_SHOW_MORE_FILMS} from "../../const.js";

class App extends PureComponent {
  constructor(appProps) {
    super(appProps);
    this.appProps = appProps;

    this._onTitleButtonClick = this._onTitleButtonClick.bind(this);

    this.state = {
      activePage: UrlPage.MAIN,
      activeFilm: this.appProps.movie,
    };
  }

  _onTitleButtonClick(film) {
    this.setState({
      activePage: UrlPage.MOVIE_PAGE,
      activeFilm: film,
    });
  }

  _getCommentsById(id) {
    const {listReviews} = this.appProps;
    return listReviews.filter((review) => review.idFilm === id);
  }

  _renderAppScreen() {
    const {movie, listMovies, currentGenre} = this.appProps;

    const {activePage, activeFilm} = this.state;

    switch (activePage) {
      case UrlPage.MAIN:
        return (
          <Main
            movie = {movie}
            listMovies = {listMovies.slice(0, MAX_SHOW_MORE_FILMS)}
            onTitleButtonClick = {this._onTitleButtonClick}
            currentGenre = {currentGenre}
          />
        );
      case UrlPage.MOVIE_PAGE:
        return (
          <MoviePage
            movie = {activeFilm}
            listMovies = {listMovies}
            listReviews = {this._getCommentsById(activeFilm.id)}
            onTitleButtonClick = {this._onTitleButtonClick}
            currentGenre = {currentGenre}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {currentGenre, listMovies} = this.appProps;

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
              onTitleButtonClick = {this._onTitleButtonClick}
              currentGenre = {currentGenre}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  appProps: AppType,
};

export default App;

