import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../../store/actions/auth";
import Button from "../../components/Button";

const Register = ({ register }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstname, lastname, username, email, password, confirmPassword } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    register({ firstname, lastname, username, email, password, confirmPassword });
  };

  return (
    <form className="form__register" onSubmit={(e) => onSubmit(e)}>
      <div className="form__register__name">
        <div className="form__input">
          <img src="/assets/png/user.png" alt="" className="form__input__img" />
          <input
            type="text"
            className="form__input__field"
            placeholder="First Name"
            name="firstname"
            value={firstname}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className="form__input">
          <img src="/assets/png/user.png" alt="" className="form__input__img" />
          <input
            type="text"
            className="form__input__field"
            placeholder="Last Name"
            name="lastname"
            value={lastname}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
      </div>

      <div className="form__input">
        <img src="/assets/png/mail.png" alt="" className="form__input__img" />
        <input
          type="email"
          className="form__input__field"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
      </div>

      <div className="form__input">
        <img src="/assets/png/name.png" alt="" className="form__input__img" />
        <input
          type="text"
          className="form__input__field"
          placeholder="Enter an username"
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
          required
        />
      </div>

      <div className="form__input">
        <img src="/assets/png/lock.png" alt="" className="form__input__img" />
        <input
          type="password"
          className="form__input__field"
          placeholder="Type Your Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          required
        />
      </div>

      <div className="form__input">
        <img src="/assets/png/lock.png" alt="" className="form__input__img" />
        <input
          type="password"
          className="form__input__field"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => onChange(e)}
          required
        />
      </div>

      <Button
        type="btn"
        action={(e) => onSubmit(e)}
        size="full-width"
        shape="sharp"
        color="green"
        icon="login"
      >
        Register
      </Button>
    </form>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(null, { register })(Register);
