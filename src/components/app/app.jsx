import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {movieType} from '../../types/index.js';
import {UrlPage} from "../../const.js";

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

  _renderAppScreen() {
    const {movie, listMovies} = this.appProps;
    const {activePage, activeFilm} = this.state;

    switch (activePage) {
      case UrlPage.MAIN:
        return (
          <Main
            movie = {movie}
            listMovies = {listMovies}
            onTitleButtonClick={this._onTitleButtonClick}
          />
        );
      case UrlPage.MOVIE_PAGE:
        return (
          <MoviePage
            movie = {activeFilm}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {activeFilm} = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderAppScreen()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage
              movie = {activeFilm}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  appProps: movieType,
};

export default App;

