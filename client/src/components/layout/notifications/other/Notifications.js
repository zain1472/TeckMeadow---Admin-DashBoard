import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NewNotifications from "./NewNotifications";
import OldNotifications from "./OldNotifications";
const Notifications = ({ notifications }) => {
  return (
    <ul className="list-group list-group-flush">
      {notifications.length === 0 && (
        <li>
          <a
            href="#!"
            className="list-group-item d-flex align-items-center hide-show-toggler"
          >
            <div></div>
            <div className="flex-grow-1">
              <p className="mb-0 line-height-20 d-flex justify-content-between">
                No notifications to show
              </p>
              <span className="text-muted small"></span>
            </div>
          </a>
        </li>
      )}
      <NewNotifications />

      <OldNotifications />
    </ul>
  );
};

NewNotifications.propTypes = {
  notifications: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  notifications: state.notification.notifications,
});
export default connect(mapStateToProps)(Notifications);
