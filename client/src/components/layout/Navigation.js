import React from "react";
import { connect } from "react-redux";
import { clearCurrentEmployee } from "../../actions/ChatActions";
import { Link } from "react-router-dom";
const Navigation = ({ isAdmin, clearCurrentEmployee }) => {
  return (
    <div className="navigation">
      <div className="navigation-menu-tab">
        <ul>
          <li>
            <a
              href="/#!"
              data-toggle="tooltip"
              data-placement="right"
              title="Projects"
              data-nav-target="#projects"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-briefcase"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </a>
          </li>
          {isAdmin === true && (
            <li>
              <a
                href="#!"
                data-toggle="tooltip"
                data-placement="right"
                title="Apps"
                data-nav-target="#apps"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-globe"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </a>
            </li>
          )}

          <li>
            <a
              href="#!"
              data-toggle="tooltip"
              data-placement="right"
              title="User"
              data-nav-target="#user"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-users"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div className="navigation-menu-body">
        <div className="navigation-menu-group">
          <div id="projects">
            <ul>
              <li className="navigation-divider d-flex align-items-center">
                <i className="mr-2" data-feather="briefcase"></i> Projects
              </li>
              <li>
                <Link to="/projects" className="">
                  Projects
                </Link>
              </li>
            </ul>
          </div>
          <div id="apps">
            <ul>
              <li className="navigation-divider d-flex align-items-center">
                <i className="mr-2" data-feather="globe"></i> Apps
              </li>
              <li>
                <Link to="/chat">
                  <span>Chat</span>
                </Link>
              </li>
            </ul>
          </div>
          <div id="user">
            <ul>
              <li className="navigation-divider d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-users"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>{" "}
                User
              </li>
              <li onClick={() => clearCurrentEmployee()}>
                <Link to="/" className="">
                  Profile
                </Link>
              </li>
              {isAdmin === true && (
                <li>
                  <Link to="/employees">Employees</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps, { clearCurrentEmployee })(Navigation);
