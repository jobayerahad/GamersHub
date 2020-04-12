import React from "react";
import { Link } from "react-router-dom";
/*
  Props Types
  type -> link (href/to) / btn
  shape -> round / circle
  withIcon -> icon Name
  size -> large 

*/

const Button = ({ type, icon, size, shape, color, children, action, iconOnly }) => {
  let button;

  const cssClasees = [
    "btn",
    size && `btn--${size}`,
    shape && `btn--${shape}`,
    color && `btn--${color}`,
  ];

  const iconClasees = ["btn__icon", !iconOnly && `mr-1`];

  if (type === "link")
    button = (
      <Link to={action} className={cssClasees.join(" ")}>
        {icon && (
          <img className={iconClasees.join(" ")} src={`/assets/png/${icon}.png`} alt={icon} />
        )}
        {children}
      </Link>
    );
  else if (type === "btn")
    button = (
      <button onClick={action} className={cssClasees.join(" ")}>
        {icon && (
          <img className={iconClasees.join(" ")} src={`/assets/png/${icon}.png`} alt={icon} />
        )}
        {children}
      </button>
    );

  return <> {button} </>;
};

export default Button;
