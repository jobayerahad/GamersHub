import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Transition } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Create from "./Create";
import List from "./List";
import Single from "./Single";

import Header from "../../layout/Header";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

const Forum = ({ users: { isAuthenticated, loading }, match: { path } }) => {
  const [showTopic, setShowTopic] = useState(false);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />

          <Switch>
            <Route path={`${path}/:forumTitle`} component={Single} />

            <Route path={path}>
              <List />

              <Transition in={showTopic} timeout={500} mountOnEnter unmountOnExit>
                {(state) => <Create show={state} setShowTopic={setShowTopic} />}
              </Transition>

              {isAuthenticated && !showTopic && (
                <div className="forum__add-btn">
                  <Button
                    type="btn"
                    action={(e) => {
                      e.preventDefault();
                      setShowTopic(true);
                    }}
                    icon="add"
                    color="blue"
                    shape="circle"
                    iconOnly
                  />
                </div>
              )}
            </Route>
          </Switch>
        </>
      )}
    </>
  );
};

Forum.propTypes = {
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.auth,
});

export default connect(mapStateToProps)(Forum);
