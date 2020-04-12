import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../store/actions/auth";

const Dropdown = ({ logout, show, setVisibility }) => {
  const cssClasees = [
    "dropdown",
    show === "entering" ? "dropdown--show" : show === "exiting" ? "dropdown--close" : null,
  ];

  return (
    <div className={cssClasees.join(" ")}>
      <ul className="dropdown__list">
        <li className="dropdown__item">
          <Link to="/account" className="dropdown__link">
            <img src="/assets/png/user.png" alt="account" className="dropdown__img" />
            <p className="dropdown__title">Account</p>
          </Link>
        </li>
        <li className="dropdown__item">
          <button
            className="dropdown__link"
            onClick={(e) => {
              e.preventDefault();
              logout();
              setVisibility(false);
            }}
          >
            <img src="/assets/png/logout.png" alt="logout" className="dropdown__img" />
            <p className="dropdown__title">Logout</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

Dropdown.propTypes = {
  logout: PropTypes.func.isRequired,
  show: PropTypes.string.isRequired,
};

export default connect(null, { logout })(Dropdown);
