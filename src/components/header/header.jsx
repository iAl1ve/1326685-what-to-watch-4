import React from "react";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getUserInfo} from "../../reducer/user/selectors.js";
import {headerType} from '../../types/index.js';

const Header = (props) => {
  const {isMain, isAuthorization, userInfo} = props;
  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a href={isMain ? `#` : `main.html`} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="user-block">
        {isAuthorization && <div className="user-block__avatar"><img src={userInfo.avatarUrl} alt="User avatar" width="63" height="63" /></div>}
        {isAuthorization || <a href="sign-in.html" className="user-block__link" >Sign in</a>}
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
