import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Redux Functions
import { registerUser } from "../../actions/authActions";
import { setAlert } from "../../actions/AlertActions";
// components
import Alert from "../layout/Alert";
const Register = ({
  registerUser,
  error,
  isAuthenticated,
  history,
  setAlert,
  loading
}) => {
  useEffect(() => {
    document.body.classList = "form-membership";
    // eslint-disable-next-line
  }, []);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    photo: "",
    email: "",
    country: "",
    password: ""
  });
  useEffect(() => {
    if (isAuthenticated === true) {
      history.push("/");
    } else if (error !== null) {
      setAlert(error, "danger");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error]);

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("country", country);
    formData.append("photo", photo);
    console.log(formData.entries());
    registerUser(formData);
    setAlert("Attempting to log you in...", "success");
  };
  const { firstname, lastname, country, email, password, photo } = user;
  return (
    <div className="form-wrapper">
      <Alert />
      <div id="logo">
        <img className="logo" src="/assets/media/image/logo.png" alt="Img" />
        <img
          className="logo-dark"
          src="/assets/media/image/logo-dark.html"
          alt="img"
        />
      </div>

      <h5>Create account</h5>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              name="photo"
              onChange={e => {
                setUser({ ...user, photo: e.target.files[0] });
              }}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Upload Photo
            </label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Firstname"
            name="firstname"
            value={firstname}
            onChange={onChange}
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Lastname"
            name="lastname"
            required
            value={lastname}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            name="country"
            value={country}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        {loading === null || loading === false ? (
          <button id="submit" className="btn btn-primary btn-block">
            Register
          </button>
        ) : (
          <div id="loader" className="btn">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <hr />
        <p className="text-muted">Already have an account?</p>
        <Link to="/login" className="btn btn-outline-light btn-sm">
          Sign in!
        </Link>
      </form>
    </div>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { registerUser, setAlert })(Register);
