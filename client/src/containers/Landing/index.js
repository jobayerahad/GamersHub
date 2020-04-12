import React, { useEffect } from "react";

import Header from "../../layout/Header";
import Content from "./Content";

const Landing = () => {
  useEffect(() => {
    document.title = `Gamer's Hub`;
  });

  return (
    <section className="landing">
      <div className="bg-video">
        <video className="bg-video__content" autoPlay muted loop>
          <source src="/assets/vdo/gameplay.mp4" type="video/mp4" />
          Your browser is not supported
        </video>
      </div>
      <Header landing />

      <Content />
    </section>
  );
};

export default Landing;
