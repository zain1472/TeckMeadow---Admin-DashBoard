import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    ></Route>
  );
};
const mapStateToProps = state => ({
  loading: state.auth.isUserChecked,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(PrivateRoute);
