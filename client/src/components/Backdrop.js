import React from "react";

export const Backdrop = ({ children, color = "dark" }) => (
  <div className={`backdrop backdrop--${color}`}>
    <div className="backdrop__container">{children}</div>
  </div>
);

export default Backdrop;
