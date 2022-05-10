import React from "react";
import "./header.css";

import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons/faSignInAlt";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../Redux/actions/authActions";

const Header = ({ userInfo }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logOut());

  const URL = process.env.REACT_APP_IMG_URL;

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <h4 className="logo">
            Social<span className="logo__span">Media</span>
          </h4>
        </Link>

        <div className="header__input">
          <Search />
          <input type="text" placeholder="Search Friends" />
        </div>
      </div>

      <div className="header__middle">
        <div className="header__option active">
          <Person className="icon" />
          <span className="navbar__badge">1</span>
        </div>

        <div className="header__option">
          <Chat className="icon" />
          <span className="navbar__badge">3</span>
        </div>

        <div className="header__option">
          <Notifications className="icon" />
          <span className="navbar__badge">10</span>
        </div>
      </div>

      <div className="header__right">
        {userInfo ? (
          <>
            <Link to={`/profile/${userInfo.id}`}>
              <div className="header__info">
                <Avatar
                  className="header__avatar"
                  src={URL + userInfo.profPic || "assets/images6.jpg"}
                />
                <h4 className="header__title">
                  {userInfo?.username || "John Doe"}
                </h4>
              </div>
            </Link>

            <div className="d-flex ai-center signout" onClick={handleLogOut}>
              <FontAwesomeIcon icon={faSignOutAlt} className="icon red" />
              <h4 className="sign__up">Sign Out</h4>
            </div>
          </>
        ) : (
          <>
            <Link to="/register" className="d-flex ai-center gap-1">
              <FontAwesomeIcon icon={faSignInAlt} className="icon red" />
              <h4 className="sign__up">Sign Up</h4>
            </Link>

            <Link to="/login" className="d-flex ai-center gap-1">
              <FontAwesomeIcon icon={faSignInAlt} className="icon red" />
              <h4 className="sign__up">Sign In</h4>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
