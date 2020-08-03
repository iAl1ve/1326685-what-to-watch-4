import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getUserInfo} from "../../reducer/user/selectors.js";
import Footer from "../footer/footer.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import withMoviesList from "../../hocs/with-movies-list/with-movies-list.js";
import {AppRoute} from "../../const.js";
import {MyListType} from '../../types/index.js';

const MoviesListWrapped = withMoviesList(MoviesList);

const MyList = (props) => {
  const {listMovies, onTitleButtonClick, userInfo} = props;
  const {avatarUrl} = userInfo;

  return (
    <div className="user-page">

      <header className="page-header user-page__head">
        <div className="logo">
          <Link to = {AppRoute.ROOT} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src={avatarUrl} alt="User avatar" width="63" height="63" />
          </div>
        </div>
      </header>


      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesListWrapped
          listMovies = {listMovies}
          onTitleButtonClick = {onTitleButtonClick}
        />
        {listMovies.length === 0
          ? `No movies in My List`
          : null
        }
      </section>

      <Footer
        isMain = {false}
      />
    </div>
  );
};

MyList.propTypes = MyListType;

const mapStateToProps = (state) => ({
  userInfo: getUserInfo(state),
});

export {MyList};

export default connect(mapStateToProps)(MyList);
