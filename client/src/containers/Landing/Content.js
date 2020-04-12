import React from "react";

import Button from "../../components/Button";

const Content = () => (
  <div className="landing__content">
    <div className="landing__text-box">
      <h1 className="landing__text">
        Welcome
        <br />
        To
        <br />
        <span>Gamer's HUB</span>
      </h1>
    </div>

    <div className="landing__btn-box">
      {/* <Button
        type="link"
        action="/pcbuilder"
        size="large"
        shape="round"
        color="outside-blue"
        icon="wrench"
      >
        PC Builder
      </Button>
      <Button
        type="link"
        action="/willitrun"
        size="large"
        shape="round"
        color="outside-blue"
        icon="run"
      >
        Will it run?
      </Button> */}
      <Button
        type="link"
        action="/forum"
        size="large"
        shape="round"
        color="outside-blue"
        icon="question"
      >
        Forum
      </Button>
    </div>
  </div>
);

export default Content;
