import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
const SideBar = ({ logoutUser, currentUser }) => {
  return (
    <div className="sidebar-group">
      <div className="sidebar" id="user-menu">
        <div
          className="py-4 text-center"
          data-backround-image="/assets/media/image/image1.jpg"
        >
          <figure className="avatar avatar-lg mb-3 border-0">
            <img src="/uploads/" className="rounded-circle" alt="hiii" />
          </figure>
          <h5 className="d-flex align-items-center justify-content-center">
            {currentUser !== null &&
              currentUser.firstname + " " + currentUser.lastname}
          </h5>
          <div>
            <strong>{currentUser !== null && currentUser.country}</strong>
          </div>
        </div>
        <div className="card mb-0 card-body shadow-none">
          <div className="mb-4">
            <div className="list-group list-group-flush">
              <a
                href="/login"
                className="list-group-item p-l-r-0 text-danger"
                onClick={() => logoutUser()}
              >
                Log Out!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});
export default connect(mapStateToProps, { logoutUser })(SideBar);
