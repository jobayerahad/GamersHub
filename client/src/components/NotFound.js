import React from "react";
import { useHistory } from "react-router-dom";

import Button from "./Button";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className="not-found__container">
      <div className="not-found">
        <h1 className="not-found__code">404</h1>
        <em>OPPS! Page Not Found</em>
        <p>
          Sorry but the page you are looking for doesn't exist, have been removed, name changed or
          is temporarily unavailable
        </p>
        <Button
          type="btn"
          action={history.goBack}
          color="dark"
          icon="back-arrow"
          shape="round mt-3"
        >
          Back to Previous Page
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
