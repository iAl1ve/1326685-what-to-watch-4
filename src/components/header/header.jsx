import React from "react";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getUserInfo} from "../../reducer/user/selectors.js";
import {AppRoute} from "../../const.js";
import {Link} from "react-router-dom";
import {headerType} from '../../types/index.js';

const Header = (props) => {
  const {isMain, isAuthorization, userInfo} = props;

  const {avatarUrl} = userInfo;
  const url = isMain ? `#` : AppRoute.ROOT;

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <Link to = {url} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="user-block">

        {isAuthorization
          ? <div className="user-block__avatar">
            <Link
              to = {AppRoute.MY_LIST}
              className="user-block__avatar"
              style={{
                display: `block`,
              }}
            >
              <img src={avatarUrl} alt="User avatar" width="63" height="63" />
            </Link>

          </div>
          : <Link
            to = {AppRoute.LOGIN}
            className="user-block__link"
          >
          Sign in
          </Link>
        }

      </div>
    </header>
  );
};

Header.propTypes = headerType;

const mapStateToProps = (state) => ({
  isAuthorization: getAuthorizationStatus(state),
  userInfo: getUserInfo(state),
});

export {Header};

export default connect(mapStateToProps)(Header);
