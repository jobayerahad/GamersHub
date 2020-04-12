import React, { useState } from "react";
import { Transition } from "react-transition-group";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Dropdown from "../components/Dropdown";

const Navigation = ({ landing, authUI, users: { isAuthenticated, user } }) => {
  // const leftMenuList = [
  //   { name: "PC Builder", link: "/pcbuilder" },
  //   { name: "Will it run?", link: "/willitrun" },
  // ];

  const [menuVisibility, setMenuVisibility] = useState(false);

  if (isAuthenticated) authUI(false);

  return (
    <nav className="container header__container">
      <div className="header__left">
        <div className="header__logo-container">
          <Link to="/">
            <img src="/assets/img/logo.png" alt="logo" />
          </Link>
        </div>
        {/* {!landing && (
          <ul className="header__list">
            {leftMenuList.map((menu, index) => (
              <li className="header__item" key={index}>
                <Link className="header__link" to={menu.link}>
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        )} */}
      </div>

      <div className="header__right">
        <ul className="header__list">
          <li className="header__item">
            {/* <Link className="header__link" to="/forum">
              Forum
            </Link> */}
          </li>
          <li className="header__item">
            {isAuthenticated ? (
              <img
                src={user.portrait}
                alt={user.lastname}
                className="header__profile-pic"
                onClick={(e) => setMenuVisibility(!menuVisibility)}
              />
            ) : (
              <p className="header__link" onClick={(e) => authUI(true)}>
                Sign In
              </p>
            )}
          </li>
        </ul>

        <Transition in={menuVisibility} timeout={500} mountOnEnter unmountOnExit>
          {(state) => <Dropdown show={state} setVisibility={setMenuVisibility} />}
        </Transition>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.auth,
});

export default connect(mapStateToProps)(Navigation);
