import React, { useState } from "react";

import Login from "./Login";
import Register from "./Register";

const Auth = ({ show, setAuthUI }) => {
  const [register, setRegister] = useState(false);
  const cssClasees = [
    "auth",
    show === "entering" ? "auth--show" : show === "exiting" ? "auth--close" : null,
  ];

  return (
    <section className={cssClasees.join(" ")}>
      <div className="auth__container">
        <div className="auth__close-btn tooltip">
          <img src="/assets/png/close.png" alt="close-btn" onClick={(e) => setAuthUI(false)} />
          <span className="tooltip__text">Close</span>
        </div>

        <div className="auth__toggle">
          <h3
            className={!register ? "auth__toggle--active" : ""}
            onClick={(e) => setRegister(false)}
          >
            Login
          </h3>
          <h3 className={register ? "auth__toggle--active" : ""} onClick={(e) => setRegister(true)}>
            Register
          </h3>
        </div>

        {register ? <Register /> : <Login />}
      </div>
    </section>
  );
};

export default Auth;
