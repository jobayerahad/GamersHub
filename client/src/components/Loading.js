import React from "react";

const Loading = () => (
  <div className="lds-ring__container">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p className="lds-ring__text">Please wait...</p>
  </div>
);

export default Loading;
