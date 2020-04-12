import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const AdminRoute = ({
  component: Component,
  isAdmin,
  loading,
  chatLoading,
  ...rest
}) => {
  if (!loading && !isAdmin) {
    console.log("redirect");
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        !chatLoading && !isAdmin && !loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    ></Route>
  );
};
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  chatLoading: state.chat.loading,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps)(AdminRoute);
