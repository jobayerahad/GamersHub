import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../store/actions/auth";
import Button from "../../components/Button";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const { emailOrUsername, password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login(emailOrUsername, password);
  };

  return (
    <form className="form__login" onSubmit={(e) => onSubmit(e)}>
      <div className="form__input">
        <img src="/assets/png/user.png" alt="" className="form__input__img" />
        <input
          type="text"
          className="form__input__field"
          placeholder="Username or Email"
          name="emailOrUsername"
          value={emailOrUsername}
          onChange={(e) => onChange(e)}
          required
        />
      </div>

      <div className="form__input">
        <img src="/assets/png/lock.png" alt="" className="form__input__img" />
        <input
          type="password"
          className="form__input__field"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          required
        />
      </div>

      <div className="form__spaced">
        <div className="form__checkbox">
          <input type="checkbox" name="" id="checkbox" className="form__checkbox__field" />
          <label htmlFor="checkbox">Remember me</label>
        </div>

        <p>Forgot Password?</p>
      </div>

      <Button
        type="btn"
        action={(e) => onSubmit(e)}
        size="full-width"
        shape="sharp"
        color="green"
        icon="login"
      >
        Login
      </Button>
    </form>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
