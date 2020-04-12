import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearNotification,
  deleteNotification,
} from "../../../../actions/NotificationActions";
const NotificationItem = ({
  notification,
  clearNotification,
  deleteNotification,
}) => {
  return (
    <li>
      <Link
        to={`/${
          notification.category === "project"
            ? `projects/${notification.project._id}`
            : `employees/${notification.employee._id}`
        }`}
        className="list-group-item d-flex align-items-center hide-show-toggler"
      >
        <div>
          <figure className="avatar mr-5">
            <span className="avatar-title bg-success-bright text-success rounded-circle">
              {notification.category === "project" && (
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
              )}
            </span>
          </figure>
        </div>
        <div className="flex-grow-1">
          <div className="row">
            <div className="col-10">
              <p className="mb-0 line-height-20 d-flex justify-content-between">
                {notification.description}
              </p>
            </div>
            <div className="col-2">
              {!notification.isRead ? (
                <i
                  onClick={() => clearNotification(notification)}
                  title="Mark as read"
                  data-toggle="tooltip"
                  className="hide-show-toggler-item fas fa-check font-size-11 mt-2"
                ></i>
              ) : (
                <i
                  onClick={() => deleteNotification(notification)}
                  title="Mark as read"
                  data-toggle="tooltip"
                  className="hide-show-toggler-item fas fa-trash font-size-11 mt-2"
                ></i>
              )}
            </div>
          </div>

          <span className="text-muted small">
            {new Date(notification.dated).toDateString()}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default connect(null, { clearNotification, deleteNotification })(
  NotificationItem
);
