import React, { useEffect } from "react";
import { connect } from "react-redux";
// Notifications
import OtherNotification from "./notifications/other/OtherNotification";
import { loadNotifications } from "../../actions/NotificationActions";
const Header = ({ currentUser, loadNotifications }) => {
  useEffect(() => {
    loadNotifications();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="header d-print-none">
        <div className="header-left">
          <div className="navigation-toggler">
            <a href="#!" data-action="navigation-toggler">
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
                className="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </a>
          </div>
          <div className="header-logo">
            <a href="/">
              <img
                className="logo"
                src="/assets/media/image/logo.png"
                alt="logo"
              />
              <img
                className="logo-light"
                src="/assets/media/image/logo-light.png"
                alt="light logo"
              />
            </a>
          </div>
        </div>

        <div className="header-body">
          <div className="header-body-left">
            <div className="page-title">
              <h4>TeckMeadow - Dashboard</h4>
            </div>
          </div>
          <div className="header-body-right">
            <ul className="navbar-nav">
              <OtherNotification />
              {/* <!-- begin::header fullscreen --> */}
              <li className="nav-item dropdown">
                <a
                  href="#!"
                  className="nav-link"
                  title="Fullscreen"
                  data-toggle="fullscreen"
                >
                  <i className="maximize" data-feather="maximize"></i>
                  <i className="minimize" data-feather="minimize"></i>
                </a>
              </li>
              {/* <!-- end::header fullscreen --> */}

              {/* <!-- begin::header search --> */}

              {/* <!-- end::header search --> */}

              {/* <!-- begin::apps --> */}

              {/* <!-- end::apps --> */}

              {/* <!-- begin::header messages dropdown --> */}

              {/* <!-- END: Cart --> */}

              {/* <!-- begin::settings --> */}

              {/* <!-- end::settings --> */}

              {/* <!-- begin::user menu --> */}
              <li className="nav-item dropdown">
                <a
                  href="#!"
                  className="nav-link"
                  title="User menu"
                  data-sidebar-target="#user-menu"
                >
                  <span className="mr-2 d-sm-inline d-none">
                    {currentUser !== null &&
                      currentUser.firstname + " " + currentUser.lastname}
                  </span>
                  <figure className="avatar avatar-sm">
                    <img
                      src={`/uploads/${
                        currentUser !== null && currentUser.image
                      }`}
                      className="rounded-circle"
                      alt="avatar"
                    />
                  </figure>
                </a>
              </li>
              {/* <!-- end::user menu --> */}
            </ul>

            {/* <!-- begin::mobile header toggler --> */}
            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item header-toggler">
                <a href="#!" className="nav-link">
                  <i data-feather="arrow-down"></i>
                </a>
              </li>
            </ul>
            {/* <!-- end::mobile header toggler --> */}
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.auth.user,
});
export default connect(mapStateToProps, { loadNotifications })(Header);
