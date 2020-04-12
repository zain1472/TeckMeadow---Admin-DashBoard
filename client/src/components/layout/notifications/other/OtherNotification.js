import React from "react";
import Notifications from "./Notifications";
import { connect } from "react-redux";
import {
  deleteAllNotifications,
  clearAllNotifications,
} from "../../../../actions/NotificationActions";
const OtherNotifications = ({
  notifications,
  deleteAllNotifications,
  clearAllNotifications,
}) => {
  let count = 0;
  notifications.forEach((n) => {
    if (!n.isRead) {
      count++;
    }
  });
  return (
    <li className="nav-item dropdown">
      <a
        href="#"
        className={`nav-link ${count !== 0 && "nav-link-notify"}`}
        title="Notifications"
        data-toggle="dropdown"
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
          className="feather feather-bell"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      </a>
      <div className="dropdown-menu dropdown-menu-right dropdown-menu-big">
        <div className="bg-dark p-4 text-center d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Notifications</h5>
          {notifications.length !== 0 && (
            <small className="opacity-7">{count} unread notifications</small>
          )}
        </div>
        <div>
          <Notifications />
        </div>

        {notifications.length !== 0 && (
          <div className="p-2 text-right border-top">
            <ul className="list-inline small">
              <li className="list-inline-item mb-0">
                {count === 0 ? (
                  <a href="#!" onClick={() => deleteAllNotifications()}>
                    Delete All Notifications
                  </a>
                ) : (
                  <a href="#!" onClick={() => clearAllNotifications()}>
                    Mark All Read
                  </a>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};
const mapStateToProps = (state) => ({
  notifications: state.notification.notifications,
});
export default connect(mapStateToProps, {
  deleteAllNotifications,
  clearAllNotifications,
})(OtherNotifications);
