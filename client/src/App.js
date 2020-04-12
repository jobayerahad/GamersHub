import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Forum from "./containers/Forum";
import PCBuilder from "./containers/PCBuilder";
import WillItRun from "./containers/WillItRun";
import Landing from "./containers/Landing";
import NotFound from "./components/NotFound";
import Alert from "./components/Alert";
import store from "./store";

import "./css/main.min.css";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./store/actions/auth";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Switch>
          <Route component={Forum} path="/forum" />

          <Route component={PCBuilder} path="/pcbuilder" exact />
          <Route component={WillItRun} path="/willitrun" exact />
          <Route component={Landing} path="/" exact />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
