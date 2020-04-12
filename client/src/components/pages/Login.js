import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import { loginUser, clearLoading } from "../../actions/authActions";
import { setAlert } from "../../actions/AlertActions";
const Login = ({
  loginUser,
  loading,
  error,
  isAuthenticated,
  history,
  clearLoading,
  setAlert,
}) => {
  useEffect(() => {
    document.body.classList = "form-membership";
    clearLoading();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (isAuthenticated === true) {
      history.push("/");
    } else if (error !== null) {
      setAlert(error, "danger");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    loginUser({
      email,
      password,
    });
  };
  return (
    <div className="form-membership">
      <Alert />
      <div className="form-wrapper">
        <div id="logo">
          <h2>TechMeadow</h2>
        </div>

        <h5>Sign in</h5>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!loading === true ? (
            <button id="submit" className="btn btn-primary btn-block">
              Sign in
            </button>
          ) : (
            <div id="loader" className="btn">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          <p className="text-muted">Don't have an account?</p>
          <Link to="/register" className="btn btn-outline-light btn-sm">
            Register now!
          </Link>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { loginUser, setAlert, clearLoading })(
  Login
);
