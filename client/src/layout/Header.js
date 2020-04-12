import React, { useState } from "react";
import { Transition } from "react-transition-group";

import Navigation from "./Navigation";
import Auth from "../containers/Auth";

const Header = ({ landing }) => {
  const [authVisible, setAuthVisible] = useState(false);
  const cssClasees = ["header", !landing && "header--dark"];

  return (
    <header className={cssClasees.join(" ")}>
      <Navigation landing={landing} authUI={setAuthVisible} />

      <Transition in={authVisible} timeout={500} mountOnEnter unmountOnExit>
        {(state) => <Auth show={state} setAuthUI={setAuthVisible} />}
      </Transition>
    </header>
  );
};

export default Header;
